document.getElementById("add-appliance").addEventListener("click", function () {
  const applianceSection = document.getElementById("appliances-section");

  const newAppliance = document.createElement("div");
  newAppliance.classList.add("appliance");

  newAppliance.innerHTML = `
    <label for="appliance-name">Nom de l'appareil :</label>
    <input type="text" class="appliance-name" placeholder="Ex : Réfrigérateur" required>
    <label for="appliance-power">Puissance (W) :</label>
    <input type="number" class="appliance-power" placeholder="Ex : 100" min="1" required>
    <label for="appliance-usage">Utilisation quotidienne (h) :</label>
    <input type="number" class="appliance-usage" placeholder="Ex : 10" min="1" max="24" required>
  `;

  applianceSection.appendChild(newAppliance);
});

document.getElementById("energy-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Validation des données générales
  const area = parseFloat(document.getElementById("area").value);
  const rooms = parseFloat(document.getElementById("rooms").value);
  const tariff = parseFloat(document.getElementById("tariff").value);

  if (isNaN(area) || area <= 0) {
    alert("Veuillez entrer une superficie valide.");
    return;
  }

  if (isNaN(rooms) || rooms <= 0) {
    alert("Veuillez entrer un nombre valide de pièces.");
    return;
  }

  if (isNaN(tariff) || tariff <= 0) {
    alert("Veuillez entrer un tarif valide.");
    return;
  }

  // Calcul de la consommation totale
  let totalConsumption = 0;
  const applianceData = [];
  const appliances = document.querySelectorAll(".appliance");

  appliances.forEach(function (appliance) {
    const name = appliance.querySelector(".appliance-name").value.trim();
    const power = parseFloat(appliance.querySelector(".appliance-power").value);
    const usage = parseFloat(appliance.querySelector(".appliance-usage").value);

    if (!name || isNaN(power) || power <= 0 || isNaN(usage) || usage <= 0 || usage > 24) {
      alert("Veuillez entrer des valeurs valides pour tous les appareils.");
      return;
    }

    const consumption = (power * usage) / 1000; // kWh
    totalConsumption += consumption;

    applianceData.push({ name, consumption });
  });

  // Calcul du coût total
  const totalCost = totalConsumption * tariff;

  // Affichage des résultats
  document.getElementById("total-consumption").innerText = totalConsumption.toFixed(2);
  document.getElementById("total-cost").innerText = totalCost.toFixed(2);
  document.getElementById("results").style.display = "block";

  // Création ou mise à jour du graphique
  const ctx = document.getElementById("consumption-chart").getContext("2d");
  if (window.chart) {
    window.chart.destroy(); // Éviter les doublons
  }

  window.chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: applianceData.map(appliance => appliance.name),
      datasets: [{
        data: applianceData.map(appliance => appliance.consumption),
        backgroundColor: applianceData.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
      }],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw.toFixed(2)} kWh`;
            },
          },
        },
      },
    },
  });

  // Recommandations
  let recommendations = "Consommation élevée. Essayez d'optimiser vos appareils.";
  if (area > 150 && rooms > 4) {
    recommendations = "Grand logement. Envisagez des équipements écoénergétiques.";
  } else if (totalConsumption > 50) {
    recommendations = "Votre consommation est élevée. Vérifiez les appareils énergivores.";
  }

  const isolationChecked = document.querySelector('input[name="isolation"]:checked');
  if (isolationChecked && isolationChecked.value === "yes") {
    recommendations += " Bonne isolation détectée, ce qui réduit vos besoins énergétiques.";
  }

  document.getElementById("recommendations").innerText = recommendations;
});

document.getElementById("reset-form").addEventListener("click", function () {
  document.getElementById("energy-form").reset();
  document.getElementById("appliances-section").innerHTML = "<h3>Appareils</h3>";
  document.getElementById("results").style.display = "none";

  if (window.chart) {
    window.chart.destroy();
  }
});