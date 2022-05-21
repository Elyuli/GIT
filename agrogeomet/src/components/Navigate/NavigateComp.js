import React from "react";
import "font-awesome/css/font-awesome.css";
import InfoButton from "./InfoButton";
import HelpButton from "./HelpButton";
import CrudButton from "./CrudButton";
import Login from "./Login";
import CerrarSesion from "./CerrarSesion";

const Navigate = ({ setRun, run }) => {
	return (
		<div className="platform-toolbar" data-tut="reactour_toolbar">
			<HelpButton setRun={setRun} run={run} />
			<InfoButton />
			<CrudButton />
			<CerrarSesion />
		</div>
	);
};

export default Navigate;
