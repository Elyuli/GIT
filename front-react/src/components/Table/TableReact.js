import { TableCell, TableRow } from "@mui/material";
import React from "react";

const TableReact = ({ tableData, propertie, page, rowsPerPage }) => {
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
	return (
		<>
			<div className="ReactTable">
				<div className="rt-table" role="grid">
					<div className="rt-thead header">
						<div className="rt-tr" role="row">
							{tableData.length > 0 &&
								tableData.map(({ id, properties }, i) => {
									//console.log("id>>>", id);
									/* console.log(
										"properties-ReacTable>>>",
										Object.keys(properties)
									); */
									//	properties.id = id;
									if (i >= 1) {
										return;
									}
									return (
										<>
											{id !== "" && (
												<div className="rt-th rt-resizable-header cursor-pointer">
													<div className="rt-resizable-header-content">id</div>
													<div className="rt-resizer"></div>
												</div>
											)}
											{Object.keys(properties).map((prop, j) => {
												return (
													<div
														className="rt-th rt-resizable-header cursor-pointer"
														key={j}
													>
														<div className="rt-resizable-header-content">
															{prop}
														</div>
														<div className="rt-resizer"></div>
													</div>
												);
											})}
										</>
									);
								})}
						</div>
					</div>
					<div className="rt-tbody">
						{tableData.length > 0 &&
							tableData
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(({ id, properties }, i) => {
									//console.log("id>>>", id);
									/* console.log("properties>>>", Object.keys(properties)); */
									//	properties.id = id;
									return (
										<>
											<div key={i} className="rt-tr-group" role="rowgroup">
												<div className="rt-tr" role="row">
													{id !== "" && (
														<div className="rt-td" role="gridcell">
															{id}
														</div>
													)}
													{Object.values(properties).map((prop, j) => {
														return (
															<div className="rt-td" role="gridcell" key={j}>
																{prop}
															</div>
														);
													})}
												</div>
											</div>
										</>
									);
								})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 20 * emptyRows }}>
								{/* <TableCell style={{ width: "100%" }} /> */}
							</TableRow>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default TableReact;
