import React, { useContext, useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import ShowUser from "../components/User/ShowUser";
import CreateUser from "../components/User/CreateUser";
import useStyles from "../styles";
import axios from "axios";
import ApiContext, { ApiProvider } from "../context/ApiContext";
import AddUserButton from "../components/User/AddUserButton";
import Loader from "../components/Loader/Loader";
import { Message } from "@mui/icons-material";
import Fallback from "../components/Fallback";
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
	const [dataToEdit, setDataToEdit] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((usuarios) => {
				console.log("usuarios", usuarios.data.data);
				setUsersList([...usuarios.data.data]);
				setError(null);
				setOpen(false);
			})
			.catch((err) => {
				console.log("error>>>", err.response);
				setUsersList(initialUser);
				setOpen(true);
				setError(err.response.data.error);
			});
		setLoading(false);
	}, [url]);

	/* 	useEffect(() => {
		setOpen(error);
	}, [error]); */

	const createData = (data) => {
		axios
			.post(`http://localhost:5000/createUser`, data)
			.then(() => {
				window.location.reload(false);
				setOpen(false);
				setError(null);
			})
			.catch((err) => {
				console.log("error", err);
				setError(err.response.data.error);
				setOpen(true);
			});
	};

	const updateData = (id, data) => {
		axios
			.put(`http://localhost:5000/updateUser/${id}`, data)
			.then(() => {
				window.location.reload(false);
				setError(null);
				setOpen(false);
			})
			.catch((err) => {
				console.log("error", err.message);
				setError(err.response.data.error);
				setOpen(true);
			});
		//setIsStart(false);
	};

	const deleteData = (id) => {
		axios
			.delete(`http://localhost:5000/deleteUser/${id}`)
			.then(() => {
				window.location.reload(false);
				setError(null);
				setOpen(false);
			})
			.catch((err) => {
				console.log("error", err.message);
				setError(err.response.data.error);
				setOpen(true);
			});
	};

	return (
		<>
			{/* <ApiProvider> */}

			<Container maxWidth="lg">
				<AppBar className={classes.appBar} position="static" color="inherit">
					<Typography className={classes.heading} variant="h2" align="center">
						Bienvenido Administrador
					</Typography>
				</AppBar>
				{loading && <Loader />}
				{open && (
					<Fallback
						error={error}
						open={open}
						setOpen={setOpen}
						setIsStart={setIsStart}
					/>
				)}
				<Grow in>
					<Container>
						<Grid className={classes.container} container>
							<Grid item xs={12} sm={4} position="absolute" left={32} top={88}>
								{isStart === false && (
									<AddUserButton isStart={isStart} setIsStart={setIsStart} />
								)}
							</Grid>
							<Grid item xs={12} sm={4}>
								<AppBar
									className={classes.appBar}
									position="static"
									color="inherit"
								>
									{isStart && (
										<CreateUser
											isStart={isStart}
											setIsStart={setIsStart}
											createData={createData}
											updateData={updateData}
											dataToEdit={dataToEdit}
											setDataToEdit={setDataToEdit}
										/>
									)}
								</AppBar>
							</Grid>
							<Grid item xs={12}>
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
						</Grid>
					</Container>
				</Grow>
			</Container>
			{/* </ApiProvider> */}
		</>
	);
};

export default Usuarios;
