import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";

const Home = () => {
  return (
    <div className="py-2">
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Outlet />
      </CssVarsProvider>
    </div>
  );
};

export default Home;
