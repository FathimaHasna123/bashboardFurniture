import React from "react";
import Chart from "react-apexcharts";


const Dashboard = () => {

  const categories = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]

 
  const barOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories },
    colors: ["#1E90FF"],
  }
  const barSeries = [
    { name: "Sales", data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 100, 120, 140] },
  ]

  const lineOptions = {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: { categories },
    colors: ["#FF6347"],
  }
  const lineSeries = [
    { name: "Revenue", data: [20, 35, 40, 55, 65, 80, 85, 95, 105, 110, 120, 130] },
  ]

 
  const pieOptions = {
    labels: ["Product A", "Product B", "Product C"],
    colors: ["#00E396", "#FEB019", "#FF4560"],
  }
  const pieSeries = [44, 33, 23]

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard Sheet</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Monthly Sales</h2>
          <Chart options={barOptions} series={barSeries} type="bar" height={300} />
        </div>

      
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Monthly Revenue</h2>
          <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
        </div>

       
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Product Share</h2>
          <Chart options={pieOptions} series={pieSeries} type="pie" height={300} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard
