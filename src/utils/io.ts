import readline from "./readline";

// Handles all reading from and writing to console

async function gridSize() {
	const input = await readline.read("What size should the grid be? ");
	readline.pause();

	const size = input.split(", ").map(Number);
	const width = size[0];
	const height = size[1];

	return { width, height };
}

async function generationZero(numLines: number): Promise<string[]> {
	let genZero: string[] = [];

	for (let i = 0; i < numLines; i++) {
		const input = await readline.read(
			`What values should line ${i + 1} have? `
		);

		genZero.push(input);
	}

	readline.pause();

	return genZero;
}

async function coordinatesAndGenCount() {
	const inputRaw = await readline.read(
		"Please provide cell coordinates and generation count "
	);

	const input = inputRaw.split(", ");

	const x = Number(input[0]);
	const y = Number(input[1]);
	const coordinates = { x, y };
	const genCount = Number(input[2]);

	readline.close();

	return { coordinates, genCount };
}

function result(rounds: any) {
	console.log(`Rounds needed: ${rounds}`);
}

export default {
	read: {
		gridSize,
		generationZero,
		coordinatesAndGenCount,
	},

	write: {
		result,
	},
};
