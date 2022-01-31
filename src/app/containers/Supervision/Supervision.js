import React from "react";
import { useSelector } from "react-redux";
import SupervisionTable from "./SupervisionTable";

const Supervision = () => {
  const userData = useSelector((state) => state.auth);
  return <SupervisionTable nitPuesto={userData.user.instanciaNit} />;
};

export default Supervision;
