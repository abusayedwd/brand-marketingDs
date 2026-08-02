import React from "react";
import Card from "./Card";
import Barchart from "./Barchart";

const DashboardHome = () => {
  return (
    <div className="space-y-2">
      <Card />
      <Barchart />
    </div>
  );
};

export default DashboardHome;
