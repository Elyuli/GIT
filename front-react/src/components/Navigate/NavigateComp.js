import React, { useContext } from "react";
import "font-awesome/css/font-awesome.css";
import InfoButton from "./InfoButton";
import HelpButton from "./HelpButton";
import CrudButton from "./CrudButton";
import Login from "./Login";
import CerrarSesion from "./CerrarSesion";
import GlobalContext from "../../context/GlobalContext";

const Navigate = ({ setRun, run }) => {
	const { user } = useContext(GlobalContext);
	console.log("user", user);
	return (
		<div className="platform-toolbar" data-tut="reactour_toolbar">
			<HelpButton setRun={setRun} run={run} />
			<InfoButton />
			{user != null && user.role === "admin" && <CrudButton />}
			<CerrarSesion />
		</div>
	);
};

export default Navigate;
