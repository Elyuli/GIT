import React, { useContext } from "react";
import ApiContext from "../../context/ApiContext";

const InfoButton = () => {
	const { isActiveInfo, setIsActiveInfo } = useContext(ApiContext);

	return (
		<div
			className={
				isActiveInfo
					? "toolbar-item fa fa-info info active"
					: "toolbar-item fa fa-info info"
			}
			data-tut="reactour_info"
			onClick={() => setIsActiveInfo(!isActiveInfo)}
		>
			<div className="toolbar-menu hidden"></div>
			<span className="tooltip bottom ">Información de las capas</span>
		</div>
	);
};

export default InfoButton;
