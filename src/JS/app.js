'use strict';

// Imports

import '../SCSS/main.scss';
import * as qS from './querySelectors.js';
import { battlesArray } from './battlesArray';
import { redIcon } from './appUtility';

class App {
	map;
	constructor() {
		this.renderMap();
		// this.showInfoView();
		// this.hideInfoView();
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
		battlesArray.forEach(battle => {
			L.marker(battle.coords, { icon: redIcon }).addTo(map).bindPopup(battle.battleName);
		});
	}

	renderBattles() {
		let html = `
		<li class="battle">
					<div class="battle-image"></div>
					<h2 class="battle-title">Title of the Battle</h2>
					<div class="details-container details-container-hide">
						<div class="battle-details">
							<span class="battle-info">Location:</span>
							<span class="battle-value">*Exact Location - Country*</span>
						</div>
						<div class="battle-details">
							<span class="battle-info">Factions</span>
							<div class="faction-container">
								<span class="faction-flag">🏳️‍🌈</span>
								<span class="faction-flag">km</span>
							</div>
						</div>
						<div class="battle-details">
							<span class="battle-icon">Manpower</span>
							<div class="faction-container">
								<span class="faction-manpower">Manpower</span>
								<span class="faction-manpower">Manpower</span>
							</div>
						</div>
					</div>
				</li>
				<li class="battle">
					<div class="battle-image"></div>
					<h2 class="battle-title">Title of the Battle</h2>
					<div class="details-container details-container-hide">
						<div class="battle-details">
							<span class="battle-info">Location:</span>
							<span class="battle-value">*Exact Location - Country*</span>
						</div>
						<div class="battle-details">
							<span class="battle-info">Factions</span>
							<div class="faction-container">
								<span class="faction-flag">🏳️‍🌈</span>
								<span class="faction-flag">km</span>
							</div>
						</div>
						<div class="battle-details">
							<span class="battle-icon">Manpower</span>
							<div class="faction-container">
								<span class="faction-manpower">Manpower</span>
								<span class="faction-manpower">Manpower</span>
							</div>
						</div>
					</div>
				</li>
		`;
	}

	showInfoView() {
		console.log();
		qS.battleItem.addEventListener('mouseover', function (e) {
			qS.detailsContainer.classList.remove('details-container-hide');
			qS.detailsContainer.classList.add('details-container-show');
		});
	}
	hideInfoView() {
		qS.battleItem.addEventListener('mouseleave', function (e) {
			qS.detailsContainer.classList.remove('details-container-show');
			qS.detailsContainer.classList.add('details-container-hide');
		});
	}
}

const app = new App();
