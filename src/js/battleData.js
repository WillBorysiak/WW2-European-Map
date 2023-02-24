import data from './battleData.json';

// Exporting Data
export const battleData = function () {
	let rawData = JSON.parse(data);
	let battlesArray = rawData['WW2 Battles'];

	return battlesArray;
};
