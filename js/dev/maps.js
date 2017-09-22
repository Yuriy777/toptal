/**
 * Created by Admin on 22.09.2017.
 */
//maps
function descrMap(){
    var name = getName();
    var location = $('#autocomplete').val();
    $('#results-map p').html(name[0] + ' lives in ' + location + ' (see map)');
};

//value map

var map, places, infoWindow;
var marker = [];
var autocomplete;
var countryRestrict = {'country': 'us'};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');

var countries = {
    'au': {
        center: {lat: -25.3, lng: 133.8},
        zoom: 4
    },
    'br': {
        center: {lat: -14.2, lng: -51.9},
        zoom: 3
    },
    'ca': {
        center: {lat: 62, lng: -110.0},
        zoom: 3
    },
    'fr': {
        center: {lat: 46.2, lng: 2.2},
        zoom: 5
    },
    'de': {
        center: {lat: 51.2, lng: 10.4},
        zoom: 5
    },
    'mx': {
        center: {lat: 23.6, lng: -102.5},
        zoom: 4
    },
    'nz': {
        center: {lat: -40.9, lng: 174.9},
        zoom: 5
    },
    'it': {
        center: {lat: 41.9, lng: 12.6},
        zoom: 5
    },
    'za': {
        center: {lat: -30.6, lng: 22.9},
        zoom: 5
    },
    'es': {
        center: {lat: 40.5, lng: -3.7},
        zoom: 5
    },
    'pt': {
        center: {lat: 39.4, lng: -8.2},
        zoom: 6
    },
    'us': {
        center: {lat: 37.1, lng: -95.7},
        zoom: 3
    },
    'uk': {
        center: {lat: 54.8, lng: -4.6},
        zoom: 5
    }
};


function initMap() {
    if($('#autocomplete').val() !== '') {
        $('#map').css('opacity', '0');
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: 45.523560, lng: -122.676514}
        });

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: 45.523560, lng: -122.676514}
        });
        marker.addListener('click', toggleBounce);
        $('#map').css('opacity', '1');
    } else {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: countries['us'].zoom,
            center: countries['us'].center,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            streetViewControl: false
        });

        infoWindow = new google.maps.InfoWindow({});

        // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to the default country, and to place type "cities".
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('autocomplete')), {
                types: ['(cities)'],
            });
        places = new google.maps.places.PlacesService(map);
        $('#map').css('opacity', '0');

        autocomplete.addListener('place_changed', onPlaceChanged);
    }
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
$('.results-block').hide();
function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        $('#map').css('opacity', '1');
        $('.results-block').show();
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search();
        $('#map').parent().find('h5').hide();
        $('#map').parent().find('.center-block').hide();
    } else {
        document.getElementById('autocomplete').placeholder = 'Add location';
    }
}

// Search for hotels in the selected city, within the viewport of the map.
function search() {
    var search = {
        bounds: map.getBounds(),
        types: ['lodging']
    };
    clearResults();
    marker = new google.maps.Marker({
        position: map['center'],
    });
    marker.setMap(map);
    descrMap();
}

// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
    var country = document.getElementById('country').value;
    if (country == 'all') {
        autocomplete.setComponentRestrictions([]);
        map.setCenter({lat: 45.525620, lng: -122.676310});
        map.setZoom(15);
        $('#map').css('opacity', '1');
    } else {
        autocomplete.setComponentRestrictions({'country': country});
        map.setCenter(countries[country].center);
        map.setZoom(countries[country].zoom);
    }
    clearResults();
}

function clearResults() {
    return false;
}