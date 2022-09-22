geoPark = JSON.parse(geoPark);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: geoPark.geometry.coordinates,
zoom: 8
});

new mapboxgl.Marker()
.setLngLat(geoPark.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${geoPark.name}</h3><p>${geoPark.location}</p>`
        )
)
.addTo(map)