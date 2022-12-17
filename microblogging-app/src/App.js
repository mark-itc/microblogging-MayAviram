import "./App.css";
import CreateTweet from "./components/CreateTweet";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import Auth from "./components/Auth";
import { authContext } from "./context/AuthProvider";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";

function App() {
  const { userCredential } = useContext(authContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: userCredential ? (
        <>
          <CreateTweet />
          <Tweets />
        </>
      ) : (
        <Navigate replace to={"/Auth"} />
      ),
    },

    {
      path: "/Auth",
      element: (
        <>
          <Auth />
        </>
      ),
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
