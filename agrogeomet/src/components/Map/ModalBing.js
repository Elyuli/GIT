import React, { useContext, useEffect, useRef } from "react";
import BingMapContext from "../../context/BingMapContext";

const ModalBing = () => {
	const { handleBindOption, setModalRef, handleShowModal } =
		useContext(BingMapContext);
	const modalRef = useRef();

	useEffect(() => {
		setModalRef(modalRef.current);
	}, [modalRef]);

	return (
		<>
			<div
				className="navbar-modal"
				ref={modalRef}
				onMouseLeave={(e) => handleShowModal(e, modalRef)}
				onClick={(e) => handleBindOption(e, modalRef.current)}
			>
				<div id={"Aerial"}>Aérea</div>
				<div id={"AerialWithLabelsOnDemand"}>Etiquetas</div>
				<div id={"RoadOnDemand"}>Calles</div>
				<div id={"CanvasDark"}>Oscuro</div>
				<div id={"OSM"}>OSM</div>
			</div>
		</>
	);
};

export default ModalBing;
