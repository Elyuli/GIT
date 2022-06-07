import React, { useContext, useEffect, useState } from "react";
import {
	Container,
	AppBar,
	Typography,
	Grow,
	Grid,
	Button,
} from "@mui/material";
import ShowUser from "../components/User/ShowUser";
import CreateUser from "../components/User/CreateUser";
import useStyles from "../styles";
import axios from "axios";
import ApiContext, { ApiProvider } from "../context/ApiContext";
import AddUserButton from "../components/User/AddUserButton";
import Loader from "../components/Loader/Loader";
import { Message } from "@mui/icons-material";
import Fallback from "../components/Fallback";
import GlobalContext from "../context/GlobalContext";
import { Navigate } from "react-router-dom";
//import { makeStyles } from "@mui/material";

const initialUser = {
	email: "",
	password: "",
	role: "",
};

const url = `http://localhost:5000/getAllUsers`;

const Usuarios = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isStart, setIsStart] = useState(false);
	const [usersList, setUsersList] = useState([]);
	const [data, setData] = useState([]);
	const [dataToEdit, setDataToEdit] = useState(null);
	const [open, setOpen] = useState(false);
	const { isActiveCrud, setIsActiveCrud, logueado } = useContext(GlobalContext);

	useEffect(() => {
		if (data.length === 0) return;
		const arrayUser = [];
		console.log("data", data);
		Object.keys(data).map((i) => {
			const username = data[i]["username"];
			console.log("data-username", username);

			arrayUser.push({ [username]: data[i] });
		});
		setUsersList([...arrayUser]);

		console.log("usersList", usersList);
	}, [data]);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((usuarios) => {
				console.log("usuarios", usuarios.data.data);
				setData([...usuarios.data.data]);
				setError(null);
				setOpen(false);
			})
			.catch((err) => {
				//console.log("err.message", err.message);
				//console.log("error", err.response.data.data.error);
				if (err.response.data.data.error.length > 0) {
					//console.log("CARAJO");
					let error = err.response.data.data.error;
					setError(error);
				} else {
					let error = err.message;
					setError(error);
				}
				setUsersList(initialUser);
				setOpen(true);
			});
		setLoading(false);
	}, [url]);

	/* useEffect(() => {
		setUsersList(usersList);
		console.log("usersList", usersList);
	}, [usersList]); */

	const createData = (user) => {
		axios
			.post(`http://localhost:5000/createUser`, user)
			.then(() => {
				//window.location.reload(false);
				const { username } = user;
				user.id = Date.now();
				const array = [];
				array.push({ [username]: user });
				setUsersList([...usersList, ...array]);
				setOpen(false);
				//console.log("HERE>>>");
				setError(null);
			})
			.catch((err) => {
				console.log("err.message", err.message);
				console.log("error", err.response.data.data.error);
				if (err.response.data.data.error.length > 0) {
					//console.log("CARAJO");
					let error = err.response.data.data.error;
					setError(error);
				} else {
					let error = err.message;
					setError(error);
				}
				setOpen(true);
			});
	};

	const updateData = (uid, user) => {
		const arrayUser = usersList;
		const { username } = user;
		Object.keys(arrayUser).map((i) => {
			const propertie = Object.keys(arrayUser[i]);
			//console.log("propertie>>>", propertie);
			if (propertie[0] === username) {
				arrayUser[i][propertie] = user;
			}
		});
		//console.log("user>>>", user);
		//console.log("arrayUser>>>", arrayUser);

		axios
			.put(`http://localhost:5000/updateUser/${uid}`, user)
			.then(() => {
				//window.location.reload(false);
				//let newArray = [];
				//arrayUser[uid] = data;
				setUsersList([...arrayUser]);
				//setError(null);
				//setOpen(false);
			})
			.catch((err) => {
				console.log("err.message", err.message);
				//console.log("error", err.response.data.data.error);
				if (err.response.data.data.error.length > 0) {
					//console.log("CARAJO");
					let error = err.response.data.data.error;
					setError(error);
				} else {
					let error = err.message;
					setError(error);
				}
				setOpen(true);
			});
	};

	const deleteData = (id, user) => {
		const { username } = user;
		const array = usersList.filter((obj) => Object.keys(obj)[0] !== username);
		axios
			.delete(`http://localhost:5000/deleteUser/${username}`)
			.then(() => {
				//window.location.reload(false);
				setUsersList([...array]);
				setError(null);
				setOpen(false);
			})
			.catch((err) => {
				console.log("err.message", err.message);
				//console.log("error", err.response.data.data.error);
				if (err.response.data.data.error.length > 0) {
					//console.log("CARAJO");
					let error = err.response.data.data.error;
					setError(error);
				} else {
					let error = err.message;
					setError(error);
				}
				setOpen(true);
			});
	};

	return (
		<>
			{!logueado && <Navigate to="/" replace={true} />}
			{!isActiveCrud && <Navigate to="/visor" replace={true} />}

			<Container maxWidth="lg">
				<AppBar className={classes.appBar} position="static" color="inherit">
					<Typography className={classes.heading} variant="h2" align="center">
						Bienvenido Administrador
					</Typography>
				</AppBar>
				{loading && <Loader />}

				{open && <Fallback open={open} setOpen={setOpen} error={error} />}
				<Container>
					<Button
						//fullWidth
						variant="contained"
						sx={{ width: 100 }}
						label="Volver"
						onClick={() => {
							setIsActiveCrud(false);
						}}
					>
						Volver
					</Button>
				</Container>
				<Grow in>
					<Container>
						<Grid
							/* className={classes.container}  */ container
							justifyContent="space-between"
							alignItems="stretch"
						>
							{/* <Grid item xs={12} sm={4} position="absolute" left={32} top={88}>
								{isStart === false && (
									<AddUserButton isStart={isStart} setIsStart={setIsStart} />
								)}
							</Grid> */}

							<Grid item xs={12} sm={7}>
								<AppBar
									className={classes.appBar}
									position="static"
									color="inherit"
								>
									<ShowUser
										usersList={usersList}
										deleteData={deleteData}
										setIsStart={setIsStart}
										setDataToEdit={setDataToEdit}
									/>
								</AppBar>
							</Grid>
							<Grid item xs={12} sm={4}>
								<AppBar
									className={classes.appBar}
									position="static"
									color="inherit"
								>
									{
										//isStart &&
										<CreateUser
											createData={createData}
											updateData={updateData}
											dataToEdit={dataToEdit}
											setDataToEdit={setDataToEdit}
											setOpen={setOpen}
											setError={setError}
										/>
									}
								</AppBar>
							</Grid>
						</Grid>
					</Container>
				</Grow>
			</Container>
			{/* </ApiProvider> */}
		</>
	);
};

export default Usuarios;
