import { createContext, useContext, useRef, useState } from "react";
import { Article, articleData, GetDataType } from "../interface/interface";
import data from "../assets/data.json";
import { search } from "./search.context";
export const getData = createContext<GetDataType | undefined>(undefined);

export default function GetDataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [article, setArticle] = useState<articleData[]>([]);
	const [filter, setFilter] = useState<articleData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [testingData, setTestingData] = useState<boolean>(true);
	const page = useRef(1);
	const SearchInput = useContext(search);

	const query = SearchInput?.query;
	async function fetchData() {
		try {
			const response = await fetch(
				`https://newsapi.org/v2/top-headlines?page=${
					page.current
				}&pageSize=20&country=us&apiKey=${import.meta.env.VITE_NEWS_APIKEY}`
			);

			const articles = await response.json();
			setLoading(false);
			setTestingData(false);
			return articles.articles.map((article: Article) => {
				const {
					title,
					description,
					author,
					publishedAt,
					urlToImage,
					url,
					source,
				} = article;
				return {
					title,
					description,
					author,
					publishedAt,
					image: urlToImage,
					url,
					source: source.name,
				};
			});
		} catch (error) {
			setTestingData(true);
			console.log(error);
			setLoading(false);
			return data;
		}
	}
	const filterData = () => {
		const filtered =
			query !== "" || query !== undefined
				? article.filter((item) =>
						item.title.toLowerCase().includes((query ?? "").toLowerCase())
				  )
				: article;
		setFilter(filtered);
	};
	const handleNext = () => {
		page.current += 1;
		fetchData();
		filterData();
	};
	const handlePrevios = () => {
		page.current -= 1;
		fetchData();
		filterData();
	};
	return (
		<getData.Provider
			value={{
				fetchData,
				setArticle,
				setFilter,
				testingData,
				loading,
				filter,
				article,
				filterData,
				handleNext,
				handlePrevios,
				page,
			}}
		>
			{children}
		</getData.Provider>
	);
}
