import React, { useContext } from "react";
import ApiContext from "../../context/ApiContext";

const CrudButton = () => {
	const { isActiveCrud, setIsActiveCrud, handlOnClickIHelpBtn } =
		useContext(ApiContext);
	return (
		<div
			className={
				isActiveCrud
					? "toolbar-item fa fa-user-plus help active"
					: "toolbar-item fa fa-user-plus help"
			}
			data-tut="reactour_crud"
			onClick={() => {
				setIsActiveCrud(!isActiveCrud);
			}}
		>
			<div className="toolbar-menu hidden"></div>
			<span className="tooltip bottom ">Ayuda</span>
		</div>
	);
};

export default CrudButton;
