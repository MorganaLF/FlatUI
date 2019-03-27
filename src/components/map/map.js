import $ from 'jquery'
import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyB3R36qjSlfYo06Y6XZ6Htu6r0ivjSmcOg';
GoogleMapsLoader.VERSION = '3.36';

GoogleMapsLoader.load(function(google) {
  $('.map__body').each(function () {
  let mapSelector = $(this);


    let currentLocation = null;
    let addButton = $(mapSelector).closest('.map').find('.map__add-button');
    let geolocationButton = $(mapSelector).closest('.map').find('.map__geolocation-button');
    let markers = [];
    let pos = {lat: 37.791337, lng: -122.415077};
    let opt = {
      center: pos,
      zoom: 15
    };

    let map = new google.maps.Map($(mapSelector)[0], opt); /* Исправить? */

    let infoWindow = new google.maps.InfoWindow;

    /* Определение местоположения пользователя */

    function setGeolocation() {
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
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    geolocationButton.on('click', setGeolocation);

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    /* Определение координат в месте клика */

    function saveCoordinates(location){
      currentLocation = location;
    }

    /* Добавление нового маркера */

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

    addButton.on('click', function(event){
      placeMarker(currentLocation);
    });

});
});
