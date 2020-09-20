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

function locateOnMap(latitude , longitude)
{
    var svgMarkup = '<svg width="24" height="24" ' +
'xmlns="http://www.w3.org/2000/svg">' +
'<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
'height="22" /><text x="12" y="18" font-size="12pt" ' +
'font-family="Cursive" font-weight="bold" text-anchor="middle" ' +
'fill="white">Y</text></svg>';
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

// function categorySearch(category)
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
    element5.textContent = "Locate On Map 2";

    element.appendChild(element2);
    element.appendChild(element4);
    element.appendChild(element5);
    results.appendChild(element);
}
