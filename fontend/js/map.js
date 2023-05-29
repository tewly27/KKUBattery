var map;
// import Config from "./config.json";

function init() {
  map = new longdo.Map({
    placeholder: document.getElementById('map')
  });
  var marker = new longdo.Marker({ lat:16.457048, lon: 102.820435  });
  map.Overlays.add(marker);
}

let request = new XMLHttpRequest();
const url = `http://127.0.0.1:8000/users `;
var aaa = '';
request.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    const response = JSON.parse(this.responseText);
    console.log(response.rows);
    aaa = response.rows
  }
};

request.open("GET", url, true);
request.send();