import React, { useContext, useEffect, useRef, useState } from "react";
import ApiContext from "../../context/ApiContext";

const toppings = [
	{
		name: "Capsicum",
		price: 1.2,
	},
	{
		name: "Paneer",
		price: 2.0,
	},
	{
		name: "Red Paprika",
		price: 2.5,
	},
	{
		name: "Onions",
		price: 3.0,
	},
	{
		name: "Extra Cheese",
		price: 3.5,
	},
	/* 	{
		name: "Baby Corns",
		price: 3.0,
	},
	{
		name: "Mushroom",
		price: 2.0,
	}, */
];
const Checkboxes = ({ content, handlOnChangeCheckLayer }) => {
	const inputRef = useRef();
	const {
		setListLayersActive,
		setNameLayer,
		checkObject,
		setCheckObject,
		nameWork,
		globalObject,
		setGlobalObject,
	} = useContext(ApiContext);

	/* useEffect(() => {
		console.log("Cambio en el content-check", content);
	}, [content]);

	useEffect(() => {
		console.log(
			"Cambio en el globalObject[nameWork]-check",
			globalObject[nameWork]
		);
	}, [globalObject]);

	useEffect(() => {
		setGlobalObject(globalObject);
		console.log(
			"Cambio en el globalObject[nameWork]-1-check",
			globalObject[nameWork]
		);
	}, [globalObject]); */

	const handleOnChangeCheckbox = (e, position, name, check) => {
		/* console.log("checked>>>", !check);
		console.log("position>>>", position);
		console.log(" e.target.id>>>", e.target.id);
		console.log(" e.target.checked>>>", e); */
		setListLayersActive(true);
		setNameLayer(name);

		const updatedCheckObject = content.map(({ name, checked }, index) =>
			index === position
				? (content[index] = {
						name: name,
						checked: !check,
				  })
				: (content[index] = {
						name: name,
						checked: checked,
				  })
		);
		globalObject[nameWork] = updatedCheckObject;
		/* if (e.target) {
			console.log("e.target>>>", e.getComputedStyles());
			e.target.classList.add("layer-selected");
		} else {
			e.target.classList.remove("layer-selected");
		} */
		/* updatedCheckedState[e.target.id]
			? e.target.classList.add("selected active")
			: e.target.classList.remove("layer-selected"); */
		setGlobalObject(globalObject);
		setCheckObject(updatedCheckObject);
		handlOnChangeCheckLayer(globalObject);
		//console.log("updatedCheckObject>>>", globalObject);
	};

	return (
		<>
			{/* {console.log("content-check", content)}
			{console.log("globalObject-check", globalObject[nameWork])}
			{console.log("content.length-check", content.length)} */}
			{/* {console.log("checkedState-check", checkedState)}
			{console.log("typeof checkedState-check", typeof checkedState)}
			{console.log("isArray checkedState-check", Array.isArray(content))}
			{console.log("typeof toppings-check", typeof toppings)} */}

			{content.map(({ name, checked }, index) => {
				/* console.log(
					"content[index]",
					globalObject[nameWork][index].checked
				);
				console.log(
					"content[index]",
					`${index} - ${name} - ${checked}`
				);
				console.log("checked-loop", checked); */
				return (
					<li key={`${nameWork}-${name}-${index}`}>
						<div className="toppings-list-item">
							<div className="menu-item-layer">
								<input
									ref={inputRef}
									type="checkbox"
									id={`custom-checkbox-${nameWork}-${name}-${index}`}
									name={name}
									value={name}
									checked={checked}
									onChange={(e) => {
										handleOnChangeCheckbox(e, index, name, checked);
									}}
								/>
								<label htmlFor={`custom-checkbox-${nameWork}-${name}-${index}`}>
									{name}
								</label>
							</div>
						</div>
					</li>
				);
			})}
		</>
	);
};

export default Checkboxes;
