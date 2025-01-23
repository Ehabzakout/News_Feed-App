import { useContext, useEffect, useState } from "react";
import { getData } from "../context/getData.context";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { articleData } from "../interface/interface";
import Loading from "../components/loading";
import { Helmet } from "react-helmet";

const Article = () => {
	const params = useParams();
	const allArticles = useContext(getData);
	const articles = allArticles?.filter;
	const [data, setData] = useState<articleData | null>(null);

	function set() {
		if (articles) {
			const articleData = articles?.filter((el) => el.title === params.article);
			setData(articleData[0]);
		}
	}
	useEffect(() => {
		if (articles) console.log(articles);
		set();
	}, [articles]);
	const title = data?.title.split(" ").slice(0, 5).join(" ") || "";

	return (
		<>
			{data !== null ? (
				<>
					<Helmet>
						<title>{title} ...</title>
					</Helmet>
					<Grid
						container
						sx={{
							padding: 5,
							marginTop: 3,
						}}
						gap={3}
					>
						<Grid item xs={8}>
							<Box
								sx={{ fontSize: "16px", color: "#1692ff", fontWeight: "600" }}
							>
								{data?.title}
							</Box>
						</Grid>
						<Grid item xs={6}>
							<img src={data?.image} />
						</Grid>
						<Grid item xs={5}>
							<Box>{data?.description}</Box>
						</Grid>
						<Grid item xs={8} sx={{ fontSize: "12px", color: "gray" }}>
							<Box>{data?.author}</Box>
							{data?.publishedAt && (
								<Box>{new Date(data?.publishedAt).toDateString()}</Box>
							)}
						</Grid>
					</Grid>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};
export default Article;
