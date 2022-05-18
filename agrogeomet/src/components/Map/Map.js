import React, { useContext, useEffect, useRef, useState } from "react";
import MapContext from "../../context/MapContext";
import * as ol from "ol";
import "ol/ol.css";
import BingMaps from "ol/source/BingMaps";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
/* import View from "ol/View"; */
import BingMapContext from "../../context/BingMapContext";
import { defaults as defaultControls } from "ol/control";

const Map = ({ children, map, setMap, handlOnClickGetInfoTileLayer }) => {
	const { option } = useContext(BingMapContext);
	const mapRef = useRef();
	//const [map, setMap] = useState(new ol.Map());
	const [baseLayers, setBaseLayers] = useState([
		new TileLayer({
			source: new OSM(),
		}),
	]);

	useEffect(() => {
		if (option === "undefined") return;

		if (option === `OSM`) {
			baseLayers[0] = new TileLayer({
				source: new OSM(),
			});
		} else {
			baseLayers[0] = new TileLayer({
				visible: true,
				preload: Infinity,
				zIndex: 0,
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
	}, [option]);

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
