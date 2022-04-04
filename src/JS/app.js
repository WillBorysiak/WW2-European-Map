'use strict';

// Imports

import '../SCSS/main.scss';
import '../CSS/backgroundImages.css';
import * as qS from './querySelectors.js';
import { battleData } from './battleData.js';

class App {
	map;
	constructor() {
		this.renderMap();
		this.renderBattles();
	}

	renderMap() {
		// Map
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

		// Markers
		battleData().forEach(battle => {
			L.marker(battle.coords, { icon: redIcon, title: battle.id }).addTo(map).bindPopup(battle.name);
		});
	}

	// Render Battles
	renderBattles() {
		battleData().forEach(battle => {
			const li = document.createElement('li');
			li.classList.add('battle');
			li.id = battle.id;
			li.innerHTML = `
			<div id="${battle.img_id}" class="battle-image"></div>
						<h2 class="battle-title">${battle.name}</h2>
						<div class="details-container">
							<div class="battle-details">
								<span class="battle-info">Date</span>
								<span class="battle-value">${battle.date}</span>
							</div>
							<div class="battle-details">
							<span class="battle-info">Factions</span>
							<div class="faction-container">
								<span class="faction-flag">🏳️‍🌈</span>
								<span class="faction-flag">🏳️‍🌈</span>
							</div>
							<div class="battle-details">
							<span class="battle-icon">Manpower</span>
							<div class="faction-container">
								<span class="faction-manpower">Manpower</span>
								<span class="faction-manpower">Manpower</span>
							</div>
						</div>
					</div>
			`;
			// Toggle Data
			li.addEventListener('click', function (e) {
				const details = li.querySelector('.details-container');
				// Reset other battles
				document.querySelectorAll('.details-container-show').forEach(item => {
					item.classList.remove('details-container-show');
				});
				details.classList.add('details-container-show');
			});
			// Insert Li to DOM
			qS.battleContainer.appendChild(li);
		});
	}
}

const app = new App();

// Marker Imports
import { redIcon } from './appUtility';
