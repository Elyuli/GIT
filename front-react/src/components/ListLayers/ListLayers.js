import React, { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import Checkboxes from "../Checkboxes/Checkboxes";
//import RowList from "../Accordion/RowList";
import RowListLayers from "./RowListLayers";

const ListLayers = ({ nameWork, content }) => {
	//const { accordionData } = useContext(ApiContext);

	return (
		<>
			{/* {console.log("content", content)} */}
			<li className="menu-item-with-children selected active">
				{nameWork}
			</li>
			{content.length > 0 ? (
				content.map(({ name }, i) => (
					<li>
						<RowListLayers
							key={i}
							name={name}
							content={content}
							id={i}
						/>
					</li>
				))
			) : (
				<li>No hay Capas</li>
			)}
		</>
	);
};

export default ListLayers;
