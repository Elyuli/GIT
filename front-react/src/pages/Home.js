import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Map from "../components/Map/Map";
import * as ol from "ol";
import TileLayer from "ol/layer/Tile";
import { BingMapProvider } from "../context/BingMapContext";
import { Buffer } from "buffer";

import {
	Controls,
	FullScreenControl,
	MousePositionControl,
} from "../controls/index";
import Header from "../components/Header/Header";
import SideBarLeft from "../components/Aside/SideBarLeft";
import { ApiProvider } from "../context/ApiContext";
import Loader from "../components/Loader/Loader";
import BingMap from "../components/Map/BingMap";
import Layers from "../components/ListLayers/Layers";
import TileLayerComp from "../components/ListLayers/TileLayerComp";
import NavigateComp from "../components/Navigate/NavigateComp";
import TableInfo from "../components/Table/TableInfo";
import useTour from "../hooks/useTour";
import GlobalContext from "../context/GlobalContext";
import { Navigate } from "react-router-dom";
import { defaults as defaultControls } from "ol/control";

const STEPS = [
	{
		content: (
			<div
				className="introjs-tooltip"
				style={{ opacity: 1, display: "block", left: 0, top: 50 }}
			>
				<div class="introjs-tooltiptext">
					"¡Bienvenido a Joyrider 2.0! Este tutorial mostrará rápidamente las
					características de la plataforma."
				</div>
			</div>
		),
		placement: "center",
		target: '[data-tut="reactour_help"]',
		locale: {
			skip: <strong aria-label="skip">Dejar</strong>,
			next: <strong aria-label="next">Próximo</strong>,
			back: <strong aria-label="back">Atrás</strong>,
		},
		styles: {
			buttonNext: { backgroundColor: "#182d4c" },
			buttonBack: { color: "#182d4c" },
			buttonSkip: {
				backgroundColor: "#182d4c",
				color: "#fff",
				borderRadius: 4,
			},
			tooltip: { width: 300 },
		},
	},
	{
		content: (
			<div
				className="introjs-tooltip"
				style={{ opacity: 1, display: "block", left: 0, top: 50 }}
			>
				<div className="introjs-tooltiptext">
					Menú: Aquí puede elegir varias capas para mostrar en el mapa.
				</div>
			</div>
		),
		placement: "right",
		target: '[data-tut="reactour_btnApi"]',
		locale: {
			skip: <strong aria-label="skip">Dejar</strong>,
			next: <strong aria-label="next">Próximo</strong>,
			back: <strong aria-label="back">Atrás</strong>,
		},
		styles: {
			buttonNext: { backgroundColor: "#182d4c" },
			buttonBack: { color: "#182d4c" },
			buttonSkip: {
				backgroundColor: "#182d4c",
				color: "#fff",
				borderRadius: 4,
			},
			tooltip: { width: 300 },
		},
	},
	{
		content: (
			<div
				className="introjs-tooltip"
				style={{ opacity: 1, display: "block", left: 0, top: 50 }}
			>
				<div className="introjs-tooltiptext">
					Zoom: Aquí puede hacer zoom en el mapa.
				</div>
			</div>
		),
		placement: "left",
		target: '[className="ol-zoom"]',
		locale: {
			skip: <strong aria-label="skip">Dejar</strong>,
			next: <strong aria-label="next">Próximo</strong>,
			back: <strong aria-label="back">Atrás</strong>,
		},
		styles: {
			buttonNext: { backgroundColor: "#182d4c" },
			buttonBack: { color: "#182d4c" },
			buttonSkip: {
				backgroundColor: "#182d4c",
				color: "#fff",
				borderRadius: 4,
			},
			tooltip: { width: 300 },
		},
	},
	{
		content: (
			<div
				className="introjs-tooltip"
				style={{ opacity: 1, display: "block", left: 0, top: 50 }}
			>
				<div className="introjs-tooltiptext">
					Aquí encontrará diferentes herramientas: Ayuda / Información de capas
					/ Gestión de usuarios / Cerrar Sesión
				</div>
			</div>
		),
		placement: "bottom",
		target: '[data-tut="reactour_toolbar"]',
		locale: {
			skip: <strong aria-label="skip">Dejar</strong>,
			next: <strong aria-label="next">Próximo</strong>,
			back: <strong aria-label="back">Atrás</strong>,
		},
		styles: {
			buttonNext: { backgroundColor: "#182d4c" },
			buttonBack: { color: "#182d4c" },
			buttonSkip: {
				backgroundColor: "#182d4c",
				color: "#fff",
				borderRadius: 4,
			},
			tooltip: { width: 300 },
		},
	},
	{
		content: (
			<div
				className="introjs-tooltip"
				style={{ opacity: 1, display: "block", left: 0, top: 50 }}
			>
				<div className="introjs-tooltiptext">
					Haga clic sobre el mapa para ver información sobre los objetos
				</div>
			</div>
		),
		placement: "bottom",
		target: '[data-tut="reactour_info"]',
		locale: {
			skip: <strong aria-label="skip">Dejar</strong>,
			next: <strong aria-label="next">Próximo</strong>,
			back: <strong aria-label="back">Atrás</strong>,
		},
		styles: {
			buttonNext: { backgroundColor: "#182d4c" },
			buttonBack: { color: "#182d4c" },
			buttonSkip: {
				backgroundColor: "#182d4c",
				color: "#fff",
				borderRadius: 4,
			},
			tooltip: { width: 300 },
		},
	},
	{
		content: (
			<div
				className="introjs-tooltip"
				style={{ opacity: 1, display: "block", left: 0, top: 50 }}
			>
				<div className="introjs-tooltiptext">
					El botón dará acceso a la sección de Administración
				</div>
			</div>
		),
		placement: "bottom",
		target: '[data-tut="reactour_crud"]',
		locale: {
			skip: <strong aria-label="skip">Dejar</strong>,
			next: <strong aria-label="next">Próximo</strong>,
			back: <strong aria-label="back">Atrás</strong>,
		},
		styles: {
			buttonNext: { backgroundColor: "#182d4c" },
			buttonBack: { color: "#182d4c" },
			buttonSkip: {
				backgroundColor: "#182d4c",
				color: "#fff",
				borderRadius: 4,
			},
			tooltip: { width: 300 },
		},
	},
	{
		content: (
			<div
				className="introjs-tooltip"
				style={{ opacity: 1, display: "block", left: 0, top: 50 }}
			>
				<div className="introjs-tooltiptext">
					El botón cierra la sesión del usuario
				</div>
			</div>
		),
		placement: "bottom",
		target: '[data-tut="reactour_lock"]',
		locale: {
			skip: <strong aria-label="skip">Dejar</strong>,
			next: <strong aria-label="next">Próximo</strong>,
			back: <strong aria-label="back">Atrás</strong>,
		},
		styles: {
			buttonNext: { backgroundColor: "#182d4c" },
			buttonBack: { color: "#182d4c" },
			buttonSkip: {
				backgroundColor: "#182d4c",
				color: "#fff",
				borderRadius: 4,
			},
			tooltip: { width: 300 },
		},
	},
];
const options = {
	view: new ol.View({ zoom: 1, center: [0, 0] }),
	controls: defaultControls(),
};
const Home = () => {
	const { logueado, setLogueado } = useContext(GlobalContext);
	const [map, setMap] = useState(new ol.Map());
	const [isBtnApiActive, setIsBtnApiActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [checkboxes, setCheckboxes] = useState([]);
	const [nameLayerHome, setNameLayerHome] = useState("");
	const [nameWorkHome, setNameWorkHome] = useState("");
	const [showLayer, setShowLayer] = useState(false);
	const [checkObjectHome, setCheckObjectHome] = useState({});
	const [listLayersActiveHome, setListLayersActiveHome] = useState(false);
	const [isActiveInfoHome, setIsActiveInfoHome] = useState(false);
	const [isActiveTable, setIsActiveTable] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [refMap, setRefMap] = useState(null);
	const [nameLayersHome, setNameLayersHome] = useState([]);
	const [wmsLayer, setWmsLayer] = useState([]);
	const [tableWidth, setTableWidth] = useState(0);
	const [propTransform, setPropTransform] = useState(0);
	const [run, setRun] = useState(false);
	const tour = useTour(STEPS, "LS_KEY", run);
	const { option } = useContext(GlobalContext);
	//const [pass, setPass] = useState(null);

	const handlOnChangeCheckLayer = (checks) => {
		//console.log("checks", checks);
		setCheckboxes(checks);
		//console.log("checkboxes`]", checkboxes);
	};

	const handlOnClickGetInfoTileLayer = async (e, mapRef) => {
		if (e.target.tagName !== "CANVAS") return;
		//	if (option.length === 0) return;
		if (!isActiveInfoHome) return;

		setRefMap(mapRef);
		setLoading(true);
		const view = map.getView();
		const viewResolution = view.getResolution();
		const viewProjection = view.getProjection();
		const coord = map.getEventCoordinate(e);
		//console.log("e>>>>>>>>>>>>>>", e);
		//console.log("view>>>>>>>>>>>>>>", view);
		//console.log("viewResolution>>>>>>>>>>>>>>", //viewResolution);
		//console.log("viewProjection>>>>>>>>>>>>>", viewProjection);
		//console.log("coord>>>>>>>>>>>>>>", map.getEventCoordinate(e));
		//console.log("evt.pixel>>>>>>>>>>>>>>", map.getEventPixel(e));
		const sourcesWMS = map
			.getLayers()
			.getArray()
			.map((layer) => layer.getSource());
		//console.log("sources>>>>>>>>>>>>>", sourcesWMS);
		const nameLayers = [];
		//const { layers } = sourcesWMS.map((layer) => layer.getParams());

		const promises = [];

		for (let i = 1; i < sourcesWMS.length; i++) {
			let { LAYERS } = sourcesWMS[i].getParams();
			nameLayers.push(LAYERS);

			if (nameLayers.length === 0) {
				setLoading(false);
				return;
			}

			setNameLayersHome([...nameLayers]);
			//console.log("nameLayers>>>>>>>>>>>>>", nameLayers);

			const url = sourcesWMS[i].getFeatureInfoUrl(
				coord,
				viewResolution,
				viewProjection,
				{
					QUERY_LAYERS: LAYERS,
					layers: LAYERS,
					INFO_FORMAT: "application/json",
					FEATURE_COUNT: 50,
				}
			);
			console.log("url>>>>>>>>>>>>>>", url);
			//console.log("source.join>>>>>>>>>", nameLayers.join(","));

			let result = {};
			if (url) {
				mapRef.classList.add("sidebar-bottom-open");
				setIsActiveTable(true);

				result = axios.get(url, option);
				promises.push(result);
				//promises.push({ LAYERS: result });
			} else {
				setTableData({ ...tableData, [LAYERS]: [] });
			}
		}
		//console.log("promises", promises);

		const results = await Promise.all(promises);
		//console.log("results", results);

		const aux = [];
		nameLayers.map((name, i) => {
			aux.push({ [name]: results[i].data.features });
		});
		setTableData([...aux]);
		setLoading(false);
		//setTableData({ ...tableData });
	};

	const handlOnClickCloseTable = () => {
		setIsActiveTable(false);
		refMap.classList.remove("sidebar-bottom-open");
	};

	useEffect(() => {
		setCheckboxes(checkboxes);
		setIsActiveInfoHome(isActiveInfoHome);
		/* console.log("nameWorkHome", nameWorkHome);
		console.log("listLayersActiveHome", listLayersActiveHome);
		console.log("checkboxes>>>", checkboxes);
		console.log("checkboxes.length", checkboxes.length);
		console.log("checkboxes[nameWorkHome]", checkboxes[nameWorkHome]); */
	}, [
		nameWorkHome,
		listLayersActiveHome,
		checkboxes,
		isActiveInfoHome,
		tableData,
	]);

	return (
		<>
			{!logueado && <Navigate to="/" replace={true} />}
			<ApiProvider
				isBtnApiActive={isBtnApiActive}
				setIsBtnApiActive={setIsBtnApiActive}
				loading={loading}
				setLoading={setLoading}
				setNameLayerHome={setNameLayerHome}
				setNameWorkHome={setNameWorkHome}
				setCheckObjectHome={setCheckObjectHome}
				setListLayersActiveHome={setListLayersActiveHome}
				setCheckboxes={setCheckboxes}
				setIsActiveInfoHome={setIsActiveInfoHome}
			>
				{tour}
				<NavigateComp setRun={setRun} run={run} />
				<BingMapProvider>
					<Map
						map={map}
						setMap={setMap}
						handlOnClickGetInfoTileLayer={handlOnClickGetInfoTileLayer}
					>
						{isBtnApiActive ? (
							<SideBarLeft
								isBtnApiActive={isBtnApiActive}
								setIsBtnApiActive={setIsBtnApiActive}
								handlOnChangeCheckLayer={handlOnChangeCheckLayer}
							/>
						) : (
							<Header setIsBtnApiActive={setIsBtnApiActive} />
						)}
						<Controls>
							<FullScreenControl />
							<MousePositionControl />
						</Controls>
						<BingMap />
						<Layers>
							{nameWorkHome &&
								listLayersActiveHome &&
								checkboxes &&
								checkboxes[nameWorkHome].map(({ name, checked }, i) => {
									//console.log("checkbox>>>", checked);

									return checked ? (
										<TileLayerComp
											key={i}
											map={map}
											setMap={setMap}
											checkbox={checked}
											wmsLayer={wmsLayer}
											setWmsLayer={setWmsLayer}
											setLoading={setLoading}
										/>
									) : (
										map
											.getLayers()
											.getArray()
											.forEach((layer) => {
												if (
													layer.get("name") &&
													layer.get("name") === `${nameWorkHome}:${name}`
												) {
													layer.getSource().clear();
													map.removeLayer(layer);
													setMap(map);
												}
											})
									);
								})}
						</Layers>
						{loading && <Loader />}
					</Map>
					{isActiveTable && (
						<TableInfo
							isBtnApiActive={isBtnApiActive}
							handlOnClickCloseTable={handlOnClickCloseTable}
							tableData={tableData}
							setTableData={setTableData}
							nameLayersHome={nameLayersHome}
							loading={loading}
							isActiveTable={isActiveTable}
							setTableWidth={setTableWidth}
							tableWidth={tableWidth}
							setPropTransform={setPropTransform}
							propTransform={propTransform}
						/>
					)}
				</BingMapProvider>
			</ApiProvider>
		</>
	);
};

export default Home;
