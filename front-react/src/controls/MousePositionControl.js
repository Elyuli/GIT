import { useContext, useEffect } from "react";
import { MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate";
import MapContext from "../context/MapContext";

const MousePositionControl = ({ locationRef }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let mousePositionControl = new MousePosition({
			coordinateFormat: createStringXY(4),
			projection: "EPSG:4326",
			className: "ol-control-mouseposition",
			target: `${locationRef}`,
		});

		map.controls.push(mousePositionControl);

		return () => map.controls.remove(mousePositionControl);
	}, [map]);

	return null;
};

export default MousePositionControl;
