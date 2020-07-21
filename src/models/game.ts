import PlayField from "./playField";
import validator from "../utils/validator";

export default class Game {
	private _playField: PlayField;
	private _generationCount: number;
	private _chosenCoordinates: { x: number; y: number }; // Cell that is being tracked
	private _counter = 0;

	constructor(
		playField: PlayField,
		coordinates: { x: number; y: number },
		genCount: number
	) {
		this._playField = playField;
		this._generationCount = genCount;

		if (!validator.validateCoordinates(coordinates, this.grid)) {
			throw new Error("Coordinates are invalid");
		}

		this._chosenCoordinates = coordinates;
	}

	private get grid() {
		return this._playField.grid;
	}

	// Starts and cycles through the entire game
	public play() {
		for (let i = 0; i < this._generationCount; i++) {
			this.playRound();
		}

		console.log(this._counter);
		return this._counter;
	}

	// Plays a single game round
	private playRound() {
		const nextGen = JSON.parse(JSON.stringify(this.grid)); // Creates a deep copy of the grid, instead of a reference

		for (let row = 0; row < nextGen.length; row++) {
			// Cycles all rows
			for (let col = 0; col < nextGen[row].length; col++) {
				// Cycles all colums, for each row
				const cell = nextGen[row][col];
				const coordinates = { row, col };

				const neighbours = this.getNeighbours(coordinates); // Gets a count of all green neighbours

				nextGen[row][col] = this.changeCellValue(cell, neighbours); // Changes cell value, if necessary
			}
		}

		this.grid.splice(0, this.grid.length, ...nextGen); // Updates original grid to next generation

		const { x, y } = this._chosenCoordinates;

		if (this.grid[x][y] === 1) {
			this._counter++; // Tracks number of rounds the cell is green
		}
	}

	// Gets all 8 surrounding cells and sums them
	private getNeighbours(coordinates: { row: number; col: number }) {
		const { row, col } = coordinates;

		let greenNeighbours = 0;

		const rowLimit = this.grid.length - 1;
		const colLimit = this.grid[0].length - 1;

		for (let x = Math.max(0, row - 1); x <= Math.min(row + 1, rowLimit); x++) {
			for (
				let y = Math.max(0, col - 1);
				y <= Math.min(col + 1, colLimit);
				y++
			) {
				if (x !== row || y !== col) {
					greenNeighbours += this.grid[x][y];
				}
			}
		}

		return greenNeighbours;
	}

	private changeCellValue(cell: number, greenNeighbours: number) {
		if (cell === 0) {
			// Red cell
			if ([3, 6].includes(greenNeighbours)) {
				// Turns green if surrounded by 3 or 6
				return 1;
			} else {
				return 0;
			}
		} else {
			// Green cell
			if ([2, 3, 6].includes(greenNeighbours)) {
				return 1;
			} else {
				// Turns red, if surrounded by 0, 1, 4, 5, 7, 8
				return 0;
			}
		}
	}
}
