import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import "font-awesome/css/font-awesome.css";
import ApiContext from "../../context/ApiContext";
import InfoLayer from "./InfoLayer";
import TableReact from "./TableReact";
import "./TableInfo.css";
import TableInput from "./TableInput";
import { Pagination, PaginationItem, TablePagination } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import classnames from "classnames";

const TableInfo = ({
	isBtnApiActive,
	handlOnClickCloseTable,
	tableData,
	setTableData,
	nameLayersHome,
	loading,
	isActiveTable,
	tableWidth,
	setTableWidth,
	setPropTransform,
	propTransform,
}) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [labelsPerPage, setLabelsPerPage] = useState(3);
	const [totalLabels, setTotalLabels] = useState(0);
	const [labels, setLabels] = useState([]);
	const [restoTabsNav, setRestoTabsNav] = useState(null);
	const [totalTabsNav, setTotalTabsNav] = useState(0);
	const slidesRef = useRef();
	const tableRef = useRef();
	const tabsNavRef = useRef();
	const labelsRef = useRef();

	useEffect(() => {
		if (isBtnApiActive) {
			tableRef.current.classList.add("sidebar-bottom-left-open");
			//tableRef.current.classList.remove("hide-sidebar-bottom");
		} else {
			//tableRef.current.classList.add("hide-sidebar-bottom");
			tableRef.current.classList.remove("sidebar-bottom-left-open");
		}
	}, [isBtnApiActive]);

	useEffect(() => {
		console.log("tableData", tableData);
		if (Object.keys(tableData).length === 0) return;

		let contador = 0;
		let size = 0;
		let arrayLabels = [];
		tableData.map((item, i) => {
			/* 	console.log("i", i);
			console.log("tableData[i]", tableData[i]); */

			const propertie = Object.keys(tableData[i]);

			size = Object.values(tableData[i][propertie]).length;

			if (size > 0) {
				contador++;
				arrayLabels.push({ name: propertie[0], id: i, active: false });
			}
		});
		console.log("size", size);
		console.log("contador", contador);
		setTotalLabels(contador);
		setLabels([...arrayLabels]);

		let cont = 0;
		let contTransform = 0;
		Object.keys(tableData).map((i) => {
			const propertie = Object.keys(tableData[i]);
			let size = Object.values(tableData[i][propertie]).length;

			if (size > 0) {
				cont += 100;
				contTransform++;
			}
		});
		console.log("contTransform", contTransform);
		let util = 100 / contTransform;
		console.log("util", util);
		setPropTransform(util);
		setTableWidth(cont);
	}, [tableData]);

	useEffect(() => {
		if (labels.length === 0) return;

		//console.log("labels-useEffect", labels);
		//console.log("currentPage-useEffect", currentPage);
		//console.log("lastPageIndex-useEffect", lastPageIndex);
		//console.log("labels.length-useEffect", labels.length);

		Object.keys(labels).map((i) => {
			const { active, id } = labels[i];

			const $label = document.getElementById(`dot-${id}`);
			//console.log("$label-useEffect", $label);

			if (active && $label !== null) {
				$label.classList.add("rc-tabs-tab-active");
			} else if ($label !== null) $label.classList.remove("rc-tabs-tab-active");
		});
	}, [labels, currentPage]);

	const firstPageIndex = (currentPage - 1) * labelsPerPage;
	const lastPageIndex = firstPageIndex + labelsPerPage;

	const nextHandler = (e) => {
		//console.log("e-next-totalLabels", totalLabels);
		//console.log("e-next-labels", labels);
		const nextPage = currentPage + 1;

		if (lastPageIndex >= labels.length) {
			e.target.classList.add("rc-tabs-tab-btn-disabled");
			return;
		} else e.target.classList.remove("rc-tabs-tab-btn-disabled");

		setCurrentPage(nextPage);
	};

	const prevHandler = (e) => {
		//console.log("e-prev-labels", labels);

		const prevPage = currentPage - 1;

		if (prevPage === 0) {
			//e.target.classList.add("rc-tabs-tab-btn-disabled");
			return;
		} //else e.target.classList.remove("rc-tabs-tab-btn-disabled");

		setCurrentPage(prevPage);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const handlOnClickSetNameLayerTable = (e, uid) => {
		//console.log("	$e", e);
		//console.log("labels>>>>", labels);

		const $collectionLabels = labelsRef.current.childNodes;
		console.log("	$collectionLabels", $collectionLabels);

		let aux = [];
		Object.keys(labels).map((i) => {
			console.log("labels", labels[i]);

			let { name, id, active } = labels[i];

			if (id === uid) {
				active = true;
				aux.push({ name: name, id: id, active: active });

				let transform = (100 / labels.length) * (uid - 1);
				console.log("transform", transform);
				//let transform = propTransform * uid;
				//	let transformBottom = 184 * (uid - 1);
				slidesRef.current.style.transform = `translateX(${-transform}%)`;
			} else {
				active = false;
				aux.push({ name: name, id: id, active: active });
			}
		});
		setLabels([...aux]);
	};

	return (
		<>
			<div
				className="sidebar-bottom allow-transition-sidebar-bottom "
				ref={tableRef}
			>
				<div className="sidebar-bottom-content">
					<a
						className="sidebar-bottom-trash-button fa fa-trash"
						role="button"
						aria-label="Eliminar info"
						onClick={() => handlOnClickCloseTable()}
					></a>
					<div className="info-layer-container info-flex-container">
						{/* {loading && (
							<div className="module-loading " ref={moduleRef}>
								<div className="spinner">
									<i className="fa fa-spinner fa-spin" aria-hidden="true">
										Cargando...
									</i>
								</div>
							</div>
						)} */}
						<div className="sticky-title">Sobre capas</div>
						<div className="table-content-info">
							<div className="about-container info">
								<div className="rc-tabs rc-tabs-top">
									<article className="carousel">
										<aside className="slides-nav">
											<div className="rc-tabs-bar" role="tablist" tabIndex="0">
												<div className="rc-tabs-nav-container rc-tabs-nav-container-scrolling">
													<span
														unselectable="unselectable"
														className={classnames("rc-tabs-tab-prev", {
															//disabled: currentPage === 1,
														})}
														onClick={(e) => prevHandler(e)}
													>
														<span className="rc-tabs-tab-icon">
															<ArrowBackIosIcon
																sx={{ heigth: 12, width: 12 }}
															/>
														</span>
													</span>
													<span
														unselectable="unselectable"
														className={classnames("rc-tabs-tab-next", {
															/* disabled: lastPageIndex >= labels.length, */
														})}
														onClick={(e) => nextHandler(e)}
													>
														<span className="rc-tabs-tab-icon">
															<ArrowForwardIosIcon
																sx={{ heigth: 12, width: 12 }}
															/>
														</span>
													</span>
													<div className="rc-tabs-nav-wrap">
														<div className="rc-tabs-nav-scroll">
															{" "}
															<div
																className="rc-tabs-nav rc-tabs-nav-animated"
																ref={tabsNavRef}
																style={{ width: `${184 * totalLabels}px` }}
															>
																{/* <div
																	className="rc-tabs-ink-bar rc-tabs-ink-bar-animated"
																	ref={animatedRef}
																	style={{
																		display: "block",
																		transform: "translate3d(0px,0px,0px)",
																		width: "184px",
																	}}
																></div> */}
																<div
																	className="container-labels-info"
																	ref={labelsRef}
																>
																	{Object.keys(tableData).length > 0 && (
																		<InfoLayer
																			currentPage={currentPage}
																			labelsPerPage={labelsPerPage}
																			handlOnClickSetNameLayerTable={
																				handlOnClickSetNameLayerTable
																			}
																			isActiveTable={isActiveTable}
																			tableData={tableData}
																			firstPageIndex={firstPageIndex}
																			lastPageIndex={lastPageIndex}
																			labels={labels}
																		/>
																	)}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</aside>
										{Object.keys(tableData).length > 0 &&
											Object.keys(tableData).map((i) => {
												const propertie = Object.keys(tableData[i]);
												console.log(
													"table-data-propertie>>>",
													Object.values(tableData[i][propertie])
												);
												let size;
												if (
													propertie !== null ||
													propertie !== undefined ||
													Object.values(tableData[i][propertie]).length > 0
												) {
													size = Object.values(tableData[i][propertie]).length;
												}

												if (size > 0) return <TableInput key={i} i={i} />;
											})}
										{tableData.length > 0 && ( //Arreglar
											<TablePagination
												component="div"
												page={page}
												count={100}
												onPageChange={handleChangePage}
												rowsPerPage={rowsPerPage}
												onRowsPerPageChange={handleChangeRowsPerPage}
												rowsPerPageOptions={[5, 10, 25, 50, 100]}
											/>
										)}
										<ul className="slides" ref={slidesRef}>
											{Object.keys(tableData).length > 0 ? (
												Object.keys(tableData).map((i) => {
													const propertie = Object.keys(tableData[i]);
													let size = Object.values(
														tableData[i][propertie]
													).length;

													if (size > 0) {
														if (slidesRef.current)
															slidesRef.current.style.width = `${tableWidth}%`;
														//setTableWidth(cont);
														/* console.log("cont", tableWidth);
											console.log("slidesRef.current", slidesRef.current.style); */
														return (
															<li className="slide">
																<TableReact
																	key={`table-slide-${propertie}-${i}`}
																	tableData={tableData[i][propertie]}
																	propertie={propertie[0]}
																	page={page}
																	rowsPerPage={rowsPerPage}
																/>
															</li>
														);
													}
												})
											) : (
												<>No hay Datos</>
											)}
										</ul>
									</article>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TableInfo;
