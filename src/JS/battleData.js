// Battle Data

// Imports

import data from './battleData.json';

// Data Processing

export const battleData = function () {
	const battlesArray = [];
	for (let i in data) {
		battlesArray.push([i, data[i]]);
	}
	let battles = battlesArray[0][1];
	return battles;
};
