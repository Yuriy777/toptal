(function() {
    var body = document.body;
    var burgerMenu = document.getElementsByClassName('menu-opener')[0];

    burgerMenu.addEventListener('click', function toggleClasses() {
        [body].forEach(function (el) {
            el.classList.toggle('menu-open');
        });
    }, false);
})();

$('#name').focusout(function(){
    $(this).closest('.name-group').find('h1').text($(this).val()).show();
    $(this).hide();
});
$('.name-group').on('click', 'h1', function (){
    $(this).hide();
    $('#name').show().focus();
});

// add skill
$(document).on('click', '.inpsel', function(){
    $(this).hide();
    $('.skills').show();
});

//create skill block click or keypress enter
$('.skill-inp').keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        e.preventDefault();
        addtag();
    }
});
$(document).on('click', '.js-sendskill', function(){
    addtag();
});

//remove skill
$('.skills-block').on('click', '.js-remove', function(){
    $(this).closest('li').remove();
});

function addtag() {
    var text = $('#skills').val();
    if(text !== '') {
        $('#skills').val(''); //clear input
        var item = $("#plhItem").clone();
        $(item).removeAttr('id').find(".skill-item").addClass($('#tags').val()).text(text);
        $('#skills-block').append(item);
        $('.inpsel').show();
        $('.skills').hide();
    }
};



//date block

$('.other-user-info').on('click', '.js_toggle', function(){
    $(this).find('.center-block').hide();
    $(this).addClass('input-block');
    $(this).removeClass('js_toggle');
    if($(this).closest('.block-1').hasClass('textar')) {
        $('.quote-block').hide();
    }
    //clear portfolio and skills in portfolio
    if($(this).closest('.block-1').hasClass('portf')) {
        $(this).closest('.block-1').find('.result-date ul').empty();
        $('.skills-text').empty();
    }
});


$('.input-date').on('click', '.js-close', function(e){
    e.stopPropagation();
    var array = $(this).parent().find('.inline-group');
    var elem = $(this);
    if($(this).closest('.block-1').hasClass('portf')) {
        portfolio.call(elem, array);
    }
    if($(this).closest('.block-1').hasClass('textar')) {
        comment.call(elem, array);
    }
    elem.parent().find('.result-date').show();
    elem.closest('div.block-1').removeClass('input-block').addClass('js_toggle');
});

function portfolio(array) {

    var portfolioSkills = "";
    var counterSkills = 0;

// clean existing skills under portfolio
    $('.skills-text').html('');

    $.each(array, function(i, item) {
        var proj = $(this).find('.proj-n').val();
        var skill = $(this).find('.skill-u').val();

        // in case we already have 3 skills - nope
        if(counterSkills < 3){
            // if we have comma, we need to count it as separate skills
            var pos =  skill.indexOf(',');
            while ( pos != -1 ) {
                counterSkills++;
                pos = skill.indexOf(',', pos+1);
            }
            // if this is last third skill, do not add comma at the end
            var separator = ', ';
            if(counterSkills == 2) separator = '';
            portfolioSkills +=  skill.trim() + separator;
            counterSkills++;
        }

        if (proj !== '' && skill !== '') {
            var li = '<li><strong>' + proj + ',</strong> <span>' + skill + '</span></li>';
            $(this).closest('.block-1').find('.result-date ul').append(li);
        }
    });

// append new skills
    $('.skills-text').append(portfolioSkills);
}



function comment(array) {
    $('.quote-block').show();

    var text = array.find('textarea').val();

    var block = $(this).closest('.block-1');
    block.find('.result-date p').text(text);

    var name = getName();
    block.find('.name-bq').text('- ' + name[0]);
}

function getName() {
    var fullname = $('#name').val();
    var name = fullname.split(' ');
    return name;
}



$('.skills-list').columnize({width:200, columns: 4});









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

//show profile image
function handleFileSelect(evt) {
    var file = evt.target.files;
    var f = file[0];
    if (!f.type.match('image.*')) {
        alert("Image only please....");
    }
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
            if ($('#output').html() !== '') {
                document.getElementById('output').innerHTML = '';
                document.getElementById('path').innerHTML = '';
            }

            document.getElementById('output').insertBefore(span, null);
            $('#path').append(escape(theFile.name));
        };
    })(f);
    reader.readAsDataURL(f);
    $('.overlay').css('display', 'none');
    //hide block with name of img
    setTimeout(function(){
        $('.bl-addimg').hide();
    }, 1000);
}
$('#file').on('change', handleFileSelect);
$(document).on('click', '.p-img', function(){
    $('.add-file').hide();
    $('.bl-addimg').show();
});


