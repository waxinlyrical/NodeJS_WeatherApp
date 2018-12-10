const request = require( 'request' );
const mapAPIURLRoot = 'https://maps.googleapis.com/maps/api/geocode/json?';
const chinGoogleAPIKey = 'AIzaSyBfvORQdIUMAysaBpc865k82O9z__KUT50';

var geoCodeAddress = ( address ) =>
{
  return new Promise( ( resolve, reject ) => {

    var constructedURLString = mapAPIURLRoot + 'key=' + chinGoogleAPIKey + '&' + 'address=' + encodeURIComponent( address );
    request( {
      url: constructedURLString,
      json: true,
    }, ( error, request, body ) =>{
      if( error ) {
        reject( 'Error connecting to Google servers, please try again later.' );
      }
      else if( body.status === 'ZERO_RESULTS' )
      {
        reject( `No results found for address ${ address }. Please check that the address is valid!` );
      }
      else if( body.status ==='OK' ){
        const result = body.results[0];
        resolve(
          {
            address: result.formatted_address,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
          }
        );
        // console.log( `Formatted Address: ${ result.formatted_address }` );
        // console.log( `Latitude: ${ result.geometry.location.lat }` );
        // console.log( `Longitude: ${ result.geometry.location.lng }` );
      }
      else{
        reject( `Error, status result of: ${ body.status }` );
      }
    });

  }
);


};


geoCodeAddress( '91324' ).then( ( location ) =>{
  console.log( JSON.stringify( location, undefined, 2 ) )
},  ( errorMessage ) => {
  console.log( errorMessage );
}
);
