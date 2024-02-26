import { Grid, List } from "lucide-react";
import React from "react";

const ViewSelector = ({ active, setActive }) => {
  return (
    <div className="flex items-center justify-center *:py-1 *:px-2 bg-primary-foreground text-primary rounded cursor-pointer *:h-[34px]">
      <div
        className={`${
          active === "grid"
            ? "bg-primary text-primary-foreground"
            : "border border-primary"
        } rounded-l`}
        onClick={() => setActive("grid")}
      >
        <Grid />
      </div>
      <div
        className={`${
          active === "list"
            ? "bg-primary text-primary-foreground border border-primary"
            : "border border-primary"
        } rounded-r`}
        onClick={() => setActive("list")}
      >
        <List />
      </div>
    </div>
  );
};

export default ViewSelector;
