const mymap = L.map('mapid').setView([51.6, 6.2], 8)
const generalToken = 'pk.eyJ1IjoicmF6cHVkZGluZyIsImEiOiJja3JmNHlubnk1ZDEyMnJueHIwZmxheWJvIn0.YrzTKf5_oT6x2C8GJku_fQ'
const accessToken = generalToken

const mapStyles = {
	blueprint: 'razpudding/ckrj3u9zj7xzb18q92ferf415',
	standard: 'mapbox/streets-v11',
	outdoors: 'mapbox/outdoors-v11',
	light: 'mapbox/light-v10',
	dark: 'mapbox/dark-v10', 
}

const tileSource =  mapStyles.dark

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: tileSource,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
}).addTo(mymap)

markStreets()
async function markStreets(){
	const res = await fetch('./jsonData_true_0.json')
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
				target="_blank"> ${street.latLng[0]} ,${street.latLng[1]}
			</a>`
		const marker = L.marker([street.latLng[0],street.latLng[1]])
		marker.bindPopup(title)
		markers.addLayer(marker)
	})

	mymap.addLayer(markers)
}
