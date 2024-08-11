import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Создает HTTP-ссылку для подключения к серверу GraphQL
const httpLink = createHttpLink({
  // URL-адрес сервера GraphQL
  uri: "https://api.github.com/graphql",
});

// Создает контекст для аутентификации запросов, добавляя заголовок авторизации с токеном
const authLink = setContext((_, { headers }) => {
  // Токен доступа для авторизации запросов
  const token = `${import.meta.env.VITE_GITHUB_TOKEN}`;
  return {
    headers: {
      // Заголовки запроса с добавленным заголовком авторизации
      ...headers,
      // Заголовок авторизации, если токен присутствует
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Создает клиент Apollo для работы с сервером GraphQL
export const client = new ApolloClient({
  // Ссылка на сервер GraphQL и контекст для аутентификации
  link: authLink.concat(httpLink),
  // Кэширование данных с помощью InMemoryCache
  cache: new InMemoryCache(),
});
