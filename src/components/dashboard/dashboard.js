import React, { useEffect, useState } from "react";
import { ResponsiveBoxPlot } from "@nivo/boxplot";
import { analytics } from "../../firebase"; // Import du fichier firebase.js
import { logEvent } from "firebase/analytics";  // Import logEvent
import './dashboard.css';

const Dashboard = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const fetchedData1 = {
      labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      values: [1000, 1200, 935, 990, 1050, 1030, 1040],
    };
    setData1(fetchedData1);

    const fetchedData2 = [
      { value: 80, color: "rgba(236,72,127,1)" },
      { value: 20, color: "#3c4449" },
    ];
    setData2(fetchedData2);

    // Log an event when the data is fetched
    logEvent(analytics, 'data_fetched', {
      label: 'Sales Data Loaded',
      value: fetchedData1.values.reduce((acc, val) => acc + val, 0),
    });

    // Log page view event when the dashboard is loaded
    logEvent(analytics, 'page_view', {
      page: 'Dashboard',
      title: 'Dashboard Loaded'
    });

  }, []);

  if (!data1 || !data2) {
    return <p>Chargement des graphiques...</p>;
  }

  // BoxPlot data
  const boxPlotData = [
    {
      id: "group A",
      data: [
        { x: "A", y: [0, 1, 2, 3, 4] },
        { x: "B", y: [2, 3, 4, 5, 6] },
        { x: "C", y: [1, 2, 3, 4, 5] },
      ],
    },
  ];

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
      </header>
      <br></br>
      <br></br>
      <br></br>

      {/* Graphique Linéaire */}
      <section className="line-chart">
        <h2>Graphique Linéaire</h2>
        <div className="chart-container">
          {data1.values.map((value, index) => (
            <div
              key={index}
              className="bar"
              style={{ height: `${value / 10}px` }}
              onClick={() => {
                // Log an event when a bar is clicked
                logEvent(analytics, 'bar_click', { label: data1.labels[index], value });
              }}
            >
              <span>{data1.labels[index]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Graphique Circulaire */}
      <section className="doughnut-chart">
        <h2>Graphique Circulaire</h2>
        <div className="circle" style={{ backgroundColor: data2[0].color }}>
          <div
            className="circle-inner"
            style={{ backgroundColor: data2[1].color }}
            onClick={() => {
              // Log an event when the circular chart is clicked
              logEvent(analytics, 'circle_click', { value: data2[0].value });
            }}
          ></div>
        </div>
      </section>

      {/* Graphique BoxPlot */}
      <section className="boxplot-chart">
        <h2>Graphique BoxPlot</h2>
        <div style={{ height: 400 }}>
          <ResponsiveBoxPlot
            data={boxPlotData}
            margin={{ top: 60, right: 140, bottom: 60, left: 60 }}
            minValue={0}
            maxValue={10}
            subGroupBy="subgroup"
            padding={0.12}
            enableGridX={true}
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
            }}
            axisRight={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 0,
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "group",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "value",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            colors={{ scheme: "nivo" }}
            borderRadius={2}
            borderWidth={2}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.3]],
            }}
            medianWidth={2}
            medianColor={{
              from: "color",
              modifiers: [["darker", 0.3]],
            }}
            whiskerEndSize={0.6}
            whiskerColor={{
              from: "color",
              modifiers: [["darker", 0.3]],
            }}
            motionConfig="stiff"
            legends={[
              {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 100,
                itemWidth: 60,
                itemHeight: 20,
                itemsSpacing: 3,
                itemTextColor: "#999",
                symbolSize: 20,
                symbolShape: "square",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
