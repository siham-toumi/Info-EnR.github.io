document.getElementById("evaluationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Récupérer les données utilisateur
  const appareils = parseInt(document.getElementById("appareils").value);
  const lumiere = parseInt(document.getElementById("lumiere").value);
  const chauffage = parseInt(document.getElementById("chauffage").value);

  // Calculer la consommation estimée
  const consommationAppareils = appareils * 2; // 2 kWh par appareil par jour
  const consommationLumiere = lumiere * 0.1; // 0.1 kWh par heure
  const consommationChauffage = chauffage * 2; // 2 kWh par heure

  const total = consommationAppareils + consommationLumiere + consommationChauffage;

  // Afficher les résultats
  document.getElementById("resultats").innerHTML = `
        <h3>Résultats :</h3>
        <p>Votre consommation estimée est de <strong>${total.toFixed(2)} kWh/jour</strong>.</p>
        <p><em>Réduisez votre consommation en suivant nos conseils.</em></p>
    `;
});
