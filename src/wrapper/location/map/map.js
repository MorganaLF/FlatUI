import $ from 'jquery'


/* Подключение скрипта после main.js */

$('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3R36qjSlfYo06Y6XZ6Htu6r0ivjSmcOg&callback=initMap" async defer>');

/* Инициализация карты */

function initMap () {
  let currentLocation = null;
  let addButton = document.querySelector('.map__add');
  let geolocationButton = document.querySelector('.map__geolocation');
  let markers = [];
  let pos = {lat: 37.791337, lng: -122.415077};
  let opt = {
    center: pos,
    zoom: 15
  };

  let map = new google.maps.Map(document.querySelector('.map'), opt);

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

  geolocationButton.addEventListener('click', setGeolocation);

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

  addButton.addEventListener('click', function(event){
    placeMarker(currentLocation);
  });

}

global.initMap = initMap;