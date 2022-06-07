import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8080/geoserver/rest",
});

instance.defaults.headers.common[`Content-Type`] = `application/json`;
//instance.defaults.headers.common["Accept"] = `text/xml`;

export default instance;
