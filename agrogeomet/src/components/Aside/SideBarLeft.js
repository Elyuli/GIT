import React, { useContext, useEffect, useRef } from "react";
import "font-awesome/css/font-awesome.css";
import companyLogo from "../../assets/Logo_eicma.png";
import ApiContext from "../../context/ApiContext";
//import Accordion from "../Accordion/Accordion";
import RowList from "../ListLayers/RowList";
import Checkboxes from "../Checkboxes/Checkboxes";

const SideBarLeft = ({
	isBtnApiActive,
	setIsBtnApiActive,
	handlOnChangeCheckLayer,
}) => {
	const sidebarRef = useRef();
	const {
		workspaces,
		setWorkspaces,
		setUrlWorkLayers,
		nameWork,
		setNameWork,
		nameLayer,
		setNameLayer,
		accordionData,
		setAccordionData,
		listLayersActive,
		setListLayersActive,
		globalObject,
		setGlobalObject,
	} = useContext(ApiContext);

	const handlOnClickCloseSideBarLeft = (e) => {
		if (e.target) {
			sidebarRef.current.classList.add("hide-sidebar");
			setIsBtnApiActive(false);
			setNameWork("");
			setNameLayer("");
			setAccordionData([]);
			setUrlWorkLayers(null);
			setListLayersActive(false);
		}
	};

	useEffect(() => {
		//console.log("globalObject", globalObject);
		if (isBtnApiActive) {
			sidebarRef.current.classList.remove("hide-sidebar");
		} /* else {
			sidebarRef.current.classList.add("hide-sidebar");
		} */
	}, [isBtnApiActive]);

	useEffect(() => {
		setGlobalObject(globalObject);
	}, [globalObject]);

	return (
		<div
			className="sidebar-left allow-transition hide-sidebar"
			ref={sidebarRef}
		>
			<div className="menu-header">
				<img
					src={companyLogo}
					alt="EICMA Logo"
					className="menu-header-logo"
				/>
				<button
					className="menu-header-button fa fa-times"
					onClick={(e) => handlOnClickCloseSideBarLeft(e)}
				/>
				<h1 className="menu-header-title">
					Mostrar capas
					<small className="menu-header-caption">
						Elegir categoría
					</small>
				</h1>
			</div>
			<ul className="menu menu-container">
				<li
					className="menu-item-all-layers"
					onClick={(e) => setListLayersActive(false)}
				>
					{!listLayersActive ? (
						<span>Espacios de Trabajo</span>
					) : (
						<span>
							<i className="fa fa-arrow-left"></i> Espacios de
							Trabajo
						</span>
					)}
				</li>
				<div className="menu-item-container">
					{workspaces &&
						!listLayersActive &&
						isBtnApiActive &&
						workspaces.map((work, i) => (
							<RowList
								key={i}
								name={work.name}
								//content={accordionData}
							/>
						))}
				</div>
				<div className="menu-item-container">
					{globalObject && isBtnApiActive && listLayersActive && (
						<>
							<li className="menu-item-with-children selected active">
								{nameWork}
							</li>
							<Checkboxes
								content={globalObject[nameWork]}
								handlOnChangeCheckLayer={
									handlOnChangeCheckLayer
								}
							/>
						</>
					)}
				</div>
				<div className="menu-item-container">
					{globalObject === undefined && listLayersActive && (
						<div>
							<li className="menu-item-with-children selected active">
								{nameWork}
							</li>
							<li className="menu-item-layer">No hay Capas</li>
						</div>
					)}
				</div>
			</ul>
		</div>
	);
};

export default SideBarLeft;
