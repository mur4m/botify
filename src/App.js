import React, { useState, useEffect } from "react";
import "./App.css";
// import { Line } from "react-chartjs-2";
import axios from "axios";
import Chart from "react-google-charts";

function App() {
  const [data, setData] = useState([]);
  console.log("data", data);
  const [url, setUrl] = useState(
    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=lsSTPCrtqVp6SXWmcH8f4D3ecKBoTXkpyRI37AIP"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [chartData, setChartData] = useState([]);
  console.log("chartDataaa", chartData);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const result = await axios(url);
        setData(result.data.near_earth_objects);
        console.log("$$$$$$$$$$$$", data);
        const newData = data.map((item) => {
          return [
            item.name,
            item.estimated_diameter.kilometers.estimated_diameter_min,
            item.estimated_diameter.kilometers.estimated_diameter_max,
          ];
        });
        newData.unshift(["legend vertical", "blue", "red"]);
        setChartData(newData);
        console.log("newData", newData);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log("render");

  return (
    <div className="App">
      {error && <div>Something went wrong ...</div>}
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div style={{ display: "flex" }}>
          <Chart
            width={800}
            height={1000}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              chartArea: { width: "30%" },
              hAxis: {
                title: "Min Estimated Diameter (km)",
                minValue: 0,
              },
              vAxis: {
                title: "NEO Name",
              },
            }}
            legendToggle
          />
        </div>
      )}
    </div>
  );
}

export default App;
