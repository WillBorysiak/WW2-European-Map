// Toggle Data
export const resetBattles = function () {
	document.querySelectorAll('.details-container-show').forEach(item => {
		item.classList.remove('details-container-show');
	});
};

export const resetImages = function () {
	document.querySelectorAll('.battle-image-blur').forEach(item => {
		item.classList.remove('battle-image-blur');
	});
};

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

// BlueMarker Variable
export let blueIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
