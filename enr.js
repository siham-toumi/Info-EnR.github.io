// Données pour le graphique
const data = {
  labels: ["2000", "2005", "2010", "2015", "2020"],
  datasets: [
    {
      label: "Énergie Solaire (GW)",
      data: [10, 25, 100, 300, 800],
      borderColor: "red",
      fill: false,
    },
    {
      label: "Énergie Éolienne (GW)",
      data: [20, 50, 150, 400, 700],
      borderColor: "blue",
      fill: false,
    },
    {
      label: "Énergie Hydraulique (GW)",
      data: [500, 600, 700, 750, 800],
      borderColor: "green",
      fill: false,
    },
  ],
};

// Configuration du graphique
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
};

// Création du graphique
const ctx = document.getElementById("energyChart").getContext("2d");
new Chart(ctx, config);