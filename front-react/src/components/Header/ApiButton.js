import React, { useContext, useEffect, useRef } from "react";
import "font-awesome/css/font-awesome.css";
import ApiContext from "../../context/ApiContext";

const ApiButton = ({ setIsBtnApiActive }) => {
	const spanHeaderRef = useRef();
	const { isStart, setIsStart } = useContext(ApiContext);

	return (
		<div
			className="header-menu-button "
			data-tut="reactour_btnApi"
			onClick={(e) => {
				setIsBtnApiActive(true);
				setIsStart(true);
			}}
		>
			<i className="fa fa-bars"></i>
			{!isStart && (
				<span className="menu-button-tooltip" ref={spanHeaderRef}>
					Comience por aquí
				</span>
			)}
		</div>
	);
};

export default ApiButton;
