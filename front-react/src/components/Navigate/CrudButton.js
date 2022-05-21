import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

const CrudButton = () => {
	const { isActiveCrud, setIsActiveCrud } = useContext(GlobalContext);
	return (
		<div
			className={"toolbar-item fa fa-user-plus help"}
			data-tut="reactour_crud"
			onClick={() => {
				setIsActiveCrud(true);
			}}
		>
			{isActiveCrud && <Navigate to="/usuarios" replace={true} />}
			<div className="toolbar-menu hidden"></div>
			<span className="tooltip bottom ">Administración</span>
		</div>
	);
};

export default CrudButton;
