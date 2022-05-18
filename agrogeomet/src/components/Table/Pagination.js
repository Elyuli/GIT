import React, { createContext } from "react";
import classnames from "classnames";

const PaginationContext = createContext();

const Pagination = ({
	children,
	currentPage,
	lastPage,
	onPageChange,
	totalCount,
}) => {
	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	const data = {};
	return (
		<>
			<PaginationContext.Provider value={data}>
				<div
					className={classnames("pagination-item", {
						disabled: currentPage === lastPage,
					})}
					onClick={onNext}
				>
					Atras
				</div>
				{children}
				<div
					className={classnames("pagination-item", {
						disabled: currentPage === 1,
					})}
					onClick={onPrevious}
				>
					Delante
				</div>
			</PaginationContext.Provider>
		</>
	);
};

export default Pagination;
