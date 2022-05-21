import React, { useEffect, useRef, useState } from "react";
import "font-awesome/css/font-awesome.css";
import TableReact from "./TableReact";

const InfoLayer = ({
	handlOnClickSetNameLayerTable,
	tableData,
	name,
	i,
	isActiveTable,
	nameLayerTable,
	currentPage,
	labelsPerPage,
	currentLabels,
	firstPageIndex,
	lastPageIndex,
	labels,
}) => {
	const animatedRef = useRef();
	const [cont, setCont] = useState(0);

	/* 	useEffect(() => {
		if (!isActiveTable) return;
		if (!nameLayerTable) return;

		tableData[nameLayerTable].map((i) => {
			return i === 0
				? document
						.getElementById(`custom-head-table-${nameLayerTable}-0`)
						.classList.add("rc-tabs-tab-active")
				: document
						.getElementById(
							`custom-head-table-${nameLayerTable}-${i + 1}`
						)
						.classList.add("rc-tabs-tab-inactive");
		});
	}, []); */

	return (
		<>
			{Object.keys(labels)
				.slice(firstPageIndex, lastPageIndex)
				.map((i = 1) => {
					//console.log("labels[i]", labels[i]);
					const { name, id } = labels[i];

					return (
						<>
							{name && (
								<div
									key={`rc-tabs-tab-${id}`}
									className="rc-tabs-tab" //rc-tabs-tab-active
									role="tab"
									aria-disabled="false"
									aria-selected="true"
									data-id={id}
								>
									<label
										htmlFor={`slide-${id}`}
										key={`custom-head-table-${name}-${id}`}
										id={`dot-${id}`}
										className={`slide-${id}`}
										data-id={id}
										onClick={(e) => handlOnClickSetNameLayerTable(e, id)}
									>
										{name}
										<span></span>
										{/* <span className="badge bg-green">{cont}</span> */}
									</label>
								</div>
							)}
						</>
					);
				})}
		</>
	);
};

export default InfoLayer;
