import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { analytics } from "../../firebase";
import { logEvent } from "firebase/analytics";
import "./dashboard.css";

const Dashboard = () => {
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);

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
      { id: "Retours", value: 20, color: "hsl(0, 72%, 47%)" },
    ]);

    // Log événements Firebase Analytics
    logEvent(analytics, "page_view", {
      page: "Dashboard",
      title: "Dashboard Loaded",
    });
  }, []);

  if (!lineData || !pieData) {
    return <p>Chargement des graphiques...</p>;
  }

  return (
    <div className="dashboard">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <header>
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-content">
        {/* Graphique Linéaire */}
        <section className="chart-section">
          <h2>Weekly Sales</h2>
          <div className="chart-container">
            <ResponsiveLine
              data={lineData}
              margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
        <section className="chart-section">
          <h2>Sales vs Returns</h2>
          <div className="chart-container">
            <ResponsivePie
              data={pieData}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Dashboard;
