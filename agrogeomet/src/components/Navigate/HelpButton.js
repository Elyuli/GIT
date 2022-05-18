import { useContext } from "react";
import ApiContext from "../../context/ApiContext";

const HelpButton = ({ setRun, run }) => {
	const { isActiveHelp, setIsActiveHelp, handlOnClickIHelpBtn } =
		useContext(ApiContext);

	return (
		<div
			className={
				isActiveHelp
					? "toolbar-item fa fa-question help active"
					: "toolbar-item fa fa-question help"
			}
			data-tut="reactour_help"
			onClick={() => {
				setRun(!run);
				console.log("run>>>", run);
			}}
		>
			<div className="toolbar-menu hidden"></div>
			<span className="tooltip bottom ">Ayuda</span>
		</div>
	);
};

export default HelpButton;
