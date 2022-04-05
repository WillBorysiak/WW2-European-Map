'use strict';

// Imports

import '../SCSS/main.scss';
import '../CSS/images.css';
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
		const map = L.map('map').setView([47, 13], 4);

		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		// map.on('click', function (e) {
		// 	console.log(e.latlng.lat);
		// 	console.log(e.latlng.lng);
		// });

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

			// Inserted HTML
			li.innerHTML = `
			<div id="${battle.img_id}" class="battle-image"></div>
			<h2 class="battle-title">${battle.name}</h2>
			<article class="details-container">
					<div class="battle-details">
							<span class="battle-info">Date</span>
							<span class="battle-value">${battle.date}</span>
					</div>
					<div class="battle-details">
							<span class="battle-info">Factions</span>
							<div class="faction-container">
									<span id="allied-flags" class="faction-flag">Faction</span>
									<span class="faction-flag">Faction</span>
							</div>
					</div>
					<div class="battle-details">
							<span class="battle-icon">Manpower</span>
							<div class="faction-container">
									<span class="faction-manpower">Manpower</span>
									<span class="faction-manpower">Manpower</span>
							</div>
					</div>
			</article>
			`;

			// Toggle Data
			li.addEventListener('click', function (e) {
				// Variables
				const details = li.querySelector('.details-container');
				const image = li.querySelector('.battle-image');
				const clickedBattle = e.target.closest('article');
				// Reset data
				document.querySelectorAll('.details-container-show').forEach(item => {
					item.classList.remove('details-container-show');
				});
				// Reset images
				document.querySelectorAll('.battle-image-blur').forEach(item => {
					item.classList.remove('battle-image-blur');
				});
				// Show current battle
				if (clickedBattle === null) {
					details.classList.add('details-container-show');
					image.classList.add('battle-image-blur');
				}
			});

			// Insert Li to DOM
			qS.battleContainer.appendChild(li);
		});

		// Country array
		let testArray = battleData()[0].allied_forces;
		console.log(testArray);
		// Target location
		let alliedFlags = document.getElementById('allied-flags');
		// Create HTML elements
		testArray.forEach(country => {
			let img = document.createElement('img');
			img.className = country;
			alliedFlags.appendChild(img);
		});
	}
}

const app = new App();

// Marker Imports
import { redIcon } from './appUtility';

/* 

Function Tests

*/

// battleData().forEach(battle => {
// 	let factions = battle.allied_forces;
// 	factions.forEach(faction => {
// 		let html = `
// 		<div class="${faction}"></div>
// 		`;
// 		console.log(html);
// 	});
// });
