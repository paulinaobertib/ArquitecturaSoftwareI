import "./App.css";
import { navigation } from "./Routes/navigate";
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        {
          navigation.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={
              <>
                <Navbar />
                <Element />
                <Footer />
              </>
            } />
          ))
        }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
