import { Template } from 'meteor/templating';
import { GoogleMaps } from 'meteor/dburles:google-maps';

/* eslint-disable object-shorthand, no-undef */

Template.Location_Picker.onRendered(function render() {
  // please don't steal this key ):
  GoogleMaps.load({ key: 'AIzaSyDCfPvG1jV3AgS_TTp_KaIH8RlRi0keSpk', libraries: 'places' });
});

Template.Location_Picker.onCreated(function ready() {
  // we can use the `ready` callback to interact with the map API once the map is ready
  GoogleMaps.ready('eventMap', function eventMap(map) {
    const input = document.getElementById('pacInput');
    const searchBox = new google.maps.places.SearchBox(input);

    // bias the SearchBox results towards current map's viewport
    searchBox.setBounds(map.instance.getBounds());
    google.maps.event.addListener(map.instance, 'bounds_changed', function addListener() {
      searchBox.setBounds(map.instance.getBounds());
    });

    // listen for the event fired when the user selects a prediction and retrieve more details
    const markers = [];
    searchBox.addListener('places_changed', function addListener() {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      // clear out the old markers
      markers.forEach(function clearMarker(marker) {
        marker.setMap(null);
      });

      // for each place, get the icon, name and location
      const bounds = new google.maps.LatLngBounds();
      places.forEach(function getInl(place) {
        if (!place.geometry) {
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // create a marker for each place
        markers.push(new google.maps.Marker({
          map: map.instance,
          icon,
          title: place.name,
          position: place.geometry.location,
        }));
        if (place.geometry.viewport) {
          // only geocodes have viewport
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.instance.fitBounds(bounds);
    });
  });
});

Template.Location_Picker.helpers({
  locationPicker() {
    // make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // map initialization options
      return {
        center: new google.maps.LatLng(21.4513314, -158.0152807),
        zoom: 11,
        mapTypeId: 'roadmap',
      };
    }
    return 0;
  },
});
