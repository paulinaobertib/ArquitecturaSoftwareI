import "./App.css";
import "./Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navigation } from "./Routes/navigate";
import { Login } from "./Login/Login";
import AuthContextProvider from "./Providers/AuthContextProvider";

function App() {
  return (
    <>
    </>
    // <>
    //   {user ? (
    //     <>
    //       <Home userId={user.id} />
    //       <h6>Hola {user.user_name}</h6>
    //     </>
    //   ) : (
    //     <Login user={user} setUser={setUser} />
    //   )}
    // </>
    /*<AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth">
            <Route path="/auth/login" element={<Login />} />
            {/* <Route path="/auth/register" element={<Register />} /> }
          </Route>
          {navigation.map(({ id, path, Element }) => (
            <Route
              key={id}
              path={path}
              element={
                <>
                  <Element />
                </>
              }
            />
          ))}
          { <Route path="/" element={<Navigate to="/auth/login" />} /> }
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>*/
  );
}

export default App;
