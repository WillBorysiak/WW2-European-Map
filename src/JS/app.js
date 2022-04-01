'use strict';

// Imports

import '../SCSS/main.scss';
import * as qS from './querySelectors.js';
import jpg from '../images/ww2.jpg';

class App {
	map;
	constructor() {
		this.loadMap();
		this.showInfoView();
		this.hideInfoView();
	}

	loadMap() {
		const latitude = 47;
		const longitude = 13;
		const coords = [latitude, longitude];
		const map = L.map('map').setView(coords, 4);

		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		map.on('click', function (e) {
			console.log(e.latlng.lat);
			console.log(e.latlng.lng);
		});

		// Battle of the Atlantic
		L.marker([51.120749121123474, -21.14596820310109]).addTo(map).bindPopup('Battle of the Atlantic');
		// Battle of Britain
		L.marker([51.45248705295193, -0.1490947363599138]).addTo(map).bindPopup('Battle of the Atlantic');
		// Battle of Stalingrad
		L.marker([48.71055093887703, 44.508198979739426]).addTo(map).bindPopup('Battle of Stalingrad');
		// Battle of Kursk
		L.marker([51.73804587385561, 36.17604894388018]).addTo(map).bindPopup('Battle of Kursk');
		// D-Day
		L.marker([49.35731764349393, -0.8457992109479218]).addTo(map).bindPopup('D-Day');
		// Battle of the Bulge
		L.marker([50.00271711751032, 5.717856776770534]).addTo(map).bindPopup('Battle of the Bulge');
		// Battle of Berlin
		L.marker([52.51820049405036, 13.399067612324352]).addTo(map).bindPopup('Battle of Berlin');
	}

	showInfoView() {
		console.log();
		qS.battleItem.addEventListener('mouseover', function (e) {
			qS.detailsContainer.classList.remove('details-container-hide');
			qS.detailsContainer.classList.add('details-container-show');
			// console.log(e.target);
		});
	}
	hideInfoView() {
		qS.battleItem.addEventListener('mouseleave', function () {
			qS.detailsContainer.classList.remove('details-container-show');
			qS.detailsContainer.classList.add('details-container-hide');
		});
	}
}
console.log(jpg);

const app = new App();
