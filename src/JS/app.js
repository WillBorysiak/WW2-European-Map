'use strict';

// Imports

import '../SCSS/main.scss';
import * as qS from './querySelectors.js';
import { battleData } from './battleData.js';

class App {
	map;
	constructor() {
		this.renderMap();
		this.renderImages();
		this.showInfoView();
		this.hideInfoView();
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

	renderImages() {
		qS.sidebarDiv.style.backgroundImage = `url(${planeImage})`;
		qS.battleImage.style.backgroundImage = `url(${ww2})`;
	}

	showInfoView() {
		qS.battleItem.addEventListener('mouseover', function (e) {
			qS.detailsContainer.classList.remove('details-container-hide');
			qS.detailsContainer.classList.add('details-container-show');
			qS.battleImage.classList.add('battle-image-blur');
		});
	}
	hideInfoView() {
		qS.battleItem.addEventListener('mouseleave', function (e) {
			qS.detailsContainer.classList.remove('details-container-show');
			qS.detailsContainer.classList.add('details-container-hide');
			qS.battleImage.classList.remove('battle-image-blur');
		});
	}
}

const app = new App();

// Image Imports
import planeImage from '../images/ww2Plane.jpg';
import ww2 from '../images/ww2.jpg';

// Marker Imports
import { redIcon } from './appUtility';
