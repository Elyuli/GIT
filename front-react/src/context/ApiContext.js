import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios";
import { Buffer } from "buffer";
import GlobalContext from "./GlobalContext";

const ApiContext = createContext();

const ApiProvider = ({
	children,
	isBtnApiActive,
	loading,
	setLoading,
	setNameLayerHome,
	setNameWorkHome,
	setCheckObjectHome,
	setListLayersActiveHome,
	setCheckboxes,
	setIsActiveInfoHome,
}) => {
	const [globalObject, setGlobalObject] = useState({});
	const [layers, setLayers] = useState([]);
	const [error, setError] = useState(null);
	const [isStart, setIsStart] = useState(false);
	const [workspaces, setWorkspaces] = useState([]);
	const urlWorkspaces = `http://localhost:8080/geoserver/rest/workspaces.json`;
	const [nameWork, setNameWork] = useState("");
	const [nameLayer, setNameLayer] = useState("");
	const [accordionData, setAccordionData] = useState([]);
	let [urlWorkLayers, setUrlWorkLayers] = useState(null);
	const [listLayersActive, setListLayersActive] = useState(false);
	const [checkObject, setCheckObject] = useState({});
	const [isActiveInfo, setIsActiveInfo] = useState(false);
	const [isActiveHelp, setIsActiveHelp] = useState(false);
	const [isActiveCrud, setIsActiveCrud] = useState(false);
	const { user, option, pass } = useContext(GlobalContext);
	/* const [pass, setPass] = useState(
		Buffer.from(`admin:geoserver`).toString("base64")
	);
	const [option, setOption] = useState({
		headers: {
			Authorization: `Basic ${pass}`,
			Methods: "Access-Control-Allow-Origin",
		},
	}); */

	/* 	const pass = Buffer.from(`${user.username}:${user.password}`).toString(
		"base64"
	);

	function addAuthorizationHeaders(config) {
		if (pass) {
			config.headers.Authorization = `Basic ${pass}`;
			//config.headers["Access-Control-Allow-Origin"] = "*";
			//config.headers["Content-Type"] = "text/xml";
		}
		return config;
	}

	axios.interceptors.request.use(addAuthorizationHeaders); */

	/* const instance = axios.create({
		baseURL: "http://localhost:8080/geoserver/rest/",
	});

	// Modificar valores por defecto después que una instancia ha sido creada
	//instance.defaults.headers.common["Authorization"] = `Basic ${pass}`;
	//instance.defaults.headers.common["Content-Type"] = `text/xml;charset=utf-8`; */

	useEffect(() => {
		if (user === null) return;

		/* const username = user.username.toString();
		const password = user.password.toString();
		const pass = Buffer.from(`${username}:${password}`).toString("base64");
		const option = {
			headers: {
				Authorization: `Basic ${pass}`,
				["Content-Type"]: "text/xml",
				Methods: "Access-Control-Allow-Origin",
			},
		}; */

		setLoading(true);

		const fetchData = async () => {
			let urlWorkspaces = `/workspaces.json`;
			let urlLayers = `/layers.json`;

			const [workspaces, layers] = await Promise.all([
				axios.get(urlWorkspaces).then((res) => {
					if (res.data) {
						setError(null);
						return res.data.workspaces.workspace;
					} else {
						setError(res);
						return [];
					}
				}),
				axios.get(urlLayers).then((res) => {
					if (res.data) {
						setError(null);
						return res.data.layers.layer;
					} else {
						setError(res);
						return [];
					}
				}),
			]);

			setWorkspaces(workspaces);
			setLayers(layers);
			setLoading(false);
		};
		fetchData();
	}, [user]);

	useEffect(() => {
		//console.log("workspaces", workspaces);
		//console.log("layers", layers);

		workspaces.map(({ name }, i) => {
			let workLayers = [];
			layers.map((layer, j) => {
				//	console.log("layers[i]", layers[j]);
				if (layer.name.includes(name))
					workLayers.push({
						name: layer.name.substring(name.length + 1),
						checked: false,
					});
			});
			globalObject[`${name}`] = workLayers;
			setGlobalObject(globalObject);
		});
		console.log("globalObject", globalObject);
	}, [workspaces, layers]);

	useEffect(() => {
		setNameLayerHome(nameLayer);
		setNameWorkHome(nameWork);
		setCheckObjectHome(checkObject);
		setListLayersActiveHome(listLayersActive);
		setGlobalObject(globalObject);
		setCheckboxes(globalObject);
		setIsActiveInfoHome(isActiveInfo);
	}, [
		nameWork,
		nameLayer,
		checkObject,
		listLayersActive,
		globalObject,
		isActiveInfo,
	]);

	const handlOnClickIHelpBtn = () => setIsActiveHelp(!isActiveHelp);

	const data = {
		isStart,
		setIsStart,
		error,
		setError,
		loading,
		setLoading,
		workspaces,
		setWorkspaces,
		nameLayer,
		setNameLayer,
		urlWorkLayers,
		setUrlWorkLayers,
		nameWork,
		setNameWork,
		accordionData,
		setAccordionData,
		layers,
		setLayers,
		listLayersActive,
		setListLayersActive,
		checkObject,
		setCheckObject,
		setIsActiveInfo,
		isActiveInfo,
		isActiveHelp,
		setIsActiveHelp,
		globalObject,
		setGlobalObject,
		handlOnClickIHelpBtn,
		isActiveCrud,
		setIsActiveCrud,
	};

	return <ApiContext.Provider value={data}>{children}</ApiContext.Provider>;
};

export { ApiProvider };
export default ApiContext;
