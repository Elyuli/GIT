import React from "react";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Fallback = ({ open, setOpen, error, setIsStart }) => {
	return (
		<>
			<Box sx={{ width: "100%", textAlign: "center" }}>
				<Collapse in={open} sx={{ textAlign: "center" }}>
					<Alert
						severity="error"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
									setIsStart(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 2, textAlign: "center" }}
					>
						{error}
					</Alert>
				</Collapse>
			</Box>
		</>
	);
};

export default Fallback;
