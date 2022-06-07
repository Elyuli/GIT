import React, { createContext, useState, useEffect } from "react";
import axios from "../axios";
import { Buffer } from "buffer";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const [logueado, setLogueado] = useState(false);
	const [isActiveCrud, setIsActiveCrud] = useState(false);
	const [user, setUser] = useState(null);
	const [option, setOption] = useState({});
	//	const [pass, setPass] = useState(null);
	console.log("user-Home>>", user);
	console.log("option-Home>>", option);

	useEffect(() => {
		if (!user) return;

		const username = user.username.toString();
		const password = user.password.toString();
		console.log("username>>", username);
		console.log("password>>", password);
		const pass = Buffer.from(`${username}:${password}`).toString("base64");
		axios.defaults.headers.common["Authorization"] = `Basic ${pass}`;
		console.log("axios", axios.defaults);
		const obj = {
			headers: {
				contentType: "text/xml",
				Authorization: `Basic ${pass}`,
				Methods: `Access-Control-Allow-Origin`,
			},
		};
		setOption(obj);
	}, [user]);

	useEffect(() => {
		if (logueado === false) return;

		const { username } = user;
		axios
			.get(`http://localhost:5000/getUserByUsername/${username}`)
			.then((usuario) => {
				console.log("usuario", usuario);
				setUser({ ...user, role: usuario.data.data.role });
			})
			.catch((error) => console.log("error", error));
	}, [logueado]);

	const data = {
		logueado,
		setLogueado,
		isActiveCrud,
		setIsActiveCrud,
		user,
		setUser,
		option,
		setOption,
		//pass,
	};
	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export { GlobalProvider };

export default GlobalContext;
