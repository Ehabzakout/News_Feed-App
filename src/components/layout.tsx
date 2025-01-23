import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
	return (
		<>
			<NavBar />
			<Container maxWidth="lg">
				<Outlet />
			</Container>
		</>
	);
}
