import validator from ".././utils/validator";

export default class PlayField {
	private _grid: number[][];
	private _width: number;
	private _height: number;

	constructor(width: number, height: number) {
		this._width = width;
		this._height = height;

		if (!validator.validateGridSize(this._width, this._height)) {
			throw new Error("Grid size is invalid");
		}

		this._grid = Array(this._width).fill(Array(this._height));
	}

	get grid() {
		// Game Class needs access to the grid
		return this._grid;
	}

	// Populates the grid with Generation Zero
	public populate(generation: string[]) {
		if (!validator.validateGeneration(this._width, generation)) {
			throw new Error("Generation is invalid");
		}

		for (let i = 0; i < this._grid.length; i++) {
			this._grid[i] = generation[i].split("").map(Number);
		}
	}
}
