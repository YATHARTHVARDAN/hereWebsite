var dataTodisplay;

var markers = [];

var northWestDelhi =
  '<svg width="300" height="200" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<circle cx="100" cy="100" r="50" ' +
  'fill="#DAF856" opacity="0.7" />' +
  '<circle cx="100" cy="100" r="10" ' +
  'fill="black" />' +
  '</svg>';
var result;
/* Covid info scraper function */
// window.onload = async ()=>{
//     let response = await fetch('https://scraperhere.herokuapp.com',{
//         method:'GET'
//     });
//     result = await response.json();
//     console.log(result);

//     // console.log('heres the data' + result.delhiTotal );
//     // var mainContainer = document.getElementsByClassName("table-data");
//     // mainContainer.innerHTML='TotalCases :'+result.delhiTotal+'<br>';

//     // appendData(result);
// }
// function appendData(data) {
//     var mainContainer = document.getElementById("table-data");
//     // for (var i = 0; i < data.length; i++) {
//     var div = document.createElement("pre");
//     mainContainer.innerHTML ='Total Cases in your locale '+data.delhiTotal;
//     // console.log('heres the data'+ result);
//     mainContainer.appendChild(div);
//     // }
// }
// callOut();

function callOut() {
  alert('There Maps Local Essential Service Finder Tool. Allow Location');
}

const apiKey = 'Yd-fnbk9FQ9yAsp35VV5rXMlCnMVJTS4eBk2f3wIkns';
var n = 0;

var posOfUser = {
  lat: null,
  long: null,
  locationEnabled: null,
};

var platform = new H.service.Platform({
  apikey: apiKey,
});
var mapTypes = platform.createDefaultLayers();
var map = new H.Map(
  document.getElementById('map'),
  mapTypes.vector.normal.map,
  {
    zoom: 11,
    center: { lat: 28.7041, lng: 77.1025 },
  }
);
var ui = H.ui.UI.createDefault(map, mapTypes, 'en-US');
var mapEvents = new H.mapevents.MapEvents(map);
var behavior = new H.mapevents.Behavior(mapEvents);

var svgMarkup =
  '<svg width="60" height="60" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#ffde58" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Cursive" font-weight="bold" text-anchor="middle" ' +
  'fill="white">S</text></svg>';

var MarkForTheCenter =
  '<svg width="90" height="90" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<polygon poits="90,0 20,0 20,80 30,80 0,90 40,80 90,80" />';
'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Cursive" font-weight="bold" text-anchor="middle" ' +
  'fill="white"></text></svg>';

function locateOnMap(latitude, longitude, category) {
    if(markers.length>0)
    {
        for(var i = 0;i<markers.length;i++)
        {
            try{
            map.removeObject(markers[i]);
            }
            catch(error){
                console.log(error);
            }
        }
    }

  var svgMarkup =
    '<svg width="100" height="200" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<polygon points="25,80 50,170 75,80" class="triangle" fill="red"/>' +
    '<circle cx="50" cy="100" r="24" ' +
    'fill="red" />' +
    '<circle cx="50" cy="100" r="10" ' +
    'fill="#7CECE3" />' +
    '</svg>';
  var icon = new H.map.Icon(svgMarkup),
    coords = { lat: latitude, lng: longitude },
    marker = new H.map.Marker(coords, { icon: icon });
  map.addObject(marker);
  //   map.removeObject(marker);
  markers.push(marker);
}

function markPoints(latitude, longitude, category) {
  var svgMarkup =
    '<svg width="100" height="200" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    // '<polygon points="25,80 50,170 75,80" class="triangle" fill="red"/>'+
    '<circle cx="50" cy="100" r="24" ' +
    'fill="red" />' +
    '<circle cx="50" cy="100" r="10" ' +
    'fill="#7CECE3" />' +
    '</svg>';

  var icon = new H.map.Icon(svgMarkup),
    coords = { lat: latitude, lng: longitude },
    marker = new H.map.Marker(coords, { icon: icon });
  map.addObject(marker);
  markers.push(marker);
}

var overlay = new H.map.Overlay(
  new H.geo.Rect(
    70.72849153520343,
    -24.085683364175395,
    29.569664922291,
    44.216452317817016
  ),
  'https://heremaps.github.io/maps-api-for-javascript-examples/image-overlay/data/0.png'
);

// add overlay to the map
map.addObject(overlay);

var mapSettings = ui.getControl('mapsettings');
var zoom = ui.getControl('zoom');
var scalebar = ui.getControl('scalebar');

mapSettings.setAlignment('top-right');
zoom.setAlignment('top-right');
scalebar.setAlignment('top-right');

function newSearch() {
  n = 0;
}

function create(element) {
  var element = document.createElement('div');
  element.setAttribute('class', 'added');
  len = document.getElementsByClassName('added').length;
  element.setAttribute('id', 'div' + toString(len + 1));
  element.textContent = 'Added New element';
  var secondNest = document.createElement('div');
  secondNest.setAttribute('class', 'sadded');
  secondNest.setAttribute('id', 'ndiv' + toString(len + 1));
  secondNest.textContent = 'Child also possible';
  element.appendChild(secondNest);
  document.getElementById('suggestions').appendChild(element);
}

function clearOutTheSuggestions(id) {
  let element = document.getElementById(id);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
    if(markers.length>0)
    {
        for(var i = 0;i<markers.length;i++)
        {
            try{
            map.removeObject(markers[i]);
            }
            catch(error){
                console.log(error);
            }
        }
    }
}
var searchForm = document.getElementById('searchForm');

searchForm.onsubmit = async (e) => {
  e.preventDefault();
  clearOutTheSuggestions('results');
  getRequest = '';
  res = document.getElementById('searchText').value.split(' ');
  for (i = 0; i < res.length - 1; i++) {
    getRequest += res[i];
    getRequest += '%2';
  }
  getRequest += res[res.length - 1];
  let response = await fetch(
    'https://geocode.search.hereapi.com/v1/geocode?q=' +
      getRequest +
      '&apiKey=' +
      apiKey,
    {
      method: 'GET',
    }
  );
  let result = await response.json();
  if (response.status == 200) {
    for (i = 0; i < result.items.length; i++) {
      generateResults(result.items[i]);
    }
  } else {
    alert('No result found');
  }
};

var results = document.getElementById('results');

var salons = document.getElementById('salons');
var chemists = document.getElementById('chemists');
var grocery = document.getElementById('grocery');
var dairy = document.getElementById('dairy');
var hospital = document.getElementById('hospital');
var repair = document.getElementById('repair');

salons.onclick = async (e) => {
  clearOutTheSuggestions('results');
  checkForLocation();
  let response = await fetch(
    'https://discover.search.hereapi.com/v1/discover?at=' +
      posOfUser.lat +
      ',' +
      posOfUser.long +
      '&limit=25&q=salons&in=countryCode:IND&apiKey=' +
      apiKey,
    {
      method: 'GET',
    }
  );

  let results = await response.json();
  console.log(results);
  for (i = 0; i < results.items.length; i++) {
    generateResults(results.items[i]);
  }
};

dairy.onclick = async (e) => {
  clearOutTheSuggestions('results');
  checkForLocation();
  let response = await fetch(
    'https://discover.search.hereapi.com/v1/discover?at=' +
      posOfUser.lat +
      ',' +
      posOfUser.long +
      '&limit=25&q=dairy&in=countryCode:IND&apiKey=' +
      apiKey,
    {
      method: 'GET',
    }
  );

  let results = await response.json();
  console.log(results);
  for (i = 0; i < results.items.length; i++) {
    generateResults(results.items[i]);
  }
};

repair.onclick = async (e) => {
  clearOutTheSuggestions('results');
  checkForLocation();
  let response = await fetch(
    'https://discover.search.hereapi.com/v1/discover?at=' +
      posOfUser.lat +
      ',' +
      posOfUser.long +
      '&limit=25&q=repair&in=countryCode:IND&apiKey=' +
      apiKey,
    {
      method: 'GET',
    }
  );

  let results = await response.json();
  console.log(results);
  for (i = 0; i < results.items.length; i++) {
    generateResults(results.items[i]);
  }
};

hospital.onclick = async (e) => {
  clearOutTheSuggestions('results');
  checkForLocation();
  let response = await fetch(
    'https://discover.search.hereapi.com/v1/discover?at=' +
      posOfUser.lat +
      ',' +
      posOfUser.long +
      '&limit=25&q=hospital&in=countryCode:IND&apiKey=' +
      apiKey,
    {
      method: 'GET',
    }
  );

  let results = await response.json();
  console.log(results);
  for (i = 0; i < results.items.length; i++) {
    generateResults(results.items[i]);
  }
};

grocery.onclick = async (e) => {
  clearOutTheSuggestions('results');
  checkForLocation();
  let response = await fetch(
    'https://discover.search.hereapi.com/v1/discover?at=' +
      posOfUser.lat +
      ',' +
      posOfUser.long +
      '&limit=25&q=grocery&in=countryCode:IND&apiKey=' +
      apiKey,
    {
      method: 'GET',
    }
  );

  let results = await response.json();
  console.log(results);
  for (i = 0; i < results.items.length; i++) {
    generateResults(results.items[i]);
  }
};

chemists.onclick = async (e) => {
  clearOutTheSuggestions('results');
  checkForLocation();
  let response = await fetch(
    'https://discover.search.hereapi.com/v1/discover?at=' +
      posOfUser.lat +
      ',' +
      posOfUser.long +
      '&limit=25&q=chemists&in=countryCode:IND&apiKey=' +
      apiKey,
    {
      method: 'GET',
    }
  );

  let results = await response.json();
  console.log(results);
  for (i = 0; i < results.items.length; i++) {
    generateResults(results.items[i]);
  }
};
//categorySearch(category)
// {
//     if(posOfUser.locationEnabled==null || !posOfUser.locationEnabled)
//     {
//         await askForLocation();
//     }
//     else if(!posOfUser.locationEnabled)
//     {
//         posOfUser.lat = 28.7041;
//         posOfUser.long = 77.1025;
//         alert("Since the location was not enabled the default location i.e the location of the center point of new delhi is considered");
//     }

//     let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=1&q='+category+'&in=countryCode:IND&apiKey='+apiKey,{
//         method='GET'
//     });

//     let results = await response.json();
//     console.log(results);
//     for(i = 0;i<results.length;i++)
//     {
//         generateResults(results.items[i]);
//     }
// }
function checkForLocation() {
  if (posOfUser.locationEnabled == null) {
    alert('This app require Location.');
    // posOfUser.locationEnabled = false;
    askForLocation();

    // if(posOfUser.locationEnabled==null){
    // alert("location disabled redirecting to last known(Mumbai,Maharashtra)")
    //     posOfUser.lat = 19.076090;
    //     posOfUser.long = 72.877426;
    // }
  }
}

function askForLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser');
    posOfUser.locationEnabled = false;
  }
  function showPosition(position) {
    posOfUser.lat = position.coords.latitude;
    posOfUser.long = position.coords.longitude;
    posOfUser.locationEnabled = true;
  }
  console.log(posOfUser);
}

askForLocation();

function addDraggableMarker(map, behavior) {
  // Step 2: Set up a marker and make it volatile and draggable
  var marker = new H.map.Marker(
    { lat: 28.7041, lng: 77.10251 },
    {
      // mark the object as volatile for the smooth dragging
      volatility: true,
    }
  );

  // ensure that the marker can receive drag events
  marker.draggable = true;
  map.addObject(marker);

  // Step 3: Handle the dragstart event (user starts dragging the pointer)
  map.addEventListener(
    'dragstart',
    function (ev) {
      let target = ev.target;
      let pointer = ev.currentPointer;
      // check whether event target is a marker
      if (target instanceof H.map.Marker) {
        let targetPosition = map.geoToScreen(target.getGeometry());
        // calculate the offset between mouse and target's position
        target['offset'] = new H.math.Point(
          pointer.viewportX - targetPosition.x,
          pointer.viewportY - targetPosition.y
        );
        // disable the default draggability of the underlying map
        behavior.disable();
      }
    },
    false
  );

  // Step 4: Handle the drag event (user is dragging the pointer)
  map.addEventListener(
    'drag',
    function (ev) {
      let target = ev.target;
      let pointer = ev.currentPointer;
      // check whether event target is a marker
      if (target instanceof H.map.Marker) {
        // set new position of marker to position of pointer, taking the offset from Step 3 into account
        target.setGeometry(
          map.screenToGeo(
            pointer.viewportX - target['offset'].x,
            pointer.viewportY - target['offset'].y
          )
        );
      }
    },
    false
  );

  // Step 5: Handle the dragend event (user stops dragging the pointer)
  map.addEventListener(
    'dragend',
    function (ev) {
      let target = ev.target;
      // check whether event target is a marker
      // console.log(ev);

      var coord = map.screenToGeo(
        ev.currentPointer.viewportX,
        ev.currentPointer.viewportY
      );
      let capturedLat = coord.lat.toFixed(4);
      let capturedLng = coord.lng.toFixed(4);
      console.log(
        'Clicked at ' +
          Math.abs(coord.lat.toFixed(4)) +
          (coord.lat > 0 ? 'N' : 'S') +
          ' ' +
          Math.abs(coord.lng.toFixed(4)) +
          (coord.lng > 0 ? 'E' : 'W')
      );

      // setting lat lon in state
      posOfUser.lat = capturedLat;
      posOfUser.long = capturedLng;
      posOfUser.locationEnabled = true;
    //   clearOutTheSuggestions('results');
      if (target instanceof H.map.Marker) {
        // re-enable the default draggability of the underlying map
        behavior.enable();
      }
    },
    false
  );
}

addDraggableMarker(map, behavior);

function generateResults(data) {
  var element = document.createElement('div');
  element.setAttribute('class', 'card white black_text');
  var element2 = document.createElement('div');
  element2.setAttribute('class', 'header norwester');
  var element3 = document.createElement('p');
  element3.textContent = data.address.label;
  element2.appendChild(element3);

  var element4 = document.createElement('div');
  element4.setAttribute('class', 'address consolas');
  element4.textContent =
    data.address.countryName +
    ', ' +
    data.address.postalCode +
    ', ' +
    data.address.state;

  var element6 = document.createElement('div');
  element6.setAttribute('class', 'dist');
  element6.textContent = 'Distance: ' + data.distance +' m';

  var element5 = document.createElement('div');
  element5.setAttribute('class', 'pom norwester');
  element.setAttribute(
    'onclick',
    'locateOnMap(' + data.position.lat + ',' + data.position.lng + ')'
  );
  element5.textContent = 'Locate On Map';
  markPoints(data.position.lat, data.position.lng);

  element.appendChild(element2);
  element.appendChild(element4);
  element.appendChild(element6);
  element.appendChild(element5);
  results.appendChild(element);
}
