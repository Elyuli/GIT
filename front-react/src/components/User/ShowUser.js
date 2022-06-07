import React, { useContext, useEffect, useState } from "react";
import {
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	makeStyles,
	Table,
	TableBody,
	TableCell,
} from "@material-ui/core";
import axios from "../../axios";
import { IconButton } from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ApiContext from "../../context/ApiContext";

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

const ShowUser = ({ usersList, deleteData, setIsStart, setDataToEdit }) => {
	const classes = useStyles();

	return (
		<>
			{/* <h2>Lista de Usuarios</h2> */}
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead bgcolor="#083d6b">
						<TableRow>
							<TableCell align="center">
								<span style={{ color: "#fff" }}>Username</span>
							</TableCell>
							<TableCell align="center">
								<span style={{ color: "#fff" }}>Rol</span>
							</TableCell>
							<TableCell align="center">
								<span style={{ color: "#fff" }}>Password</span>
							</TableCell>
							<TableCell align="center">
								<span style={{ color: "#fff" }}>Opciones</span>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<>
							{console.log("usersList", usersList)}
							{usersList.length > 0 &&
								Object.keys(usersList).map((i) => {
									console.log("usersList[i]", Object.keys(usersList[i]));
									//const { username, role, password } = usersList[i];
									const propertie = Object.keys(usersList[i]);
									const { id, username, role, password } =
										usersList[i][propertie];
									const usuario = { id, username, role, password };
									return (
										<TableRow key={`${username}-${i}`}>
											{/* 	<TableCell component="th" scope="row">
										{user}
									</TableCell> */}
											<TableCell align="center">{username}</TableCell>
											<TableCell align="center">{role}</TableCell>
											<TableCell align="center" overflow="auto">
												*****
											</TableCell>
											<TableCell align="center">
												<IconButton
													aria-label="delete"
													className={classes.margin}
													onClick={() => deleteData(usuario.id, usuario)}
												>
													<Delete fontSize="small" />
												</IconButton>
												<IconButton
													aria-label="update"
													className={classes.margin}
													onClick={() => {
														setDataToEdit(usuario);
														//	setIsStart(true);
													}}
												>
													<EditIcon fontSize="small" />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
						</>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ShowUser;
