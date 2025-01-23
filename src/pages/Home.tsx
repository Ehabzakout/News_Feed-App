import NewsArticle from "../components/NewsArticle";
import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import Helmet from "react-helmet";
import Loading from "../components/loading";
import { getData } from "../context/getData.context";

export default function Home() {
	const data = useContext(getData);
	const loading = data?.loading;
	const testingData = data?.testingData;
	const filter = data?.filter;
	const handleNext = data?.handleNext;
	const handlePrevios = data?.handlePrevios;
	const page = data?.page.current || 1;
	if (loading === true) return <Loading />;
	console.log(testingData);
	return (
		<>
			<Helmet>
				<title>News Feed App</title>
			</Helmet>
			{testingData && (
				<Typography
					sx={{ padding: 3, textAlign: "center" }}
					variant="h6"
					color="error"
				>
					Something went wrong you are Using testing data now
				</Typography>
			)}
			<Stack
				direction={{ xs: "column", sm: "row" }}
				sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
			>
				{filter && filter.length > 0 ? (
					filter?.map((item) => (
						<NewsArticle key={JSON.stringify(item)} data={item} />
					))
				) : (
					<Typography sx={{ padding: 3, margin: 3, mx: "auto" }}>
						There is Now article
					</Typography>
				)}
			</Stack>
			{filter && filter.length > 0 ? (
				<Stack
					direction={{ xs: "column", sm: "row" }}
					sx={{ justifyContent: "space-between", mx: 7, pb: 4 }}
				>
					<Button onClick={handlePrevios} disabled={page <= 1}>
						Previos
					</Button>
					<Button onClick={handleNext} disabled={filter.length < 15}>
						Next
					</Button>
				</Stack>
			) : (
				""
			)}
		</>
	);
}
