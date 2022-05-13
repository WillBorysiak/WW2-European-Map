'use strict';

// Imports

import '../sass/main.scss';
import '../css/images.css';
import * as qS from './querySelectors.js';
import { battleData } from './battleData.js';
import { renderFlags, resetBattles, resetImages } from './appUtility.js';

class App {
	map;
	// markerArray = [];

	constructor() {
		this.renderMap();
		this.renderBattles();
		qS.sidebar.addEventListener('click', this.battleClick.bind(this));
		qS.map.addEventListener('click', this.markerClick.bind(this));
	}

	// Render Map Method
	renderMap() {
		this.map = L.map('map', { tap: false }).setView([47, 13], 4);

		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.map);

		// Responsive map view
		if (window.innerWidth < 1025) {
			this.map.setView([57, 15], 4);
		}
		if (window.innerWidth < 550 && window.innerWidth > 451) {
			this.map.setView([50, 10], 4);
		}
		if (window.innerWidth < 450 && window.innerWidth > 401) {
			this.map.setView([50, 7], 4);
		}
		if (window.innerWidth < 400) {
			this.map.setView([50, 8], 4);
		}

		// Markers
		battleData().forEach(battle => {
			if (battle.type === 'invasion') {
				L.marker(battle.coords, { icon: blueIcon, title: battle.id })
					.addTo(this.map)
					.bindPopup(battle.name, { closeButton: false, closeOnClick: false });
			}
			if (battle.type === 'battle') {
				L.marker(battle.coords, { icon: redIcon, title: battle.id })
					.addTo(this.map)
					.bindPopup(battle.name, { closeButton: false, closeOnClick: false });
			}
		});

		/* *DEV TOOLS*

		// Marker Array
		// for (const object in this.map._layers) {
		// 	const marker = this.map._layers[object];
		// 	this.markerArray.push(marker);
		// }
		// this.markerArray.shift();
		// console.log(this.markerArray);

		// Logs Map Click 
		// this.map.on('click', function (e) {
		// 	console.log(e.latlng.lat);
		// 	console.log(e.latlng.lng);
		// });
		*/
	}

	// Render Battles Method
	renderBattles() {
		// Creates elements from array
		battleData().forEach(battle => {
			const li = document.createElement('li');
			li.classList.add('battle');
			li.id = battle.id;

			// Inserted HTML
			li.innerHTML = `
			<div id="${battle.img_id}" class="battle-image"></div>
			<h2 class="battle-title">${battle.name}</h2>
			<article class="details-container">
					<div id="date" class="battle-details">
							<span class="battle-info details-title">Date</span>
							<span class="battle-value battle-date">${battle.date}</span>
					</div>
					<div id="factions" class="battle-details">
							<span class="battle-info details-title">Factions</span>
							<div class="faction-container">
									<span id="allies-${battle.id}" class="faction-flag"></span>
									<span id="axis-${battle.id}" class="faction-flag"></span>
							</div>
					</div>
					<div id="casualties" class="battle-details">
							<span class="battle-icon details-title">Casualties</span>
							<div class="faction-container">
									<span class="faction-casualties">${battle.casualties.allies}</span>
									<span class="faction-casualties">${battle.casualties.axis}</span>
							</div>
					</div>
			</article>
			`;

			// Toggle data
			li.addEventListener('click', function (e) {
				// Variables
				const details = li.querySelector('.details-container');
				const image = li.querySelector('.battle-image');
				const clickedBattle = e.target.closest('article');
				// Reset battles and images
				resetBattles();
				resetImages();
				// Show current battle
				if (clickedBattle === null) {
					details.classList.add('details-container-show');
					image.classList.add('battle-image-blur');
				}
			});

			// Insert Li to DOM
			qS.battleContainer.appendChild(li);

			// Render flags
			renderFlags(battle.allied_forces, 'allies', battle.id);
			renderFlags(battle.axis_forces, 'axis', battle.id);
		});
	}

	// Battle Click Method
	battleClick(e) {
		// Missed click
		if (e.target.className === 'battle-container') return;

		// Clicked closed battle
		if (e.target.className === 'battle-image battle-image-blur' || e.target.className === 'battle-title') {
			// Variables
			const eventID = e.target.closest('li').id;
			const findCoords = battleData().find(battle => battle.id === eventID);
			const mapCoords = findCoords.coords;
			// Moves map
			this.map.flyTo(mapCoords, 9);
			// Move sidebar to battle
			const battleLi = document.getElementById(eventID);
			battleLi.scrollIntoView();
			// Lock scrolling (REMOVED FOR iOS SAFARI 'BUG')
			// qS.sidebar.classList.add('locked');
			// Open map marker
			for (const object in this.map._layers) {
				const marker = this.map._layers[object];
				if (marker.options.title === eventID) {
					marker.openPopup();
				}
			}
		}

		// Clicked open battle
		else {
			this.map.flyTo([47, 13], 4);
			this.map.closePopup();
			qS.sidebar.classList.remove('locked');
		}
	}

	// Marker Click Method
	markerClick(e) {
		// Missed click
		if (
			e.target.id === 'map' ||
			e.target.className === 'leaflet-popup-content' ||
			e.target.className === 'leaflet-popup-content-wrapper'
		)
			return;

		// Check for open battles
		const openBattle = document.querySelectorAll('.details-container-show');

		// Closed Marker Click
		if (openBattle.length === 0) {
			// Get event ID
			const eventID = e.target.title;
			// Move map to event battle
			const findCoords = battleData().find(battle => battle.id === eventID);
			const mapCoords = findCoords.coords;
			this.map.flyTo(mapCoords, 9);
			// Move sidebar to battle
			const battleLi = document.getElementById(eventID);
			battleLi.scrollIntoView();
			// Lock scrolling (REMOVED FOR iOS SAFARI 'BUG')
			// qS.sidebar.classList.add('locked');
			// Load battle data
			const eventBattle = document.getElementById(eventID);
			const battleDetails = eventBattle.querySelector('.details-container');
			battleDetails.classList.add('details-container-show');
			// Blur Image
			document.getElementById(`${eventID}-img`).classList.add('battle-image-blur');
		}

		// Open Marker Click
		if (openBattle.length === 1) {
			// Resets
			resetBattles();
			resetImages();
			// Map Resets
			this.map.closePopup();
			this.map.flyTo([47, 13], 4);
			// Remove scroll lock (REMOVED FOR iOS SAFARI 'BUG')
			// qS.sidebar.classList.remove('locked');
		}
	}
}

const app = new App();

// Marker Import
import { redIcon } from './appUtility';
import { blueIcon } from './appUtility';
