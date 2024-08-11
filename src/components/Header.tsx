import React, { useState } from "react";
import "../styles/Header.scss";
import { Button, TextField } from "@mui/material";
import { fetchRepositories } from "../state/repositoriesSlice";
import { useAppDispatch } from "../state/store";

// Компонент заголовка для поиска репозиториев
export default function Header(): React.ReactElement {
  // Состояние для хранения текста поискового запроса
  const [query, setQuery] = useState("");
  // Диспетчер действий для отправки запросов в Redux
  const dispatch = useAppDispatch();

  // Обработчик события, который отправляет запрос на получение репозиториев, если поисковый запрос не пуст
  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchRepositories({ query }));
    }
  };

  // Тот же самый обработчик события, но для нажатия клавиши Enter
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header>
      <div className="wrapper">
        <TextField
          placeholder="Введите поисковый запрос"
          className="header__input"
          size="small"
          fullWidth
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <Button variant="contained" onClick={handleSearch}>
          Искать
        </Button>
      </div>
    </header>
  );
}
