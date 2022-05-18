import React, { useContext, useRef, useState } from "react";
import ApiContext from "../../context/ApiContext";
import RowList from "./RowList";

const Accordion = ({ content }) => {
	const { accordionData, nameWork, setId } = useContext(ApiContext);
	const [active, setActive] = useState(false);
	const btnRef = useRef();
	return (
		<div className="accordion-item">
			<div className="accordion-title">
				<div
					className="accordion-button "
					ref={btnRef}
					onClick={(e) => {
						setActive(!active);
					}}
				>
					<div className="menu-item-with-children">
						{content.name}
					</div>
					<div>
						{active ? (
							<span className="fa fa-angle-down"></span>
						) : (
							<span className="fa fa-angle-up"></span>
						)}
					</div>
				</div>
				{active && (
					<div className="accordion-content">
						{console.log("dataContent>>>", content)}
						{content ? (
							content.map((item, i) => {
								//console.log("name>>>", item.name);
								return (
									<li>
										<RowList key={i} name={item.name} />
									</li>
								);
							})
						) : (
							<li>Sin Capas</li>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Accordion;
