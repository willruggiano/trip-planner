// google maps initialization
function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705786,-74.007672);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styleArr
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    var map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });

    // draw some locations
    var hotelLocation = [];
    var restaurantLocations = [];
    var thingToDoLocations = [];

    function drawLocation (location, opts) {
        if (typeof opts !== 'object') {
            opts = {}
        }
        opts.position = new google.maps.LatLng(location[0], location[1]);
        opts.map = map;
        var marker = new google.maps.Marker(opts);
    }
    drawLocation(hotelLocation, {
        icon: '/images/lodging_0star.png'
    });
    restaurantLocations.forEach(function (loc) {
        drawLocation(loc, {
            icon: '/images/restaurant.png'
        });
    });
    thingToDoLocations.forEach(function (loc) {
        drawLocation(loc, {
            icon: '/images/star-3.png'
        });
    });
}

var styleArr = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ef8c25"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b6c54c"
            },
            {
                "lightness": 40
            },
            {
                "saturation": -40
            }
        ]
    },
    {}
]

/*
  Select and set the hotel
  Select and add a restaurant
  Select and add a thing to do
  Remove the hotel
  Remove a restaurant
  Remove a thing to do
  Add a day
  Remove a day
  Switch days


*/

$(document).ready(function() {
  initialize_gmaps();

  $('#control-panel').on('click', 'button', function () {
    var category = $(this).siblings("h4").text().toLowerCase().split(' ').join('');
    var value = $(this).siblings()[1].value

    var newLi = '<span class="title">' + value + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>'
    $('.panel-body #' + category).append(newLi)
  })

});
