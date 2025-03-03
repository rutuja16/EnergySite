import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "./session";

function ProtectedRoute() {
  //const token = getSession("token");
  const isLoggedIn = getSession("isLoggedIn") ;
  return isLoggedIn === "true"?<Outlet/>:<Navigate to={"/Main" || "/dashboard"}/>;
}

export default ProtectedRoute;
