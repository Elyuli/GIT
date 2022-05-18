import { createContext, useEffect, useState } from "react";

const initialContext = "";

const BingMapContext = createContext(initialContext);
const initialName = "OSM";

const BingMapProvider = ({ children }) => {
	const [option, setOption] = useState("OSM");
	const [name, setName] = useState(initialName);
	const [url, setUrl] = useState("");
	const [modalRef, setModalRef] = useState(null);
	const [btnRef, setBtnRef] = useState(null);

	const handleBindOption = (e, ref) => {
		if (e) {
			console.log("e", e.target);
			console.log("ref", ref);
			setOption(e.target.getAttribute("id"));
			setName(e.target.textContent);
			setUrl(
				getComputedStyle(e.target).getPropertyValue("background-image")
			);
			const $father = e.target.parentNode;
			console.log("$father", $father);
			//console.log("url", url);
			//modalRef.classList.remove("modal-transform");
		}
	};

	const handleShowModal = (e, ref) => {
		if (e.target === btnRef) {
			modalRef.classList.add("modal-transform");
		} else modalRef.classList.remove("modal-transform");
	};

	const handlOnMouseLeave = () => {
		handleShowModal.cancel();
	};

	const data = {
		option,
		setOption,
		handleBindOption,
		handleShowModal,
		handlOnMouseLeave,
		setModalRef,
		setBtnRef,
		name,
		url,
	};
	return (
		<div>
			<BingMapContext.Provider value={data}>
				{children}
			</BingMapContext.Provider>
		</div>
	);
};

export { BingMapProvider };
export default BingMapContext;
