import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const [logueado, setLogueado] = useState(false);
	const [isActiveCrud, setIsActiveCrud] = useState(false);

	const data = {
		logueado,
		setLogueado,
		isActiveCrud,
		setIsActiveCrud,
	};
	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export { GlobalProvider };

export default GlobalContext;
