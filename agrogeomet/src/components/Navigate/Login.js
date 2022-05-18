import { LoginOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import ApiContext from "../../context/ApiContext";

const Login = () => {
	const { isActiveLogin, setIsActiveLogin } = useContext(ApiContext);
	return (
		<div
			className={
				isActiveLogin
					? "toolbar-item fa fa-user info  active"
					: "toolbar-item fa fa-user info"
			}
			data-tut="reactour_login"
			onClick={() => setIsActiveLogin(!isActiveLogin)}
		>
			{/* <LoginOutlined /> */}
			<div className="toolbar-menu hidden"></div>
			<span className="tooltip bottom ">Información de las capas</span>
		</div>
	);
};

export default Login;
