import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherComponent from '../Components/Weather';
import LoginComponent from '../Components/Login';
import RegisterComponent from '../Components/Register';
// import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageNotFound from "../Components/PageNotFound";
function RootRouter() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/weather" element={<WeatherComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/" element={<LoginComponent />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default RootRouter;
