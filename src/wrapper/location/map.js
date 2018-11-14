function initMap () {
  let currentLocation = null;
  let addButton = document.querySelector('.map__add');
  let geolocationButton = document.querySelector('.map__geolocation')
  let markers = [];
  let pos = {lat: 37.791337, lng: -122.415077};
  let opt = {
    center: pos,
    zoom: 15
  };

  let map = new google.maps.Map(document.querySelector('.map'), opt);

  let infoWindow = new google.maps.InfoWindow;

  function setGeolocation() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function saveCoordinates(location){
    currentLocation = location;
  }

  function placeMarker(location){
    let newMarker = new google.maps.Marker({
      map: map,
      position: location,
      icon: 'images/map-marker.png'
    });
    newMarker.addListener('dblclick', function(event) {

      this.setMap(null);


    });
    markers.push(newMarker);
  }

  let marker = new google.maps.Marker({
    map: map,
    position: pos,
    icon: 'images/map-marker.png'
  });

  google.maps.event.addListener(map, 'click', function(event) {
    saveCoordinates(event.latLng);
  });

  addButton.addEventListener('click', function(event){
    placeMarker(currentLocation);
  });

  geolocationButton.addEventListener('click', setGeolocation);


    // markers[1].addListener('click', function(event) {
    //   alert(1)
    //   // if(this.position === event.latLng){
    //   //   this.setMap(null);
    //   // }
    //
    // })

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }


}

global.initMap = initMap;