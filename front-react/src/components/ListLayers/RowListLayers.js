import React, { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import Checkboxes from "../Checkboxes/Checkboxes";

const RowListLayers = ({ name, content, id }) => {
	const { setListLayersActive, setNameWork } = useContext(ApiContext);
	return (
		<div
			className="menu-item-layer"
			onClick={(e) => {
				setListLayersActive(true);
				//setNameWork(name);
			}}
		>
			{name}
			{/* <Checkboxes key={id} content={content} id={id} /> */}
		</div>
	);
};

export default RowListLayers;
