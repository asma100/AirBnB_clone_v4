$(document).ready(function () {
    const amenities = {};
    const states = {};
    const cities = {};

    $('input[type="checkbox"]').change(function () {
        const dataType = $(this).closest('div').hasClass('amenities') ? 'amenities' : ($(this).closest('div').hasClass('locations') ? 'locations' : '');
        const dataId = $(this).attr('data-id');
        const dataName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            if (dataType === 'amenities') {
                amenities[dataId] = dataName;
            } else if (dataType === 'locations') {
                if ($(this).closest('li').has('ul').length) { // it's a state
                    states[dataId] = dataName;
                } else { // it's a city
                    cities[dataId] = dataName;
                }
            }
        } else {
            if (dataType === 'amenities') {
                delete amenities[dataId];
            } else if (dataType === 'locations') {
                if ($(this).closest('li').has('ul').length) { // it's a state
                    delete states[dataId];
                } else { // it's a city
                    delete cities[dataId];
                }
            }
        }

        const locations = { ...states, ...cities };
        const locationNames = Object.values(locations).join(', ');
        $('div.locations h4').text(locationNames ? locationNames : '&nbsp;');
    });

    $('button').click(function () {
        const data = {
            amenities: Object.keys(amenities),
            states: Object.keys(states),
            cities: Object.keys(cities)
        };

        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (data) {
                $('.places').empty();
                for (let place of data) {
                    const article = $('<article class="article">');
                    article.append($('<h2>').text(place.name));
                    article.append($('<p class="city">').text(place.city.name + ', ' + place.state.name));
                    article.append($('<p class="user">').text(place.user.first_name + ' ' + place.user.last_name));
                    article.append($('<div class="description">').text(place.description));
                    $('.places').append(article);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error fetching places:", textStatus, errorThrown);
            }
        });
    });

    $.getJSON("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });
});
