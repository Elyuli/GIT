import React, { useContext } from "react";
import {
	HashRouter,
	Route,
	Routes,
	Navigate,
	BrowserRouter as Router,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
	return (
		<GlobalProvider>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/visor" element={<Home />} />
						<Route path="/usuarios" element={<Users />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Router>
			</div>
		</GlobalProvider>
	);
}

export default App;
