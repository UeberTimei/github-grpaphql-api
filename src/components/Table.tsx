import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import RepositoryDetails from "./RepositoryDetails";
import { Repository, RepositoryRow } from "../types/Repository";
import "../styles/Table.scss";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

// Стандартные колонки для таблицы репозиториев
const default_columns: GridColDef[] = [
  { field: "name", headerName: "Название", width: 200, sortable: false },
  { field: "language", headerName: "Язык", width: 200, sortable: false },
  {
    field: "forks_count",
    headerName: "Число форков",
    type: "number",
    width: 200,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "stargazers_count",
    headerName: "Число звёзд",
    type: "number",
    width: 160,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "updated_at",
    headerName: "Дата обновления",
    width: 130,
    type: "date",

    valueFormatter: (params: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      return new Date(params).toLocaleDateString("ru-RU", options);
    },
  },
];

// Интерфейс для свойств компонента Table
interface TableProps {
  rows: RepositoryRow[]; // Список строк для отображения в таблице
  columns?: GridColDef[]; // Колонки таблицы, можно переопределить стандартные
}

export default function Table({ rows, columns = default_columns }: TableProps) {
  // Состояние для хранения выбранного репозитория
  const [selectedRepo, setSelectedRepo] = useState<Repository>();

  // Статус загрузки данных из Redux
  const status = useSelector((state: RootState) => state.repositories.status);

  // Обработчик клика, который устанавливает выбранный репозиторий в состояние
  const handleRowClick = (params: GridRowParams<Repository>) => {
    setSelectedRepo(params.row);
  };

  return (
    <div className="wrapper__table">
      {status === "loading" ? (
        <div className="loading">
          <CircularProgress size={100} />
        </div>
      ) : (
        <>
          <Box sx={{ height: "calc(100vh - 200px)", flexGrow: 1 }}>
            <Typography variant="h3" sx={{ mb: 2, mt: 2 }}>
              Результаты поиска
            </Typography>
            <DataGrid
              sx={{ flexGrow: 1, border: "none" }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              onRowClick={handleRowClick}
            />
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "480px",
              height: "calc(100vh - 110px)",
              backgroundColor: "#f2f2f2",
            }}
          >
            {selectedRepo ? (
              <RepositoryDetails repo={selectedRepo} />
            ) : (
              <Typography className="greeting" variant="h6">
                Выберите репозиторий
              </Typography>
            )}
          </Box>
        </>
      )}
    </div>
  );
}
