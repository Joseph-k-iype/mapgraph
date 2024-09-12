import * as L from 'leaflet';

declare module 'leaflet' {
  function curve(
    path: [string, L.LatLngExpression, ...L.LatLngExpression[]][],
    options?: L.PolylineOptions
  ): L.Polyline;
}
