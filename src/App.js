import "./styles/button.style.scss";
import "./styles/img.style.scss";
import "./styles/table.style.scss";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import store from "./redux/store";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Suspense fallback="loading">
          <Header />
          <AppRouter />
          <Footer />
        </Suspense>
      </Provider>
    </HashRouter>
  );
}

export default App;
