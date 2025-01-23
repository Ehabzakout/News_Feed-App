import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import { SetStateAction, useContext, useEffect } from "react";
import { search } from "../context/search.context";
import { getData } from "../context/getData.context";
import { Link } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function NavBar() {
	const SearchInput = useContext(search);
	const setQuery = SearchInput?.setQuery;
	const data = useContext(getData);
	const fetchData = data?.fetchData;
	const setArticle = data?.setArticle;
	const setFilter = data?.setFilter;
	const query = SearchInput?.query;
	const filterData = data?.filterData;
	const page = data?.page;
	const handleSearch = (e: {
		currentTarget: { value: SetStateAction<string> };
	}) => {
		if (setQuery) {
			setQuery(e.currentTarget.value);
		}
	};
	useEffect(() => {
		if (data) {
			if (fetchData && setArticle && setFilter) {
				fetchData().then((art) => {
					setArticle(art);
					setFilter(art);
				});
			}
		}
	}, [page?.current]);
	useEffect(() => {
		if (filterData) filterData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, page?.current]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ paddingX: 3 }}>
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						<Link href="/" sx={{ color: "white", textDecoration: "none" }}>
							{" "}
							News Feed APP
						</Link>
					</Typography>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
							onChange={handleSearch}
						/>
					</Search>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
