// App Functions

// Imports
import * as qS from './querySelectors.js';

// Sidebar Toggle

export function battleToggle() {
	if (qS.sidebarDiv.classList.contains('sidebar') && qS.mapDiv.classList.contains('warMap')) {
		qS.sidebarDiv.classList.toggle('sidebar-battle');
		qS.mapDiv.classList.toggle('warMap-battle');
	}
}

// Red Marker Variable

export let redIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
