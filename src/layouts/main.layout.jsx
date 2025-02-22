import Navigation from "../components/Navigation";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default MainLayout;