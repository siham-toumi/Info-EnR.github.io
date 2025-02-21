
  document.addEventListener("DOMContentLoaded", () => {
  const countries = {
  "France": {
  regions: { "Paris": 1200, "Lyon": 1250, "Marseille": 1300 },
  currency: "€",
  electricityRate: 0.19
},
  "Morocco": {
  regions: { "Rabat": 1800, "Casablanca": 1700, "Marrakech": 2000 },
  currency: "MAD",
  electricityRate: 1.4
},
  "Germany": {
  regions: { "Berlin": 1000, "Munich": 1100, "Hamburg": 1050 },
  currency: "€",
  electricityRate: 0.30
},
  "Italy": {
  regions: { "Rome": 1300, "Milan": 1400, "Naples": 1450 },
  currency: "€",
  electricityRate: 0.23
},
  "Spain": {
  regions: { "Madrid": 1600, "Barcelona": 1550, "Valencia": 1650 },
  currency: "€",
  electricityRate: 0.22
},
  "United States": {
  regions: { "California": 1800, "Arizona": 1900, "Texas": 1600 },
  currency: "$",
  electricityRate: 0.13
},
  "Australia": {
  regions: { "Sydney": 1600, "Melbourne": 1450, "Brisbane": 1550 },
  currency: "AUD",
  electricityRate: 0.28
},
  "India": {
  regions: { "Delhi": 1800, "Mumbai": 1900, "Chennai": 1700 },
  currency: "INR",
  electricityRate: 8
},
  "South Africa": {
  regions: { "Cape Town": 1700, "Durban": 1800, "Johannesburg": 1600 },
  currency: "ZAR",
  electricityRate: 1.2
},
  "United Kingdom": {
  regions: { "London": 1000, "Manchester": 1050, "Bristol": 1100 },
  currency: "£",
  electricityRate: 0.24
},
  "Mexico": {
  regions: { "Mexico City": 1800, "Guadalajara": 1900, "Monterrey": 1700 },
  currency: "MXN",
  electricityRate: 2.2
},
  "Brazil": {
  regions: { "São Paulo": 1500, "Rio de Janeiro": 1600, "Brasília": 1700 },
  currency: "BRL",
  electricityRate: 0.5
},
};

  const countrySelect = document.getElementById("country");
  const regionSelect = document.getElementById("region");
  const resultsDiv = document.getElementById("results");
  const chartCanvas = document.getElementById("production-chart");
  let chartInstance;

  // Générer la liste des pays
  for (const [country, details] of Object.entries(countries)) {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
}

  // Mettre à jour les régions en fonction du pays sélectionné
  countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  regionSelect.innerHTML = '<option value="">Sélectionnez une région</option>';
  if (selectedCountry && countries[selectedCountry].regions) {
  for (const [region, irradiation] of Object.entries(countries[selectedCountry].regions)) {
  const option = document.createElement("option");
  option.value = irradiation;
  option.textContent = region;
  regionSelect.appendChild(option);
}
}
});

  document.getElementById("calculate").addEventListener("click", () => {
  const monthlyConsumption = parseFloat(document.getElementById("monthly-consumption").value);
  const selectedRegionIrradiation = parseFloat(regionSelect.value);
  const electricityRate = parseFloat(document.getElementById("electricity-rate").value);
  const selectedCountry = countrySelect.value;
  const PR = 0.75;
  const irradiationSTC = 1; // Valeur constante de 1 kW/m²

  if (isNaN(monthlyConsumption) || isNaN(selectedRegionIrradiation) || isNaN(electricityRate)) {
  alert("Veuillez remplir tous les champs avec des valeurs valides.");
  return;
}

  // Calcul de la puissance crête
  let peakPower = (monthlyConsumption * irradiationSTC) / ((selectedRegionIrradiation/12) * PR);

  // Si la puissance crête calculée est inférieure à 1, choisir 1.5 kWc
  if (peakPower < 1) {
    peakPower = 1.5;

}

  // Calcul de la production annuelle basée sur l'irradiation mensuelle
  const monthlyProduction = Array.from({ length: 12 }, () => (peakPower * selectedRegionIrradiation / 12));
  const annualProduction = monthlyProduction.reduce((a, b) => a + b, 0);

  // Calcul du ROI
  const roi = (electricityRate * annualProduction / (monthlyConsumption * 12)).toFixed(1);

  // Afficher les résultats
  document.getElementById("peak-power").textContent = peakPower.toFixed(2);
  document.getElementById("annual-production").textContent = annualProduction.toFixed(0);
  document.getElementById("roi").textContent = roi;
  document.getElementById("electricity-price").textContent = `${countries[selectedCountry].currency}${electricityRate.toFixed(2)}`;
  resultsDiv.style.display = "block";

  // Afficher le graphique
  if (chartInstance) {
  chartInstance.destroy();
}
  chartInstance = new Chart(chartCanvas, {
  type: 'bar',
  data: {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
  label: "Production mensuelle (kWh)",
  data: monthlyProduction.map(val => val.toFixed(0)),
  backgroundColor: "#007BFF"
}]
},
  options: {
  responsive: true,
  scales: {
  y: {
  beginAtZero: true
}
}
}
});
});

    document.getElementById("reset").addEventListener("click", () => {
      // Réinitialiser tous les champs du formulaire
      document.getElementById("solar-form").reset();

      // Réinitialiser la liste des régions
      const regionSelect = document.getElementById("region");
      regionSelect.innerHTML = '<option value="">Sélectionnez une région</option>';

      // Cacher la section des résultats
      const resultsDiv = document.getElementById("results");
      if (resultsDiv) {
        resultsDiv.style.display = "none"; // S'assurer que le conteneur est masqué
      }

      // Réinitialiser les valeurs des résultats affichés
      document.getElementById("peak-power").textContent = "N/A";
      document.getElementById("annual-production").textContent = "N/A";
      document.getElementById("roi").textContent = "N/A";
      document.getElementById("electricity-price").textContent = "N/A";

      // Vérifier et détruire l'instance du graphique si elle existe
      if (window.chartInstance) {
        window.chartInstance.destroy();
        window.chartInstance = null;
      }
      if (resultsDiv) {
        resultsDiv.classList.add("hidden"); // Ajoute la classe pour masquer
      }

    });
    console.log("Results div:", resultsDiv); // Vérifie si l'élément est trouvé
    console.log("Display style before:", resultsDiv.style.display);
    resultsDiv.style.display = "none";
    console.log("Display style after:", resultsDiv.style.display);


  });

