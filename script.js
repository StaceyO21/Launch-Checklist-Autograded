

window.addEventListener("load", function () {
    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
     }).then(function () {
        console.log(listedPlanets);
        let planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)

     });
     let list = document.getElementById('faultyItems');
     list.style.visibility = 'hidden';
    let form = document.querySelector("form");
     
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let pilotOne = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoMass = document.querySelector("input[name=cargoMass]").value;
     
       

        formSubmission(document, list, pilotOne, copilot, fuelLevel, cargoMass);

    });
});

