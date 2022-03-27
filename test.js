'use strict';

// Imports
import '../SCSS/main.scss';

class App {
	// Class Variables
	#map;
	#mapEvent;
	tempMarker = {};

	constructor() {
		// Load Map
		this._getPosition();
	}

	_getPosition() {
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
				console.log('Error: Could not get your location.');
			});
	}
	_loadMap() {
		// Set Coords
		const latitude = 52.92019427311748;
		const longitude = -1.4760420232184026;
		const coords = [latitude, longitude];
		// Load Map
		this.#map = L.map('map').setView(coords, 12);
		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {}).addTo(this.#map);
	}

	// Methods

	// UI Methods

	_temporaryMarker(coords) {
		if (this.tempMarker != {}) {
			this.#map.removeLayer(this.tempMarker);
		}
		if ((this.tempMarker = {})) {
			this.tempMarker = L.marker(coords, { opacity: 0.5 }).addTo(this.#map);
		}
	}

	_deleteTempMarker() {
		if (this.tempMarker != {}) {
			this.#map.removeLayer(this.tempMarker);
		}
	}
}

const app = new App();

console.log(app);
