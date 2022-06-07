import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const CerrarSesion = () => {
	const { logueado, setLogueado } = useContext(GlobalContext);

	return (
		<div
			className={logueado ? "toolbar-item fa fa-lock info" : undefined}
			data-tut="reactour_lock"
			onClick={() => setLogueado(false)}
		>
			<div className="toolbar-menu hidden"></div>
			<span className="tooltip bottom ">Cerrar Sesión</span>
		</div>
	);
};

export default CerrarSesion;
