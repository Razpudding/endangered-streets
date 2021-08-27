const myMap = L.map('mapid', {tap: false}).setView([51.6, 6.2], 8)

const Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap)

markStreets()
async function markStreets(){
	const res = await fetch('./jsonData_true_1.json')
	const streets = await res.json()
	console.log(streets[0], streets.length)
	console.log(streets.filter(street => street.note != null))
	const markers = L.markerClusterGroup({
		showCoverageOnHover: false,
	})

	streets.forEach(street => {
		const title = `
			<p>${street.streetName}</p>
			<a href="https://www.google.com/maps/search/${street.latLng[0]},${street.latLng[1]}"
				target="_blank">Open in Google Maps
			</a>`
		const marker = L.marker([street.latLng[0],street.latLng[1]])
		marker.bindPopup(title)
		markers.addLayer(marker)
	})
	myMap.addLayer(markers)
}