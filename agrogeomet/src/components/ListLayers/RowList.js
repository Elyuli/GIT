import React, { useContext } from "react";
import ApiContext from "../../context/ApiContext";

const RowList = ({ name }) => {
	const { setListLayersActive, setNameWork } = useContext(ApiContext);
	return (
		<div
			className="menu-item-with-children"
			onClick={(e) => {
				setListLayersActive(true);
				setNameWork(name);
			}}
		>
			{name}
		</div>
	);
};

export default RowList;
