import React, { useContext, useEffect, useRef } from "react";
import "font-awesome/css/font-awesome.css";
import ApiContext from "../../context/ApiContext";

const AddUserButton = ({ isStart, setIsStart }) => {
	const spanHeaderRef = useRef();

	return (
		<div
			className="header-menu-button "
			data-tut="reactour_btnApi"
			onClick={(e) => {
				setIsStart(true);
			}}
		>
			<i className="fa fa-bars"></i>
			{!isStart && (
				<span className="menu-button-tooltip" ref={spanHeaderRef}>
					Adicione usuarios aquí
				</span>
			)}
		</div>
	);
};

export default AddUserButton;
