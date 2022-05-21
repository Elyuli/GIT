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
import axios from "axios";
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
								<span style={{ color: "#fff" }}>Email</span>
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
						{usersList.length > 0 &&
							usersList.map((usuario, i) => {
								const { email, role, password } = usersList[i];
								return (
									<TableRow key={`${email}-${i}`}>
										{/* 	<TableCell component="th" scope="row">
										{user}
									</TableCell> */}
										<TableCell align="center">{email}</TableCell>
										<TableCell align="center">{role}</TableCell>
										<TableCell align="center" overflow="auto">
											*****
										</TableCell>
										<TableCell align="center">
											<IconButton
												aria-label="delete"
												className={classes.margin}
												onClick={() => deleteData(usuario.id)}
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
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ShowUser;
