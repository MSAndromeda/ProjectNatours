/* eslint-disable */

export const displayMap = ( locations ) =>
{
  mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcm9zaW5naCIsImEiOiJjbDk3MzJ2cmQwdXgxM3FxcTJ6d3dzOWFtIn0.QWrseRdc7wi6uq90r_Xb6w';

  const map = new mapboxgl.Map( {
    container: 'map', // container ID
    style: 'mapbox://styles/androsingh/cl97cs0sq00fh14qkrruh0r5f', // style URL
    scrollZoom: false,
    // center: [ -74.5, 40 ], // starting position [lng, lat]
    // zoom: 9, // starting zoom
    // projection: 'globe' // display the map as a 3D globe
  } );

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach( loc =>
  {
    //Andro:H2: Create marker 
    const el = document.createElement( 'div' );
    el.className = 'marker';

    //Andro:H2: Add marker
    new mapboxgl.Marker( {
      element: el,
      anchor: 'bottom'
    } ).setLngLat( loc.coordinates ).addTo( map );

    //Andro:H2: Add Popup
    new mapboxgl.Popup( {
      offset: 30
    } )
      .setLngLat( loc.coordinates )
      .setHTML( `<p>Day ${ loc.day }: ${ loc.description }</p>` )
      .addTo( map );

    //Andro:H2: Extend map bounds to include current Location
    bounds.extend( loc.coordinates );
  } );

  map.fitBounds( bounds, {
    padding: {
      top: 190,
      bottom: 120,
      right: 100,
      left: 100
    }
  } );
}

