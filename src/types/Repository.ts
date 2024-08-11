export interface Repository {
  id: string; // Уникальный идентификатор репозитория
  name: string; // Название репозитория
  // Язык программирования, используемый в репозитории. Может быть null, если язык не указан
  language: string | null;
  forks_count: number; // Число форков репозитория
  stargazers_count: number; // Число звезд репозитория
  updated_at: string; // Дата обновления репозитория
  description: string | null; // Описание репозитория. Может быть null, если описание не указано
  license: { name: string } | null; // Лицензия, используемая в репозитории. Может быть null, если лицензия не указана
}

// Интерфейс, представляющий информацию о репозитории в виде узла графа
export interface RepositoryNode {
  id: string; // Уникальный идентификатор репозитория
  name: string; // Название репозитория
  // Язык программирования, используемый в репозитории. Может быть null, если язык не указан
  primaryLanguage: {
    name: string; // Название языка программирования
  } | null;
  forkCount: number; // Число форков репозитория
  stargazerCount: number; // Число звезд репозитория
  updatedAt: string; // Дата обновления репозитория
  description: string | null; // Описание репозитория. Может быть null, если описание не указано
  // Лицензия, используемая в репозитории. Может быть null, если лицензия не указана
  licenseInfo: {
    name: string; // Название лицензии
  } | null;
}

// Тип, представляющий строку данных репозитория
export type RepositoryRow = RepositoryNode;

// Интерфейс, представляющий граф репозиториев
export interface SearchEdge {
  node: RepositoryNode; // Узел графа
}

// Интерфейс, представляющий страницу репозиториев
export interface PageInfo {
  hasNextPage: boolean; // Есть ли следующая страница
  endCursor: string | null; // Уникальный идентификатор следующей страницы
}

// Интерфейс, представляющий ответ при поиске репозиториев
export interface SearchResponse {
  // Информация о репозиториях
  search: {
    pageInfo: PageInfo; // Страница репозитория
    edges: SearchEdge[]; // Репозитории
  };
}
