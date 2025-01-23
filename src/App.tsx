import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import Article from "./pages/article";
import SearchProvider from "./context/search.context";
import GetDataProvider from "./context/getData.context";
const routs = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/:article",
				element: <Article />,
			},
		],
	},
]);
function App() {
	return (
		<>
			<SearchProvider>
				<GetDataProvider>
					<RouterProvider router={routs}></RouterProvider>
				</GetDataProvider>
			</SearchProvider>
		</>
	);
}

export default App;
