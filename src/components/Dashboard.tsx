import Loader from "./Loader";
import { useState } from "react";
import useFetchData from "../services/useFetchData";

const Dashboard = () => {
  const [start, setStart] = useState("2020-12-10");
  const [end, setEnd] = useState("2020-12-20");
  const [dimensions, setDimensions] = useState("date,format");
  const [aggregates, setAggregates] = useState("views,revenue");

  const { error, isLoading, data, refetch } = useFetchData({
    start,
    end,
    dimensions,
    aggregates
  });

  console.log("data", data);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <form>
        <div>
          <input type="checkbox" id="iOS" name="iOS" checked />
          <label>iOS</label>
        </div>
        <div>
          <input type="checkbox" id="android" name="android" checked />
          <label>Android</label>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
