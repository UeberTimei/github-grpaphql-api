import Header from "./components/Header";
import "./styles/index.scss";
import Welcome from "./components/Welcome";
import Table from "./components/Table";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

function App(): React.ReactElement {
  // Извлекаем данные и статус из состояния Redux
  const { items, status } = useSelector(
    (state: RootState) => state.repositories
  );

  return (
    <>
      <Header />
      {status === "idle" ? <Welcome /> : <Table rows={items} />}
      <footer />
    </>
  );
}

export default App;
