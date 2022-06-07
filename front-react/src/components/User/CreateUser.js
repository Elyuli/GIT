import React, { useEffect, useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
//import {  } from "@mui/material";
import axios from "axios";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import "./User.css";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
			display: "flex",
			flexDirection: "column",
		},
	},
}));

const initialUser = {
	username: "",
	password: "",
	role: "",
};

const url = `http://localhost:5000/getAllUsers`;

const CreateUser = ({
	setOpen,
	setError,
	createData,
	updateData,
	dataToEdit,
	setDataToEdit,
}) => {
	const classes = useStyles();
	const [usuario, setUsuario] = useState(initialUser);

	useEffect(() => {
		if (dataToEdit) {
			console.log("dataToEdit", dataToEdit);
			setUsuario({ ...dataToEdit, password: "" });
		} else {
			setUsuario(initialUser);
		}
	}, [dataToEdit]);

	const handlChangeUsername = (e) => {
		setUsuario({ ...usuario, username: e.target.value });
	};

	const handlChangeRole = (e) => {
		setUsuario({ ...usuario, role: e.target.value });
	};

	const handlChangePassword = (e) => {
		setUsuario({ ...usuario, password: e.target.value });
	};

	const handlSubmit = (e) => {
		e.preventDefault();

		console.log("usuario>>>", usuario.id);

		if (!usuario.username || !usuario.role || !usuario.password) {
			setError("Datos incompletos");
			setOpen(true);
			return;
		}

		if (usuario.id === undefined) {
			createData(usuario);
		} else {
			updateData(usuario.id, usuario);
		}
		handlClickReset();
		//	setIsStart(true);
	};

	const handlClickReset = () => {
		setUsuario(initialUser);
		setDataToEdit(null);
	};

	return (
		<>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onSubmit={handlSubmit}
			>
				<FormControl
					variant="filled"
					sx={{
						justifyContent: "space-between",
						height: 300,
						minWidth: 250,
						paddingTop: 1.9,
						paddingBottom: 1.9,
					}}
				>
					<TextField
						//margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						variant="outlined"
						InputLabelProps={{ shrink: true }}
						inputProps={{
							pattern: "^[A-Za-zÑñÁáÉéÍíÓóÚúÜüs]+$",
						}}
						value={usuario.username}
						onChange={(e) => handlChangeUsername(e)}
						autoFocus
					/>
					<FormControl variant="outlined">
						<InputLabel id="demo-simple-select-label">Rol</InputLabel>
						<Select
							id="outlined-basic"
							label="Rol"
							//margin="normal"
							required
							//variant="outlined"
							value={usuario.role}
							onChange={(e) => handlChangeRole(e)}
						>
							<MenuItem value="admin">Admin</MenuItem>
							<MenuItem value="user">User</MenuItem>
							<MenuItem value="disabled">Disabled</MenuItem>
						</Select>
					</FormControl>
					<TextField
						//margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						variant="outlined"
						value={usuario.password}
						onChange={(e) => handlChangePassword(e)}
					/>

					<Button
						variant="contained"
						//color="primary"
						style={{ backgroundColor: "#083d6b" }}
						type="submit"
						//	onClick={() => setIsStart(false)}
					>
						{dataToEdit ? (
							<span style={{ color: "#fff" }}>Actualizar</span>
						) : (
							<span style={{ color: "#fff" }}>Crear</span>
						)}
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => handlClickReset()}
					>
						Limpiar
					</Button>
				</FormControl>
			</form>
		</>
	);
};

export default CreateUser;
