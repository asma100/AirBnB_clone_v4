$(document).ready(function () {
  // Check API status and update the UI accordingly
  $.getJSON("http://0.0.0.0:5001/api/v1/status/", function(data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  // Fetch and display places
  function fetchPlaces(amenities = {}) {
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(amenities),
      success: function(data) {
        $('.places').empty(); // Clear existing places
        for (var i = 0; i < data.length; i++) {
          var place = data[i];
          var article = $('<article class="article">');

          article.append($('<h2>' + place.name + '</h2>'));
          article.append($('<p class="city">' + place.city.name + ', ' + place.state.name + '</p>'));
          article.append($('<p class="user">' + place.user.first_name + ' ' + place.user.last_name + '</p>'));
          article.append($('<div class="description">' + place.description + '</div>'));

          $('.places').append(article);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching places:", textStatus, errorThrown);
      }
    });
  }

  // Initial fetch with no filters
  fetchPlaces();

  // Filter places by selected amenities
  $('button').click(function () {
    var amenities = {};
    $('input[type=checkbox]:checked').each(function () {
      amenities[$(this).attr('data-id')] = true;
    });

    fetchPlaces({ amenities: Object.keys(amenities) });
  });
});
