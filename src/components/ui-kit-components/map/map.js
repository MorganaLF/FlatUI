import GoogleMapsLoader from 'google-maps';

class Map {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.google = null;
    this.map = null;
    this.markers = [];
    this.currentLocation = null;
    this.init();
  }

  init() {
    this._createGoogleMap();
    this._addEventListeners();
  }

  _createGoogleMap() {
    GoogleMapsLoader.KEY = 'AIzaSyB3R36qjSlfYo06Y6XZ6Htu6r0ivjSmcOg';
    GoogleMapsLoader.VERSION = '3.36';

    GoogleMapsLoader.load((google) => {
      this.google = google;
      const position = { lat: 37.791337, lng: -122.415077 };

      const options = {
        center: position,
        zoom: 15,
      };

      const mapSelector = this.$element[0];
      this.map = new google.maps.Map(mapSelector, options);
      this._createMarker(position);

      google.maps.event.addListener(
        this.map,
        'click',
        this._setCurrentLocaton.bind(this),
      );
    });
  }

  _addEventListeners() {
    const $mapContainer = this.$element.closest('.js-map');
    const $addButton = $mapContainer.find('.js-map__button_with-marker');

    $addButton.on(
      `click.mapPlaceMarker${this.elementIndex}`,
      this._handleAddButtonClick.bind(this),
    );

    const $geolocationButton = $mapContainer.find('.js-map__button_with-geolocation');

    $geolocationButton.on(
      `click.mapDefineGeolocation${this.elementIndex}`,
      this._handleGeolocationButtonClick.bind(this),
    );
  }

  _handleAddButtonClick() {
    const newMarker = this._createMarker(this.currentLocation);
    newMarker.addListener('dblclick', this._deleteMarker);
    this.markers.push(newMarker);
  }

  _handleGeolocationButtonClick() {
    const infoWindow = new this.google.maps.InfoWindow();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocationPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(geolocationPosition);
        infoWindow.setContent('Location found.');
        infoWindow.open(this.map);
        this.map.setCenter(geolocationPosition);
      }, () => {
        this._handleLocationError(true, infoWindow, this.map.getCenter());
      });
    } else {
      this._handleLocationError(false, infoWindow, this.map.getCenter());
    }
  }

  _setCurrentLocaton(event) {
    this.currentLocation = event.latLng;
  }

  _createMarker(position) {
    return new this.google.maps.Marker({
      position,
      map: this.map,
      icon: 'images/map-marker.png',
    });
  }

  _deleteMarker() {
    this.setMap(null);
  }

  _handleLocationError(browserHasGeolocation, infoWindow, position) {
    infoWindow.setPosition(position);

    const errorText = browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : 'Error: Your browser doesn\'t support geolocation.';

    infoWindow.setContent(errorText);
    infoWindow.open(this.map);
  }
}

$(() => {
  const $map = $('.js-map__body');

  $map.each((index, item) => {
    new Map($(item), index);
  });
});
