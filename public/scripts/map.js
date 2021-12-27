let mylatlng ={
  lat:45.4215,
  lng:-75.6972
}

let mapOptions={
  center :mylatlng,
  zoom:7,
  mapTypeId:google.maps.MapTypeId.ROADMAP
};

//Create Map
let map = new google.maps.Map(document.getElementById("googleMap"),mapOptions)
const trafficLayer = new google.maps.TrafficLayer();

trafficLayer.setMap(map);
//Directions
let directionsService =new google.maps.DirectionsService();

//create a directions Render to display route
let directionsDisplay=new google.maps.DirectionsRenderer();

//Bind direction renderer to the map
directionsDisplay.setMap(map);
calcRoute();

function calcRoute(){
    let request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,      
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem : google.maps.UnitSystem.METRIC,

    }

    directionsService.route(request,(result,status)=>{
        if(status===google.maps.DirectionsStatus.OK){
        //get distance and time
            const output = document.querySelector("#output");
            output.innerHTML=
            // "<div>From: "+document.getElementById("from").value  + 
            // "<br/>To: "+document.getElementById("to").value +
            "<span><h5> Driving Distance :"+result.routes[0].legs[0].distance.text +
            " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbspEstimated Time : "
            +result.routes[0].legs[0].duration.text+"</h5></span>";

 
        //display route
        directionsDisplay.setDirections(result);

      }else{
        directionsDisplay.setDirections({routes:[]});

        map.setCenter(mylatlng);
        output.innerHTML=
        "<div>Could not retrieve driving distance</div> ";

      }
    });
}
var options ={
  
  }
  var input1= document.getElementById("from");
  var autocomplete1 = new google.maps.places.Autocomplete(input1,options);  
  var input2= document.getElementById("to");
  var autocomplete2 = new google.maps.places.Autocomplete(input2,options);

 let x;
 let p=document.getElementById("info");
 function getLocation(element){
  var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
  };
  
 x=document.getElementById(element);

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError,options);
    }
    else{
        p.innerHTML="Geolocation is not supported by this browser.";
    }
}

function showPosition(position){
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    displayLocation(lat,lon);
}

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            p.innerHTML="User denied the request for Geolocation.Please enter the adress manually"
        break;
        case error.POSITION_UNAVAILABLE:
            p.innerHTML="Location information is unavailable.Please enter the adress manually"
        break;
        case error.TIMEOUT:
            p.innerHTML="The request to get user location timed out.Please enter the adress manually"
        break;
        case error.UNKNOWN_ERROR:
            p.innerHTML="An unknown error occurred.Please enter the adress manually"
        break;
    }
}

function displayLocation(latitude,longitude){
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    
    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                  
                    var new_address= results[0].formatted_address ;                    
                    x.value = new_address;                   
                }
                else  {
                    p.innerHTML = "address not found";
                }
            }
            else {
                p.innerHTML = "Geocoder failed due to: " + status;
            }
        }
    );
      }