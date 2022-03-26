import '../SCSS/main.scss';

export class App {
	#map;
	constructor() {
		this.loadMap();
	}

	loadMap() {
		// Load Map
		this.#map = L.map('map').setView([51.505, -0.09], 12);
		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {}).addTo(this.#map);
	}
}

const app = new App();
