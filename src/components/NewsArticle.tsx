import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { articleData } from "../interface/interface";
import { Box, Link } from "@mui/material";

export default function NewsArticle({ data }: { data: articleData }) {
	const { title, description, author, publishedAt, image, url, source } = data;
	const date = new Date(publishedAt);
	return (
		<Card
			sx={{
				margin: 3,
				width: "40%",
				marginLeft: "auto",
				marginRight: "auto",
			}}
		>
			<CardActionArea>
				<Link
					href={`/${title}`}
					target="_blank"
					sx={{ textDecoration: "none" }}
				>
					{image && (
						<CardMedia component="img" image={image} alt="No Picture" />
					)}
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
						<Typography variant="body2" sx={{ color: "text.secondary" }}>
							{description}
						</Typography>
						<Box sx={{ marginTop: 3, color: "text.secondary" }}>
							<Typography gutterBottom component="div" sx={{ fontSize: 12 }}>
								{author}
							</Typography>
							<Typography gutterBottom component="div" sx={{ fontSize: 12 }}>
								{date.toDateString()}
							</Typography>
						</Box>

						<Box sx={{ mt: 2, fontSize: "18px" }}>
							<Link href={`${url}`} target="_blank">
								Go To Source: {source}
							</Link>
						</Box>
					</CardContent>
				</Link>
			</CardActionArea>
		</Card>
	);
}
