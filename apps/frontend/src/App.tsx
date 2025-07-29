import { BrowserRouter, Outlet, Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import GameCanvas from "./game/scenes/GameCanvas"
import SignupPage from "./pages/Signup"
import SigninPage from "./pages/Signin"
import MySpaces from "./pages/MySpaces"
import JoinSpace from "./pages/JoinSpace"
import PrivateRoute from "./pages/PrivateRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/spaces" element={<MySpaces />} />
            <Route path="/join" element={<JoinSpace />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/space/:id" element={<PrivateRoute><GameCanvas /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);