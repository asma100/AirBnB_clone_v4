$(document).ready(function() {
  // Variable to store selected amenity IDs
  var selectedAmenities = {};

  // Listen for checkbox changes
  $('.amenities input[type="checkbox"]').change(function() {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      // Add amenity ID and name to the dictionary if checked
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Remove amenity ID from the dictionary if unchecked
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag with the list of selected amenity names
    var selectedNames = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text('Amenities (' + selectedNames + ')');
  });
});
