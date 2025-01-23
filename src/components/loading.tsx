import { Box } from "@mui/material";

export default function Loading() {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<div className="loader"></div>
			</Box>
		</>
	);
}
