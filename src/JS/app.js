'use strict';

// Imports

import '../SCSS/main.scss';
import * as qS from './querySelectors.js';
import { battleToggle } from './appFunctions.js';
import jpg from '../SCSS/images/ww2.jpg';

class App {
	constructor() {
		this.loadMap();
		this.battleView();
	}

	loadMap() {
		const latitude = 55;
		const longitude = 17;
		const coords = [latitude, longitude];
		const map = L.map('map').setView(coords, 5);

		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);
	}

	battleView() {
		qS.testBtn.addEventListener('click', battleToggle);
	}
}
console.log(jpg);

const app = new App();
