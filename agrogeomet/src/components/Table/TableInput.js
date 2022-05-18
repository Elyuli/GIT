import React, { useState } from "react";

const TableInput = ({ i }) => {
	//const [checked, setChecked] = useState(false);
	return (
		<>
			<input
				key={`table-info-input-${i}`}
				type="radio"
				name="slides"
				id={`slide-${i}`}
				/* onChange={() => {
					setChecked(!checked);
				}} */
				//checked={checked}
			></input>
		</>
	);
};

export default TableInput;
