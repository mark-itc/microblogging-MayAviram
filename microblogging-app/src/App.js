import "./App.css";
import CreateTweet from "./components/CreateTweet";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import User from "./components/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <CreateTweet />
          <Tweets />
        </>
      ),
    },
    {
      path: "/Profile",
      element: <User />,
    },
  ]);
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
