// Write your helper functions here!

const { toBeVisible } = require("@testing-library/jest-dom/matchers");

require("cross-fetch/polyfill");

function addDestinationInfo(
  _document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let missionTargetDiv = _document.getElementById("missionTarget");

  missionTargetDiv.innerHTML = `
      <h2>Mission Destination</h2>
      <ol>
          <li>Name: ${name}</li>
          <li>Diameter: ${diameter}</li>
          <li>Star: ${star}</li>
          <li>Distance from Earth: ${distance}</li>
          <li>Number of Moons: ${moons}</li>
      </ol>
      <img src="${imageUrl}">
  `;
}

function validateInput(testInput) {
  if (testInput === "" || testInput == null) {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotValid = validateInput(pilot);
  let copilotValid = validateInput(copilot);
  let fuelValid = validateInput(fuelLevel);
  let cargoValid = validateInput(cargoLevel);
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  if (
    pilotValid === "Empty" ||
    copilotValid === "Empty" ||
    fuelValid === "Empty" ||
    cargoValid === "Empty"
  ) {
    alert("All fields are required.");
   
  } else if (
    pilotValid === "Is a Number" ||
    copilotValid === "Is a Number" ||
    fuelValid === "Not a Number" ||
    cargoValid === "Not a Number"
  ) {
    alert("You must enter valid info for each of the fields");

  } else {
    //pilot
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    //copilot
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    let launchStatusH2 = document.getElementById("launchStatus");
    if (fuelLevel < 10000 && cargoLevel <= 10000) {
      fuelStatus.innerHTML = "Fuel level too low for launch";
      cargoStatus.innerHTML = "Cargo mass low enough for launch";
      launchStatusH2.innerHTML = "Shuttle Not Ready for Launch";
      launchStatusH2.style.color = "red";
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
      fuelStatus.innerHTML = "Fuel level high enough for launch";
      cargoStatus.innerHTML = "Cargo mass too heavy for launch";
      launchStatusH2.innerHTML = "Shuttle Not Ready for Launch";
      launchStatusH2.style.color = "red";
    } else if (fuelLevel < 10000 && cargoLevel > 10000) {
      fuelStatus.innerHTML = "Fuel level too low for launch";
      cargoStatus.innerHTML = "Cargo mass too heavy for launch";
      launchStatusH2.innerHTML = "Shuttle Not Ready for Launch";
      launchStatusH2.style.color = "red";
    } else {
      fuelStatus.innerHTML = "Fuel level high enough for launch";
      cargoStatus.innerHTML = "Cargo mass low enough for launch";
      launchStatusH2.innerHTML = "Shuttle is Ready for Launch";
      launchStatusH2.style.color = "green";
    }
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    if (response.status >= 400) {
      console.log("bad response");
    } else {
      return response.json();
    }
  });
  return planetsReturned;
}

function pickPlanet(planets) {
  let randNum = Math.floor(Math.random() * planets.length);

  console.log("rand number: " + randNum);

  let pickedPlanet = planets[randNum];

  console.log("random planet: " + pickedPlanet);
  return pickedPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
