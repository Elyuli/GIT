import React, { useEffect, useState } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
//import {  } from "@mui/material";
import axios from "axios";

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
	email: "",
	password: "",
	role: "",
};

const url = `http://localhost:5000/getAllUsers`;

const CreateUser = ({
	isStart,
	setIsStart,
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

	const handlChangeEmail = (e) => {
		setUsuario({ ...usuario, email: e.target.value });
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

		if (!usuario.email || !usuario.role || !usuario.password) {
			alert("Datos incompletos");
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
			{/* <h3>{dataToEdit ? "Editar" : "Agregar"}</h3> */}
			{isStart && (
				<form
					className={classes.root}
					noValidate
					autoComplete="off"
					onSubmit={handlSubmit}
				>
					<TextField
						id="outlined-basic"
						label="Email"
						type="email"
						variant="outlined"
						value={usuario.email}
						onChange={(e) => handlChangeEmail(e)}
					/>
					<TextField
						id="outlined-basic"
						label="Rol"
						variant="outlined"
						value={usuario.role}
						onChange={(e) => handlChangeRole(e)}
					/>
					<TextField
						id="outlined-basic"
						label="Contraseña"
						type="password"
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
				</form>
			)}
		</>
	);
};

export default CreateUser;
