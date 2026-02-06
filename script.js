// ---------- NAVIGATION ----------
function goToPlan(){ window.location.href = "plan.html"; }
function goToPlaces(){ window.location.href = "places.html"; }
function goToBudget(){ window.location.href = "budget.html"; }
function goHome(){ window.location.href = "index.html"; }

// ---------- INPUT FILTERS ----------
function onlyLetters(input){ input.value = input.value.replace(/[^A-Za-z\s]/g,''); }
function onlyNumbers(input){ input.value = input.value.replace(/[^0-9]/g,''); }

document.addEventListener("DOMContentLoaded", function(){
  // Restrict inputs
  const destInput = document.getElementById("destination");
  const peopleInput = document.getElementById("people");
  const budgetInput = document.getElementById("budget");

  if(destInput) destInput.addEventListener("input", function(){ onlyLetters(this); });
  if(peopleInput) peopleInput.addEventListener("input", function(){ onlyNumbers(this); });
  if(budgetInput) budgetInput.addEventListener("input", function(){ onlyNumbers(this); });

  // PLAN PAGE
  const btn = document.getElementById("planBtn");
  if(btn){
    btn.addEventListener("click", function(){
      const errorMsg = document.getElementById("errorMsg");
      errorMsg.textContent = "";

      let dest = document.getElementById("destination").value.trim();
      let date = document.getElementById("date").value;
      let people = parseInt(document.getElementById("people").value);
      let budget = parseInt(document.getElementById("budget").value);
      let type = document.getElementById("tripType").value;

      if(dest==="" || date==="" || !people || !budget || type===""){
        errorMsg.textContent = "Fadlan buuxi dhammaan xogta!";
        return;
      }
      if(people < 1){ errorMsg.textContent = "Tirada dadka waa ugu yaraan 1"; return; }

      let trip = { destination: dest, date: date, people: people, budget: budget, type: type };
      let trips = JSON.parse(localStorage.getItem("allTrips")) || [];
      trips.push(trip);
      localStorage.setItem("allTrips", JSON.stringify(trips));

      if(budget < 500){ errorMsg.textContent = "Miisaaniyad hoose — qorshee si taxadar leh!"; }
      window.location.href = "results.html";
    });
  }

  // RESULTS PAGE
  const resultDiv = document.getElementById("tripResult");
  if(resultDiv){
    let trips = JSON.parse(localStorage.getItem("allTrips"));
    if(trips && trips.length>0){
      let trip = trips[trips.length-1];
      resultDiv.innerHTML = `
        <p><b>Destination:</b> ${trip.destination}</p>
        <p><b>Date:</b> ${trip.date}</p>
        <p><b>People:</b> ${trip.people}</p>
        <p><b>Trip Type:</b> ${trip.type}</p>
        <p><b>Total Budget:</b> $${trip.budget}</p>
      `;
    }
  }

  // PLACES PAGE
  const placesUl = document.getElementById("placesList");
  if(placesUl){
    let trips = JSON.parse(localStorage.getItem("allTrips"));
    if(trips && trips.length>0){
      let trip = trips[trips.length-1];
      let type = trip.type.toLowerCase();
      let places = [];
      if(type==="business"){ places = ["Conference Center","Office Building","Hotel","Transport Service","Restaurant"]; }
      else if(type==="vacation"){ places = ["Beach","Resort","Park","Museum","Mall"]; }
      else if(type==="adventure"){ places = ["Mountain","Hiking Trail","River","Camping Site","Adventure Park"]; }

      placesUl.innerHTML="";
      places.forEach(place=>{
        let li = document.createElement("li");
        li.textContent = place;
        li.style.cursor="pointer";
        li.onclick=()=>alert(place+" added to your trip!");
        placesUl.appendChild(li);
      });
    }
  }

  // BUDGET PAGE
  const budgetDiv = document.getElementById("budgetInfo");
  if(budgetDiv){
    let trips = JSON.parse(localStorage.getItem("allTrips"));
    if(trips && trips.length>0){
      let trip = trips[trips.length-1];
      let hotel = trip.budget*0.4;
      let transport = trip.budget*0.3;
      let food = trip.budget*0.3;
      budgetDiv.innerHTML=`
        <p>Hotel: $${hotel}</p>
        <p>Transport: $${transport}</p>
        <p>Food: $${food}</p>
      `;
    }
  }

});