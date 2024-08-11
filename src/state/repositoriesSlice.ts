import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Repository, SearchEdge } from "../types/Repository";
import { client } from "../apolloClient";
import { gql } from "@apollo/client";

// Интерфейс состояния репозиториев в Redux
interface RepositoriesState {
  items: Repository[]; // Список репозиториев
  status: "idle" | "loading" | "succeeded" | "failed"; // Статус загрузки данных
  error: string | null; // Сообщение об ошибке
  hasNextPage: boolean; // Флаг, указывающий, есть ли следующая страница данных
  endCursor: string | null; // Курсор для получения следующей страницы данных
}

// Начальное состояние с данными по умолчанию
const initialState: RepositoriesState = {
  items: [],
  status: "idle",
  error: null,
  hasNextPage: false,
  endCursor: null,
};

// Запрос на поиск репозиториев
const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 100, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            primaryLanguage {
              name
            }
            forkCount
            stargazerCount
            updatedAt
            description
            licenseInfo {
              name
            }
          }
        }
      }
    }
  }
`;

// Асинхронный thunk для загрузки репозиториев из GraphQL API
export const fetchRepositories = createAsyncThunk(
  "repositories/fetchRepositories",
  async (
    { query, after }: { query: string; after?: string | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await client.query({
        query: SEARCH_REPOSITORIES,
        variables: { query, after },
      });

      // Преобразуем данные ответа в формат репозиториев
      const repositories: Repository[] = response.data.search.edges.map(
        (edge: SearchEdge) => ({
          id: edge.node.id,
          name: edge.node.name,
          language: edge.node.primaryLanguage?.name || null,
          forks_count: edge.node.forkCount,
          stargazers_count: edge.node.stargazerCount,
          updated_at: edge.node.updatedAt,
          description: edge.node.description,
          license: edge.node.licenseInfo
            ? { name: edge.node.licenseInfo.name }
            : null,
        })
      );

      return {
        repositories,
        pageInfo: response.data.search.pageInfo,
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch repositories: " + err);
    }
  }
);

// Слайс для управления состоянием репозиториев
const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        // При начале загрузки данных обновляем статус и очищаем ошибки
        state.status = "loading";
        state.items = [];
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        // При успешной загрузке данных обновляем состояние с новыми репозиториями
        state.status = "succeeded";
        state.items = state.items.concat(action.payload.repositories);
        state.hasNextPage = action.payload.pageInfo.hasNextPage;
        state.endCursor = action.payload.pageInfo.endCursor;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        // При ошибке загрузки обновляем статус и устанавливаем сообщение об ошибке
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default repositoriesSlice.reducer;
