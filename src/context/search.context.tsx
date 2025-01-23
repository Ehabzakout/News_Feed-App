import { createContext, useState } from "react";
import { SearchContextType } from "../interface/interface";

// eslint-disable-next-line react-refresh/only-export-components
export const search = createContext<SearchContextType | undefined>(undefined);

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
	const [query, setQuery] = useState<string>("");
	return (
		<search.Provider value={{ query, setQuery }}>{children}</search.Provider>
	);
};

export default SearchProvider;
