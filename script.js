var dataTodisplay;

var markers = [];

var northWestDelhi = '<svg width="300" height="200" ' +
'xmlns="http://www.w3.org/2000/svg">' +
'<circle cx="100" cy="100" r="50" ' +
'fill="#DAF856" opacity="0.7" />'+
'<circle cx="100" cy="100" r="10" '+
'fill="black" />'+
'</svg>';
var result;
window.onload = async ()=>{
    let response = await fetch('https://scraperhere.herokuapp.com',{
        method:'GET'
    });
    result = await response.json();
    console.log(result);
    
    // console.log('heres the data' + result.delhiTotal );
    // var mainContainer = document.getElementsByClassName("table-data");
    // mainContainer.innerHTML='TotalCases :'+result.delhiTotal+'<br>';

    // appendData(result);
}
function appendData(data) {
    var mainContainer = document.getElementById("table-data");
    // for (var i = 0; i < data.length; i++) {
    var div = document.createElement("pre");
    mainContainer.innerHTML ='Total Cases in your locale '+data.delhiTotal;
    // console.log('heres the data'+ result);
    mainContainer.appendChild(div);
    // }
}

const apiKey = 'Yd-fnbk9FQ9yAsp35VV5rXMlCnMVJTS4eBk2f3wIkns';
var n = 0;

var posOfUser = {
    lat:null,
    long:null,
    locationEnabled:null
};

var platform = new H.service.Platform({
    'apikey': apiKey,
    useCIT: false,
    useHTTPS: true
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


var defaultLayers = platform.createDefaultLayers();
var geocoder = platform.getGeocodingService();
var group = new H.map.Group();

group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getGeometry());
    openBubble(
        evt.target.getGeometry(), evt.target.getData());
}, false);


//Step 2: initialize a map - this map is centered over Europe

map.addObject(group);

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components



var svgMarkup = '<svg width="60" height="60" ' +
'xmlns="http://www.w3.org/2000/svg">' +
'<rect stroke="white" fill="#ffde58" x="1" y="1" width="22" ' +
'height="22" /><text x="12" y="18" font-size="12pt" ' +
'font-family="Cursive" font-weight="bold" text-anchor="middle" ' +
'fill="white">S</text></svg>';

var MarkForTheCenter = '<svg width="90" height="90" ' +
'xmlns="http://www.w3.org/2000/svg">' +
'<polygon poits="90,0 20,0 20,80 30,80 0,90 40,80 90,80" />'
'height="22" /><text x="12" y="18" font-size="12pt" ' +
'font-family="Cursive" font-weight="bold" text-anchor="middle" ' +
'fill="white"></text></svg>'

function locateOnMap(latitude , longitude, category)
{
    var svgMarkup = '<svg width="100" height="200" ' +
'xmlns="http://www.w3.org/2000/svg">' +
'<polygon points="25,80 50,170 75,80" class="triangle" fill="red"/>'+
'<circle cx="50" cy="100" r="24" '+
'fill="red" />'+
'<circle cx="50" cy="100" r="10" '+
'fill="#7CECE3" />'+
'</svg>';
    var icon = new H.map.Icon(svgMarkup),
    coords = {lat: latitude, lng: longitude},
    marker = new H.map.Marker(coords, {icon: icon});
    map.addObject(marker);
    markers.push(marker);
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
    checkForLocation();
    let response  = await fetch('https://discover.search.hereapi.com/v1/discover?at='+posOfUser.lat+','+posOfUser.long+'&limit=100&q=salons&in=countryCode:IND&apiKey='+apiKey,{
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
    checkForLocation();
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
    checkForLocation();
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
    checkForLocation();
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
    checkForLocation();
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
    checkForLocation();
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
function checkForLocation()
{
    if(posOfUser.locationEnabled==null)
    {
        alert("This app require Location.");
        // posOfUser.locationEnabled = false;
        askForLocation();

        // if(posOfUser.locationEnabled==null){
        // alert("location disabled redirecting to last known(Mumbai,Maharashtra)")
        //     posOfUser.lat = 19.076090;
        //     posOfUser.long = 72.877426;
        // }
    }
}
function askForLocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        alert("Geolocation is not supported by this browser");
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

var AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json',
    ajaxRequest = new XMLHttpRequest(),
    query = '';

/**
 * If the text in the text box  has changed, and is not empty,
 * send a geocoding auto-completion request to the server.
 *
 * @param {Object} textBox the textBox DOM object linked to this event
 * @param {Object} event the DOM event which fired this listener
 */
function autoCompleteListener(textBox, event) {

    if (query != textBox.value){
        if (textBox.value.length >= 1){

            /**
             * A full list of available request parameters can be found in the Geocoder Autocompletion
             * API documentation.
             *
             */
            var params = '?' +
                'query=' +  encodeURIComponent(textBox.value) +   // The search text which is the basis of the query
                '&beginHighlight=' + encodeURIComponent('') + //  Mark the beginning of the match in a token.
                '&endHighlight=' + encodeURIComponent('') + //  Mark the end of the match in a token.
                '&maxresults=5' +  // The upper limit the for number of suggestions to be included
                // in the response.  Default is set to 5.
                '&apikey=' + apiKey;
            ajaxRequest.open('GET', AUTOCOMPLETION_URL + params );
            ajaxRequest.send();
        }
    }
    query = textBox.value;
}


/**
 *  This is the event listener which processes the XMLHttpRequest response returned from the server.
 */
function onAutoCompleteSuccess() {
    /*
     * The styling of the suggestions response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    clearOldSuggestions();
    addSuggestionsToPanel(this.response);  // In this context, 'this' means the XMLHttpRequest itself.
    addSuggestionsToMap(this.response);
}


/**
 * This function will be called if a communication error occurs during the XMLHttpRequest
 */
function onAutoCompleteFailed() {
    alert('Ooops!');
}

// Attach the event listeners to the XMLHttpRequest object
ajaxRequest.addEventListener("load", onAutoCompleteSuccess);
ajaxRequest.addEventListener("error", onAutoCompleteFailed);
ajaxRequest.responseType = "json";


/**
 * Boilerplate map initialization code starts below:
 */


var bubble;

/**
 * Function to Open/Close an infobubble on the map.
 * @param  {H.geo.Point} position     The location on the map.
 * @param  {String} text              The contents of the infobubble.
 */
function openBubble(position, text){
    if(!bubble){
        bubble =  new H.ui.InfoBubble(
            position,
            // The FO property holds the province name.
            {content: '<small>' + text+ '</small>'});
        ui.addBubble(bubble);
    } else {
        bubble.setPosition(position);
        bubble.setContent('<small>' + text+ '</small>');
        bubble.open();
    }
}


/**
 * The Geocoder Autocomplete API response retrieves a complete addresses and a `locationId`.
 * for each suggestion.
 *
 * You can subsequently use the Geocoder API to geocode the address based on the ID and
 * thus obtain the geographic coordinates of the address.
 *
 * For demonstration purposes only, this function makes a geocoding request
 * for every `locationId` found in the array of suggestions and displays it on the map.
 *
 * A more typical use-case would only make a single geocoding request - for example
 * when the user has selected a single suggestion from a list.
 *
 * @param {Object} response
 */
function addSuggestionsToMap(response){
    /**
     * This function will be called once the Geocoder REST API provides a response
     * @param  {Object} result          A JSONP object representing the  location(s) found.
     */
    var onGeocodeSuccess = function (result) {
            var marker,
                locations = result.Response.View[0].Result,
                i;

            // Add a marker for each location found
            for (i = 0; i < locations.length; i++) {
                marker = new H.map.Marker({
                    lat : locations[i].Location.DisplayPosition.Latitude,
                    lng : locations[i].Location.DisplayPosition.Longitude
                });
                marker.setData(locations[i].Location.Address.Label);
                group.addObject(marker);
            }

            map.getViewModel().setLookAtData({
                bounds: group.getBoundingBox()
            });
            if(group.getObjects().length < 2){
                map.setZoom(15);
            }
        },
        /**
         * This function will be called if a communication error occurs during the JSON-P request
         * @param  {Object} error  The error message received.
         */
        onGeocodeError = function (error) {
            alert('Ooops!');
        },
        /**
         * This function uses the geocoder service to calculate and display information
         * about a location based on its unique `locationId`.
         *
         * A full list of available request parameters can be found in the Geocoder API documentation.
         * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-search.html
         *
         * @param {string} locationId    The id assigned to a given location
         */
        geocodeByLocationId = function (locationId) {
            geocodingParameters = {
                locationId : locationId
            };

            geocoder.geocode(
                geocodingParameters,
                onGeocodeSuccess,
                onGeocodeError
            );
        }

    /*
     * Loop through all the geocoding suggestions and make a request to the geocoder service
     * to find out more information about them.
     */

    response.suggestions.forEach(function (item, index, array) {
        geocodeByLocationId(item.locationId);
    });
}


/**
 * Removes all H.map.Marker points from the map and adds closes the info bubble
 */
function clearOldSuggestions(){
    group.removeAll ();
    if(bubble){
        bubble.close();
    }
}

/**
 * Format the geocoding autocompletion repsonse object's data for display
 *
 * @param {Object} response
 */
function addSuggestionsToPanel(response){
    let result = response.suggestions;
    console.log(result);
    var panel = document.getElementById('autoSuggest');
     while(panel.firstChild)
     {
         panel.removeChild(panel.firstChild);
     }

     for(var i = 0;i<result.length;i++)
     {
        var stringToParse = result[i].label; 
        
        var para = document.createElement("p");
        para.innerText = stringToParse;
         panel.appendChild(para);
     }
}



var content =  '<strong style="font-size: large;">' + 'Geocoding Autocomplete'  + '</strong></br>';

content  += '<br/><input type="text" id="auto-complete" style="margin-left:5%; margin-right:5%; min-width:90%"  onkeyup="return autoCompleteListener(this, event);"><br/>';
content  += '<br/><strong>Response:</strong><br/>';
content  += '<div style="margin-left:5%; margin-right:5%;"><pre style="max-height:235px"><code  id="suggestions" style="font-size: small;">' +'{}' + '</code></pre></div>';

// suggestionsContainer.innerHTML = content;