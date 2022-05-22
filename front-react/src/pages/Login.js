import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fallback from "../components/Fallback";
import axios from "axios";
import { Navigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const initialUser = {
	username: "",
	password: "",
};

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="#">
				Agrogeomet
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function SignIn() {
	const { logueado, setLogueado, setUser } = useContext(GlobalContext);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(null);
	const [usuario, setUsuario] = useState(initialUser);
	//const [logged, setLogged] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			username: usuario.username,
			password: usuario.password,
		};

		if (!data.username || !data.password) {
			setError("Datos incompletos");
			setOpen(true);
			return;
		}

		axios
			.post("http://localhost:5000/login", data)
			.then(() => {
				setUser(data);
				setOpen(false);
				setError(null);
				setLogueado(true);
			})
			.catch((err) => {
				console.log("err.message", err.message);
				console.log("error", err.response.data.data.error);
				if (err.response.data.data.error.length > 0) {
					console.log("CARAJO");
					let error = err.response.data.data.error;
					setError(error);
				} else {
					let error = err.message;
					setError(error);
				}
				setOpen(true);
				setLogueado(false);
			});
		handlClickReset();
	};

	const handlClickReset = () => {
		setUsuario(initialUser);
	};

	const handlChangePassword = (e) => {
		setUsuario({ ...usuario, password: e.target.value });
	};

	const handlChangeUsername = (e) => {
		setUsuario({ ...usuario, username: e.target.value });
	};

	return (
		<ThemeProvider theme={theme}>
			{logueado && <Navigate to="/agrogeomet" replace={true} />}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "#333" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Iniciar Sesión
					</Typography>
					{open && <Fallback open={open} setOpen={setOpen} error={error} />}
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							InputLabelProps={{ shrink: true }}
							/* inputProps={{
								pattern:
									"^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$",
							}} */
							value={usuario.username}
							onChange={(e) => handlChangeUsername(e)}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={usuario.password}
							onChange={(e) => handlChangePassword(e)}
						/>
						{/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Entrar
						</Button>
						{/* <Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid> */}
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
