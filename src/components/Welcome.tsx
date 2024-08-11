import { Box, Typography } from "@mui/material";

export default function Welcome() {
  return (
    <Box sx={{ height: "calc(100vh - 110px)", flexGrow: 1 }}>
      <Typography
        sx={{ height: "calc(100vh - 200px)", flexGrow: 1 }}
        className="greeting"
        variant="h3"
        gutterBottom
      >
        Добро пожаловать
      </Typography>
    </Box>
  );
}
