import React from "react";
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

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/usuarios" element={<Users />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
