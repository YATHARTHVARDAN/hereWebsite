
const apiKey = 'Yd-fnbk9FQ9yAsp35VV5rXMlCnMVJTS4eBk2f3wIkns';
var n = 0;

var posOfUser = {
    lat:null,
    long:null,
    locationEnabled:null
};

var platform = new H.service.Platform({
    'apikey': apiKey
});
var mapTypes = platform.createDefaultLayers();
var map = new H.Map(
    document.getElementById('map'),
    mapTypes.vector.normal.map,
    {
        zoom:11,
        center:{lat:28.7041,lng:77.1025}
    }
);
var ui = H.ui.UI.createDefault(map,mapTypes, 'en-US'); 
var mapEvents = new H.mapevents.MapEvents(map);
var behavior = new H.mapevents.Behavior(mapEvents);

function locateOnMap(latitude , longitude,)
{
    var svgMarkup = '<svg width="24" height="24" ' +
'xmlns="http://www.w3.org/2000/svg">' +
'<rect stroke="white" fill="#ffde58" x="1" y="1" width="22" ' +
'height="22" /><text x="12" y="18" font-size="12pt" ' +
'font-family="Cursive" font-weight="bold" text-anchor="middle" ' +
'fill="white">S</text></svg>';

var svg = 
'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" ' + 
' width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000" '+
' preserveAspectRatio="xMidYMid meet">'+
'<metadata>'+
'Created by potrace 1.16, written by Peter Selinger 2001-2019' +
'</metadata>'+
'<g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"'+
'fill="#000000" stroke="none">'+
'<path d="M2330 4989 c-246 -24 -516 -115 -728 -247 -432 -269 -714 -699 -793'+
'-1212 -16 -106 -16 -379 0 -485 72 -462 311 -858 688 -1137 l81 -61 110 -211'+
'c160 -306 321 -632 387 -780 94 -214 398 -810 430 -844 10 -11 33 27 123 205'+
'60 120 121 245 135 279 13 33 170 353 348 710 l324 651 75 56 c370 274 610'+
'674 681 1132 16 106 16 379 0 485 -56 364 -211 683 -459 942 -359 375 -879'+
'567 -1402 517z m496 -64 c699 -143 1224 -701 1325 -1406 15 -106 15 -372 0'+
'-464 -83 -504 -356 -921 -776 -1182 -296 -185 -662 -273 -1005 -243 -426 37'+
'-771 199 -1066 502 -269 275 -421 596 -464 983 -69 617 217 1218 748 1574 189'+
'127 476 231 722 261 128 15 379 4 516 -25z"/>'+
'<path d="M2380 4849 c-621 -43 -1163 -464 -1363 -1059 -133 -394 -103 -829 83'+
'-1200 213 -426 603 -727 1077 -832 84 -19 130 -22 323 -22 208 0 233 2 335 26'+
'61 14 155 42 210 63 500 185 867 613 987 1151 19 84 22 130 22 309 0 180 -3'+
'224 -22 312 -62 284 -180 522 -361 727 -327 371 -791 559 -1291 525z"/>'+
'</g>'+
'</svg>'

    var icon = new H.map.Icon(svgMarkup),
    coords = {lat: latitude, lng: longitude},
    marker = new H.map.Marker(coords, {icon: icon});
    map.addObject(marker);
}

var mapSettings = ui.getControl('mapsettings');
var zoom = ui.getControl('zoom');
var scalebar = ui.getControl('scalebar');

mapSettings.setAlignment('top-right');
zoom.setAlignment('top-right');
scalebar.setAlignment('top-right');

function newSearch()
{
    n = 0;
}

function create(element)
{
    var element = document.createElement("div");
    element.setAttribute("class","added");
    len = document.getElementsByClassName("added").length;
    element.setAttribute("id","div"+toString(len+1));
    element.textContent = "Added New element";
    var secondNest = document.createElement("div");
    secondNest.setAttribute("class","sadded");
    secondNest.setAttribute("id","ndiv"+toString(len+1));
    secondNest.textContent = "Child also possible";
    element.appendChild(secondNest);
    document.getElementById('suggestions').appendChild(element);
}


function clearOutTheSuggestions(id)
{
    let element = document.getElementById(id);
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }
}

var searchForm = document.getElementById('searchForm');

searchForm.onsubmit = async (e) => {
    e.preventDefault();
    clearOutTheSuggestions('results')
    getRequest = "";
    res = document.getElementById('searchText').value.split(" ");
    for(i=0;i<res.length-1;i++)
    {
        getRequest+=res[i];
        getRequest+="%2";
    }
    getRequest+=res[res.length-1];
    let response = await fetch('https://geocode.search.hereapi.com/v1/geocode?q='+getRequest+'&apiKey='+apiKey, {
    method: 'GET',
    });
    let result = await response.json();
    if(response.status==200)
    {
        for(i = 0;i<result.items.length;i++)
        {
            generateResults(result.items[i]);
        }
    }
    else{
        alert("No result found");
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
    posOfUser.lat = 28.7041;
    posOfUser.long = 77.1025;
    let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=10&q=salons&in=countryCode:IND&apiKey='+apiKey,{
         method:'GET'
     });

     let results = await response.json();
     console.log(results);
     for(i = 0;i<results.items.length;i++)
     {
         generateResults(results.items[i]);
     }

}

dairy.onclick = async (e) => {
    clearOutTheSuggestions('results');
    posOfUser.lat = 28.7041;
    posOfUser.long = 77.1025;
    let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=10&q=dairy&in=countryCode:IND&apiKey='+apiKey,{
         method:'GET'
     });

     let results = await response.json();
     console.log(results);
     for(i = 0;i<results.items.length;i++)
     {
         generateResults(results.items[i]);
     }

}

repair.onclick = async (e) => {
    clearOutTheSuggestions('results');
    posOfUser.lat = 28.7041;
    posOfUser.long = 77.1025;
    let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=10&q=repair&in=countryCode:IND&apiKey='+apiKey,{
         method:'GET'
     });

     let results = await response.json();
     console.log(results);
     for(i = 0;i<results.items.length;i++)
     {
         generateResults(results.items[i]);
     }

}

hospital.onclick = async (e) => {
    clearOutTheSuggestions('results');
    posOfUser.lat = 28.7041;
    posOfUser.long = 77.1025;
    let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=10&q=hospital&in=countryCode:IND&apiKey='+apiKey,{
         method:'GET'
     });

     let results = await response.json();
     console.log(results);
     for(i = 0;i<results.items.length;i++)
     {
         generateResults(results.items[i]);
     }

}

grocery.onclick = async (e) => {
    clearOutTheSuggestions('results');
    posOfUser.lat = 28.7041;
    posOfUser.long = 77.1025;
    let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=10&q=grocery&in=countryCode:IND&apiKey='+apiKey,{
         method:'GET'
     });

     let results = await response.json();
     console.log(results);
     for(i = 0;i<results.items.length;i++)
     {
         generateResults(results.items[i]);
     }

}

chemists.onclick = async (e) => {
    clearOutTheSuggestions('results');
    posOfUser.lat = 28.7041;
    posOfUser.long = 77.1025;
    let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=10&q=chemists&in=countryCode:IND&apiKey='+apiKey,{
         method:'GET'
     });

     let results = await response.json();
     console.log(results);
     for(i = 0;i<results.items.length;i++)
     {
         generateResults(results.items[i]);
     }

}
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

// function askForLocation()
// {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//       } else { 
//         alert("Geolocation is not supported by this browser");
//         posOfUser.locationEnabled = false;
//       }
//     function showPosition(position) {
//       posOfUser.lat = position.coords.latitude;
//       posOfUser.long = position.coords.longitude;
//       posOfUser.locationEnabled = true;
//     }
// }




function generateResults(data)
{
    var element = document.createElement("div");
    element.setAttribute("class","card white black_text");
    var element2 =document.createElement("div");
    element2.setAttribute("class","header norwester");
    var element3 = document.createElement("p");
    element3.textContent = data.address.label;
    element2.appendChild(element3);
    var element4 = document.createElement("div");
    element4.setAttribute("class","address consolas");
    element4.textContent = data.address.countryName+", "+data.address.postalCode+", "+data.address.state;
    var element5 = document.createElement("div");
    element5.setAttribute("class","pom norwester");
    element5.setAttribute("onclick","locateOnMap("+data.position.lat+","+data.position.lng+")");
    element5.textContent = "Locate On Map";

    element.appendChild(element2);
    element.appendChild(element4);
    element.appendChild(element5);
    results.appendChild(element);
}
