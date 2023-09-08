import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import FormPage from "./pages/FormPage";
import ChatPage from "./pages/ChatPage";
import { ContextProvider } from "./context";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/signup" element={<FormPage></FormPage>} />
            <Route path="/login" element={<FormPage></FormPage>} />
            <Route
              path="/chatbox"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
