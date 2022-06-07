const errorHandler = (request, response, error, next) => {
	console.error("error.name>>", error);
	if (err.name === "ERR_CONNECTION_REFUSED") {
		response.json({ status: "FAILED", error: error.message || error });
	}
};

export default errorHandler;
