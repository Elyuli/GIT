import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const [logueado, setLogueado] = useState(false);
	const [isActiveCrud, setIsActiveCrud] = useState(false);
	const [user, setUser] = useState({});

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
	};
	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export { GlobalProvider };

export default GlobalContext;
