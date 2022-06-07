import React, { useContext, useEffect, useRef, useState } from "react";
import MapContext from "../../context/MapContext";
import * as ol from "ol";
import "ol/ol.css";
import BingMaps from "ol/source/BingMaps";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
/* import View from "ol/View"; */
import BingMapContext from "../../context/BingMapContext";
import ApiContext from "../../context/ApiContext";
import { defaults as defaultControls } from "ol/control";

const Map = ({ children, map, setMap, handlOnClickGetInfoTileLayer }) => {
	const { option } = useContext(BingMapContext);
	const { globalObject } = useContext(ApiContext);
	const mapRef = useRef();
	//const [map, setMap] = useState(new ol.Map());
	const [baseLayers, setBaseLayers] = useState([
		new TileLayer({
			source: new OSM(),
		}),
	]);
	const [oldOption, setOldOption] = useState("");

	/* 	useEffect(() => {
		if (option === "undefined") return;

		if (option === `OSM`) {
			baseLayers[0] = new TileLayer({
				zIndex: 1,
				source: new OSM(),
			});
		} else {
			baseLayers[0] = new TileLayer({
				visible: true,
				preload: Infinity,
				zIndex: 1,
				source: new BingMaps({
					key: "ApI_3Y8DJqfqosXubOLSkNtt2YV6_Qb-BROko8KZvTTxogknb2S_nvQskS6pFMcN",
					imagerySet: option,

					// use maxZoom 19 to see stretched tiles instead of the bingMaps
					// "no photos at this zoom level" tiles
					// maxZoom: 19
				}),
			});
		}

		setBaseLayers(baseLayers);
		console.log("baseLayersMap>>>", baseLayers);

		let options = {
			view: new ol.View({ zoom: 1, center: [0, 0] }),
			layers: [...baseLayers],
			controls: defaultControls(),
			//overlays: [],
		};

		let mapObject = new ol.Map(options);

		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		console.log("map>>>", map.getLayers().getArray());

		return () => {
			mapObject.setTarget(undefined);
		};
	}, [option]); */

	useEffect(() => {
		console.log("oldOption>>>", oldOption);
		console.log("option***>>>", option);
		console.log("globalObject***>>>", globalObject);
		//	if (option === undefined || option === null) return;
		let tileLayer = {};

		if (option === `OSM`) {
			tileLayer = new TileLayer({
				source: new OSM(),
			});
		} else {
			tileLayer = new TileLayer({
				visible: true,
				preload: Infinity,
				zIndex: 1,
				source: new BingMaps({
					key: "ApI_3Y8DJqfqosXubOLSkNtt2YV6_Qb-BROko8KZvTTxogknb2S_nvQskS6pFMcN",
					imagerySet: option,

					// use maxZoom 19 to see stretched tiles instead of the bingMaps
					// "no photos at this zoom level" tiles
					// maxZoom: 19
				}),
			});
		}

		tileLayer.set("name", option);
		tileLayer.set("zIndex", 1);

		let options = {
			view: new ol.View({ zoom: 1, center: [0, 0] }),
			controls: defaultControls(),
		};
		//let mapObject = map;
		let auxMap = new ol.Map(options); //map.getLayers().getArray(); //map.getLayers().getArray();
		let mapObject = new ol.Map(options);

		mapObject.addLayer(tileLayer);
		auxMap.setLayers(map.getLayers());

		//let tile = auxMap
		//	.getLayers()
		//	.getArray()
		//	.find((layer) => layer.get("name") === oldOption);

		let tile = {};

		if (auxMap.getLayers().getArray().length > 0) {
			tile = auxMap
				.getLayers()
				.getArray()
				.find((layer) => layer.get("name") === oldOption);

			//Array.from(auxMap).filter((layer) => layer.get("name") !== oldOption);

			if (tile) {
				console.log("tile>>>", tile);
				auxMap.removeLayer(tile);
			}

			let arrayTile = [
				...auxMap.getLayers().getArray(),
				...mapObject.getLayers().getArray(),
			];
			console.log("arrayTile>>>", arrayTile);
			mapObject.set("array_", arrayTile); //El error está aquí
			//	.getLayers()
		}

		setOldOption(option);
		console.log("auxMap>>", auxMap.getLayers().getArray());
		console.log("mapObject>>", mapObject.getLayers().getArray());
		//console.log("Map>>", map.getLayers().getArray());

		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		console.log("map-Option>>>", map.getLayers().getArray());

		return () => {
			mapObject.setTarget(undefined);
		};
	}, [option, globalObject]);

	/* useEffect(() => {
			if (option === "undefined") return;

		if (option === `OSM`) {
			baseLayers[0] = new TileLayer({
				source: new OSM(),
			});
		} else {
			baseLayers[0] = new TileLayer({
				visible: true,
				preload: Infinity,
				zIndex: 1,
				source: new BingMaps({
					key: "ApI_3Y8DJqfqosXubOLSkNtt2YV6_Qb-BROko8KZvTTxogknb2S_nvQskS6pFMcN",
					imagerySet: option,

					// use maxZoom 19 to see stretched tiles instead of the bingMaps
					// "no photos at this zoom level" tiles
					// maxZoom: 19
				}),
			});
		}

		//setBaseLayers(baseLayers);
		//console.log("baseLayersMap>>>", baseLayers);
		const tileLayer = new TileLayer({
			source: new OSM(),
			//zIndex: 1,
		});
		tileLayer.set("name", "OSM");
		tileLayer.set("zIndex", 1);

		let options = {
			view: new ol.View({ zoom: 1, center: [0, 0] }),
			//layers: [...baseLayers],
			controls: defaultControls(),
			//zIndex: 1,
			//overlays: [],
		};

		let mapObject = new ol.Map(options);
		mapObject.addLayer(tileLayer);

		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		console.log("map>>>", map.getLayers());

		return () => {
			mapObject.setTarget(undefined);
		};
	}, []); */

	/* 	useEffect(() => {
		if (option === undefined || option === null) return;

		map
			.getLayers()
			.getArray()
			.filter((layer) => !layer.get("name"));

		switch (option) {
			case "OSM":
			
				break;
			case "Aerial":
				const tileLayer = new TileLayer({
					visible: true,
					preload: Infinity,
					zIndex: 1,
					source: new BingMaps({
						key: "ApI_3Y8DJqfqosXubOLSkNtt2YV6_Qb-BROko8KZvTTxogknb2S_nvQskS6pFMcN",
						imagerySet: option,

						// use maxZoom 19 to see stretched tiles instead of the bingMaps
						// "no photos at this zoom level" tiles
						// maxZoom: 19
					}),
				});
				tileLayer.set("name", "Aerial");
				tileLayer.set("zIndex", 1);
				let options = {
					view: new ol.View({ zoom: 1, center: [0, 0] }),
					//layers: [...baseLayers],
					controls: defaultControls(),
					//zIndex: 1,
					//overlays: [],
				};

				let mapObject = new ol.Map(options);
				mapObject.addLayer(tileLayer);

				mapObject.setTarget(mapRef.current);
				setMap(mapObject);

				console.log("map>>>", map.getLayers());

				return () => {
					mapObject.setTarget(undefined);
				};
				break;
			case "AerialWithLabelsOnDemand":
				break;
			case "RoadOnDemand":
				break;
			case "CanvasDark":
				break;

			default:
				return;
				break;
		}
	}, [option]); */

	const data = {
		map,
		setMap,
		baseLayers,
		setBaseLayers,
	};

	return (
		<MapContext.Provider value={data}>
			<div
				id="ol-map"
				ref={mapRef}
				className="ol-map"
				onClick={(e) => handlOnClickGetInfoTileLayer(e, mapRef.current)}
				//onChange={handlerSelectBing}
			>
				{children}
			</div>
		</MapContext.Provider>
	);
};

export default Map;
