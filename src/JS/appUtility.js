// App Functions

// Render Flags

export const renderFlags = function (array, faction, battle) {
	let id = faction + '-' + battle;
	let flagContainer = document.getElementById(id);
	array.forEach(country => {
		let img = document.createElement('img');
		img.className = 'country-flag ' + country;
		flagContainer.appendChild(img);
	});
};

// Red Marker Variable

export let redIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
