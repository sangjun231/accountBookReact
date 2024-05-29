import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import GlobalStyle from "./components/GlobalStyle.jsx";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
// import { AccountBookProvider } from "./context/AccountBookContext.jsx";

function App() {
  return (
    // <AccountBookProvider>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    // </AccountBookProvider>
  );
}

export default App;
