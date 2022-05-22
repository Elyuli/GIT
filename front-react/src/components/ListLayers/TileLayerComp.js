import { useContext, useEffect } from "react";
import MapContext from "../../context/MapContext";
import OLTileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import ApiContext from "../../context/ApiContext";

const TileLayerComp = ({
	zIndex = 1,
	map,
	setMap,
	checkbox,
	wmsLayer,
	setWmsLayer,
	setLoading,
}) => {
	//const { map, setMap, wmsLayer, setWmsLayer } = useContext(MapContext);
	const { nameWork, nameLayer } = useContext(ApiContext);

	useEffect(() => {
		if (!map) return;

		//console.log("nameWork-Tile", nameWork);
		//console.log("nameLayer-check", nameLayer);

		const tileLayer = new OLTileLayer({
			source: new TileWMS({
				url: "http://localhost:8080/geoserver/wms",
				params: {
					LAYERS: `${nameWork}:${nameLayer}`,
					TILED: true,
				},
				serverType: "geoserver",
				// Countries have transparency, so do not fade tiles:
				transition: 0,
			}),
			zIndex: 1,
		});

		tileLayer.set("name", `${nameWork}:${nameLayer}`);
		//wmsLayer.push(tileLayer);
		//setWmsLayer(wmsLayer);

		if (
			checkbox &&
			map &&
			!map
				.getLayers()
				.getArray()
				.find(
					(layer) =>
						layer.get("name") && layer.get("name") === tileLayer.get("name")
				)
		) {
			//console.log("nameLayer-home", nameLayer);
			//console.log("nameWork-home", nameWork);
			setLoading(true);
			console.log("tileLayer-home", tileLayer.get("name"));
			map.addLayer(tileLayer);
			setMap(map);
			setLoading(false);
			console.log("map-TILE", map.getLayers().getArray());
		}
	}, [checkbox]);

	return null;
};

export default TileLayerComp;
