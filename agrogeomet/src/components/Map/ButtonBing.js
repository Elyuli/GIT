import React, { useContext, useEffect, useRef, useState } from "react";
import BingMapContext from "../../context/BingMapContext";

const ButtonBing = () => {
	const { option, name, url, handleShowModal, handlOnMouseLeave, setBtnRef } =
		useContext(BingMapContext);
	/* const { map } = useContext(MapContext); */
	/* const [osm, setOsm] = useState(true); */
	const btnRef = useRef();
	/* const osmRef = useRef(); */

	useEffect(() => {
		btnRef.current.style.setProperty("background-image", url);
		console.log(
			"url>>",
			getComputedStyle(btnRef.current).getPropertyValue(
				"background-image"
			)
		);
	}, [url]);

	useEffect(() => {
		setBtnRef(btnRef.current);
	}, []);

	return (
		<>
			{/* {map === "OSM" ? (
				<div
					className="osm-button"
					onMouseOver={(e) => handleShowModal(e, btnRef.current)}
					ref={osmRef}
				>
					OSM
				</div> */}
			{/* ) : ( */}
			<div
				className="navbar-button"
				id={option}
				onMouseOver={(e) => handleShowModal(e, btnRef.current)}
				ref={btnRef}
				//onMouseLeave={(e) => handlOnMouseLeave(e)}
			>
				{name}
			</div>
			{/* )} */}
		</>
	);
};

export default ButtonBing;
