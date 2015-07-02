// google maps initialization
function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705786,-74.007672);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
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

function render(itinerary, currentDay) {
  $('#itinerary span').each(function() {
    $(this).remove()
  })
  $('#itinerary button').each(function() {
    $(this).remove()
  })
  var dailyItinerary = itinerary[currentDay]

  for (var category in dailyItinerary) {
    switch (category) {
      case 'hotel':
        $('.panel-body #hotel').append(
          '<span class="title">' + dailyItinerary.hotel + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>'
        )
        break
      case 'restaurants':
        dailyItinerary.restaurants.forEach(function(restaurant) {
          $('.panel-body #restaurants').append(
            '<span class="title">' + restaurant + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>'
          )
        })
        break
      case 'thingstodo':
        dailyItinerary.thingstodo.forEach(function(thing) {
          $('.panel-body #thingstodo').append(
            '<span class="title">' + thing + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>'
          )
        })
        break
    }
  }
}

// hotel, restaurants, thingstodo

$(document).ready(function() {
  initialize_gmaps();

  // variables
  var itinerary = [{}, {}]
  var currentDay = 1

  // add to itinerary
  $('#selection-panel').on('click', 'button', function() {
    // get necessary information
    var $category = $(this).siblings('h4').text().toLowerCase().split(' ').join('');
    var $value = $(this).siblings()[1].value
    var $newLi = '<span class="title">' + $value + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>'

    // add item to itinerary array at index $currentDay
    // update DOM with new item
    switch ($category) {
      case 'hotels':
        itinerary[currentDay].hotel = $value
        if ($('.panel-body #hotel').children().size()) {
          $('.panel-body #hotel span').html($value)
        } else {
          $('.panel-body #hotel').append($newLi)
        }
        break
      case 'restaurants':
        if (!itinerary[currentDay].restaurants) { itinerary[currentDay].restaurants = [] }
        if (itinerary[currentDay].restaurants.indexOf($value) >= 0) break
        itinerary[currentDay].restaurants.push($value)
        $('.panel-body #restaurants').append($newLi)
        break
      case 'thingstodo':
        if (!itinerary[currentDay].thingstodo) { itinerary[currentDay].thingstodo = [] }
        if (itinerary[currentDay].thingstodo.indexOf($value) >= 0) break
        itinerary[currentDay].thingstodo.push($value)
        $('.panel-body #thingstodo').append($newLi)
        break
    }
  })


  // remove from itinerary
  $('#itinerary').on('click', 'button', function() {
    // get necessary information
    var $category = $(this).siblings('h4').text().toLowerCase().split(' ').join('');
    var $value = $(this).siblings()[1].value

    $(this).prev().remove()
    $(this).remove()
  })

  // add/switch a day
  $('#days').on('click', 'button', function() {
    if (this.id === 'add-day') {
      itinerary.push({})
      currentDay++
      console.log(currentDay, itinerary);
      $(this).siblings().removeClass('current-day')

      var $day = '<button class="btn btn-circle day-btn current-day">' + currentDay + '</button>'

      $(this).before($day)
      $('#day-title span').text('Day ' + currentDay)
      render(itinerary, currentDay)

  } else {
      $(this).siblings().removeClass('current-day')
      $(this).addClass('current-day')

      var $current = $(this).html()
      $('#day-title span').text('Day ' + $current)
    }
  })

  // remove a day
  $('#remove-day').on('click', function() {
    var $num = $('#day-title span').text().match(/\d+/)[0]
    var $newCurrent
    $('#days button').each(function() {
      if ($(this).html() === $num.toString()) {
        $newCurrent = $(this).prev().length ? $(this).prev() : $(this).next()
        if ($newCurrent.html() === '+') {
          console.log('no days left');
          $(this).remove()
          $('#day-title span').text('Add a day!')
          days = 0
        } else {
          $newCurrent.addClass('current-day')
          $(this).remove()
          days--
        }
      }
    })
    if (days !== 0) {
      $num = $newCurrent.html()
      $('#day-title span').text('Day ' + $num)
    }
  })


});
