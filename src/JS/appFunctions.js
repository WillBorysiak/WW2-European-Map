// App Functions

// Imports
import * as qS from './querySelectors.js';

// Sidebar Toggle

export function battleToggle() {
	if (qS.sidebarDiv.classList.contains('sidebar') && qS.mapDiv.classList.contains('euroMap')) {
		qS.sidebarDiv.classList.toggle('sidebar-battle');
	}
}
