import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")!).render(

    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
);