var map;
// import Config from "./config.json";

function init() {
  map = new longdo.Map({
    placeholder: document.getElementById('map')
  });
  var marker = new longdo.Marker({ lat: 16.457048, lon: 102.820435 });
  map.Overlays.add(marker);
}

// let requestCycle = new XMLHttpRequest();

// requestCycle.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     label2 = []
//     data2 = []
//     data3 = []
//     const response = JSON.parse(this.responseText);
//     var cycle = document.getElementById("cycle");

//   }
// }

// requestCycle.open("GET", "http://127.0.0.1:8000/cycle/1", true);
// requestCycle.send();