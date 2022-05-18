import React from "react";
import ApiButton from "./ApiButton";
import Logo from "./Logo";

const Header = ({ setIsBtnApiActive }) => {
	return (
		<div className="application-header">
			<Logo />
			<ApiButton setIsBtnApiActive={setIsBtnApiActive} />
		</div>
	);
};

export default Header;
