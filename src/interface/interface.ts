export interface articleData {
	title: string;
	description: string;
	image: string;
	author: string;
	publishedAt: string;
	url: string;
	source: string;
}

interface Source {
	id: string;
	name: string;
}

export interface Article {
	source: Source;
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	content: string | null;
}

export interface SearchContextType {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export interface GetDataType {
	fetchData: () => Promise<articleData[]>;
	setArticle: React.Dispatch<React.SetStateAction<articleData[]>>;
	setFilter: React.Dispatch<React.SetStateAction<articleData[]>>;
	testingData: boolean;
	loading: boolean;
	filter: articleData[];
	article: articleData[];
	filterData: () => void;
	handleNext: () => void;
	handlePrevios: () => void;
	page: React.MutableRefObject<number>;
}
