import { Box, Chip, Typography } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Star from "../assets/star_icon.svg?react";
import { Repository } from "../types/Repository";

// Интерфейс для свойств компонента RepositoryDetails
interface RepositoryDetailsProps {
  repo: Repository | null;
}

export default function RepositoryDetails({ repo }: RepositoryDetailsProps) {
  // Если репозиторий не указан, возвращаем null
  if (!repo) return null;

  return (
    <Box sx={{ p: 2, height: "100%", overflow: "auto" }}>
      <Typography variant="h5" gutterBottom>
        {repo.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        <Chip
          label={repo.language}
          color="primary"
          size="small"
          sx={{ display: repo.language ? "flex" : "none", mr: 1 }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Star />
          <Typography variant="body2" sx={{ ml: 1, mt: 0.5 }}>
            {repo.stargazers_count}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {repo.description}
      </Typography>
      <Typography variant="body2" color="#000000" gutterBottom>
        {repo.license?.name}
      </Typography>
    </Box>
  );
}
