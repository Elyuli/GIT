import React, { useRef, useState } from "react";

const TableInput = ({ i }) => {
	//const [checked, setChecked] = useState(false);
	//const inputRef = useRef();
	//console.log(" inputRef.current>>", inputRef.current);
	return (
		<>
			<input
				//ref={inputRef}
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
