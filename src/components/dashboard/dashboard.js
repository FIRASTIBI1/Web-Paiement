import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { analytics } from "../../firebase"; // Import firebase.js
import { logEvent } from "firebase/analytics";
import "./dashboard.css";

const Dashboard = () => {
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [curveData, setCurveData] = useState(null); // Données pour la courbe

  useEffect(() => {
    // Simulation de données dynamiques pour les ventes
    setLineData([
      {
        id: "Ventes",
        data: [
          { x: "Lun", y: 1000 },
          { x: "Mar", y: 1200 },
          { x: "Mer", y: 935 },
          { x: "Jeu", y: 990 },
          { x: "Ven", y: 1050 },
          { x: "Sam", y: 1030 },
          { x: "Dim", y: 1040 },
        ],
      },
    ]);

    // Simulation de données pour le diagramme circulaire
    setPieData([
      { id: "Ventes", value: 80, color: "hsl(236, 72%, 47%)" },
      { id: "Retours", value: 20, color: "hsl(52, 72%, 47%)" },
    ]);

    // Génération de données pour une courbe sinusoïdale
    const generatedCurveData = Array.from({ length: 50 }, (_, index) => ({
      x: index,
      y: Math.sin(index * 0.2) * 10 + 20, // Sinusoïde
    }));

    setCurveData([
      {
        id: "Courbe",
        data: generatedCurveData,
      },
    ]);

    // Log événements Firebase Analytics
    logEvent(analytics, "page_view", {
      page: "Dashboard",
      title: "Dashboard Loaded",
    });
  }, []);

  if (!lineData || !pieData || !curveData) {
    return <p>Chargement des graphiques...</p>;
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
      </header>

      {/* Graphique Linéaire */}
      <section className="line-chart">
        <br></br>
        <br></br>
        <br></br>
        <h2>Weekly Sales</h2>
        <div style={{ height: 400 }}>
          <ResponsiveLine
            data={lineData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: true }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Jours",
              legendPosition: "middle",
              legendOffset: 36,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Valeurs",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
          />
        </div>
      </section>

      {/* Graphique Circulaire */}
      <section className="doughnut-chart">
        <h2>Sales vs Returns</h2>
        <div style={{ height: 400 }}>
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ datum: "data.color" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: "color" }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
          />
        </div>
      </section>

      {/* Courbe */}
      <section className="curve-chart">
        <h2>Sinusoidal Curve</h2>
        <div style={{ height: 400 }}>
          <ResponsiveLine
            data={curveData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "linear" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Index",
              legendPosition: "middle",
              legendOffset: 36,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Amplitude",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            colors={{ scheme: "category10" }}
            pointSize={6}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
