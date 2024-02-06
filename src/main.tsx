import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./contexts";
import { PrimeReactProvider } from 'primereact/api';

import App from "./App.tsx";

import "./index.css";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <PrimeReactProvider>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          {/*<ThemeContextProvider>*/}
            <App />
          {/*</ThemeContextProvider>*/}
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
        </PrimeReactProvider>
  </React.StrictMode>
);
