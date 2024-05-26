import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import GlobalStyle from "./components/GlobalStyle.jsx";
import { AccountBookProvider } from "./context/AccountBookContext.jsx";

function App() {
  return (
    <AccountBookProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </AccountBookProvider>
  );
}

export default App;
