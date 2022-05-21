import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

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
	const [pass, setPass] = useState(
		Buffer.from("admin:geoserver").toString("base64")
	);
	const [option, setOption] = useState({
		headers: {
			Authorization: `Basic ${pass}`,
			Methods: `Access-Control-Allow-Origin`,
		},
	});
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

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			let urlWorkspaces = `http://localhost:8080/geoserver/rest/workspaces.json`;
			let urlLayers = `http://localhost:8080/geoserver/rest/layers.json`;

			const [workspaces, layers] = await Promise.all([
				axios.get(urlWorkspaces, option).then((res) => {
					if (res.data) {
						setError(null);
						return res.data.workspaces.workspace;
					} else {
						setError(res);
						return [];
					}
				}),
				axios.get(urlLayers, option).then((res) => {
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
	}, []);

	useEffect(() => {
		//console.log("workspaces", workspaces);
		//console.log("layers", layers);

		workspaces.map(({ name }, i) => {
			let workLayers = [];
			layers.map((layer) => {
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
