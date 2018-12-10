const request = require( 'request' );

const mapAPIURLRoot = 'https://maps.googleapis.com/maps/api/geocode/json?';
const chinGoogleAPIKey = 'AIzaSyBfvORQdIUMAysaBpc865k82O9z__KUT50';

var geoCodeAddress = ( address, callback ) =>
{
  var constructedURLString = mapAPIURLRoot + 'key=' + chinGoogleAPIKey + '&' + 'address=' + encodeURIComponent( address );
  //console.log( `Constructed URL String: ${constructedURLString}` );

  request( {
    url: constructedURLString,
    json: true,
  }, ( error, request, body ) =>{
    if( error ) {
      callback( 'Error connecting to Google servers, please try again later.' );
    }
    else if( body.status === 'ZERO_RESULTS' )
    {
      callback( `No results found for address ${ address }. Please check that the address is valid!` );
    }
    else if(body.status ==='OK'){
      const result = body.results[0];
      callback( undefined, {
        address: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
      } );
      // console.log( `Formatted Address: ${ result.formatted_address }` );
      // console.log( `Latitude: ${ result.geometry.location.lat }` );
      // console.log( `Longitude: ${ result.geometry.location.lng }` );
    }
    else{
      callback( `Error, status result of: ${body.status}` );
    }
  });

};

module.exports = {
  geoCodeAddress,
}
