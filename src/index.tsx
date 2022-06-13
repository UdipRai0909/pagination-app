import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { CustomTheme } from "./themes/CustomTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateUser } from "./components/CreateUser";
import { UpdateUser } from "./components/UpdateUser";
import { ViewUser } from "./components/ViewUser";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={CustomTheme}>
    <React.StrictMode>
      <BrowserRouter>
        <ColorModeScript />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="view/:id" element={<ViewUser />} />
          <Route path="edit/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
