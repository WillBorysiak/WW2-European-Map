'use strict';

import '../css/images.css';
import '../sass/main.scss';
import { blueIcon, redIcon } from './appUtility';
import { renderFlags, resetBattles, resetImages } from './appUtility.js';
import { battleData } from './battleData.js';
import * as qS from './querySelectors.js';

class App {
	map;

	constructor() {
		this.renderMap();
		this.renderBattles();
		qS.sidebar.addEventListener('click', this.battleClick.bind(this));
		qS.map.addEventListener('click', this.markerClick.bind(this));
	}

	renderMap() {
		if (this.map) {
			map.invalidateSize();
		}

		const mapElement = document.getElementById('map');
		this.map = L.map(mapElement, { tap: false }).setView([47, 13], 4);

		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.map);

		// responsive
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

		// markers
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
	}

	renderBattles() {
		// create battles
		battleData().forEach(battle => {
			const li = document.createElement('li');
			li.classList.add('battle');
			li.id = battle.id;

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

			li.addEventListener('click', function (e) {
				const details = li.querySelector('.details-container');
				const image = li.querySelector('.battle-image');
				const clickedBattle = e.target.closest('article');

				resetBattles();
				resetImages();

				if (clickedBattle === null) {
					details.classList.add('details-container-show');
					image.classList.add('battle-image-blur');
				}
			});

			qS.battleContainer.appendChild(li);

			renderFlags(battle.allied_forces, 'allies', battle.id);
			renderFlags(battle.axis_forces, 'axis', battle.id);
		});
	}

	battleClick(e) {
		if (e.target.className === 'battle-container') return;

		// click closed battle
		if (e.target.className === 'battle-image battle-image-blur' || e.target.className === 'battle-title') {
			const eventID = e.target.closest('li').id;
			const findCoords = battleData().find(battle => battle.id === eventID);
			const mapCoords = findCoords.coords;

			// moves map
			this.map.flyTo(mapCoords, 9);

			const battleLi = document.getElementById(eventID);

			battleLi.scrollIntoView();

			// open map marker
			for (const object in this.map._layers) {
				const marker = this.map._layers[object];
				if (marker.options.title === eventID) {
					marker.openPopup();
				}
			}
		}

		// clicked open battle
		else {
			this.map.flyTo([47, 13], 4);
			this.map.closePopup();
		}
	}

	markerClick(e) {
		// missed click
		if (
			e.target.id === 'map' ||
			e.target.className === 'leaflet-popup-content' ||
			e.target.className === 'leaflet-popup-content-wrapper'
		)
			return;

		// Check for open battles
		const openBattle = document.querySelectorAll('.details-container-show');

		// closed marker click
		if (openBattle.length === 0) {
			const eventID = e.target.title;
			// move map to battle
			const findCoords = battleData().find(battle => battle.id === eventID);
			const mapCoords = findCoords.coords;
			this.map.flyTo(mapCoords, 9);
			// Move sidebar to battle
			const battleLi = document.getElementById(eventID);
			battleLi.scrollIntoView();

			// load battle data
			const eventBattle = document.getElementById(eventID);
			const battleDetails = eventBattle.querySelector('.details-container');
			battleDetails.classList.add('details-container-show');

			document.getElementById(`${eventID}-img`).classList.add('battle-image-blur');
		}

		// open marker click
		if (openBattle.length === 1) {
			resetBattles();
			resetImages();

			this.map.closePopup();
			this.map.flyTo([47, 13], 4);
		}
	}
}

const app = new App();
