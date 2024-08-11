import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./styles/index.scss";
import { store } from "./state/store.ts";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient.ts";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
