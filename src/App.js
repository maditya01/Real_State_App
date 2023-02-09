import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPass from "./pages/ForgotPass";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/forgot-password" element={<ForgotPass />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
