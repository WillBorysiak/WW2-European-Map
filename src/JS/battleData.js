// Battle Data

// Imports

import data from './battleData.json';

// Data Processing

export const battleData = function () {
	let rawData = JSON.parse(data);
	let battlesArray = rawData['WW2 Battles'];

	return battlesArray;
};
