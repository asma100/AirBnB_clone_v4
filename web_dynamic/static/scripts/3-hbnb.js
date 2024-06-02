$(document).ready(function() {
  $.getJSON("http://0.0.0.0:5001/api/v1/status/", function(data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available"); // Add 'available' class if OK
    } else {
      $("#api_status").removeClass("available"); // Remove 'available' class otherwise
    }
  });

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({}), // Empty dictionary in the body
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        var place = data[i];
        var article = $('<article class="article">');

        article.append($('<h2>' + place.name + '</h2>'));
        article.append($('<p class="city">' + place.city.name + ', ' + place.state.name + '</p>'));
        article.append($('<p class="user">' + place.user.first_name + ' ' + place.user.last_name + '</p>')); // Remove Owner tag
        article.append($('<div class="description">' + place.description + '</div>'));

        $('.places').append(article);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("Error fetching places:", textStatus, errorThrown);
    }
  });
});
