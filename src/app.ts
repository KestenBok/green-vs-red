import IO from "./utils/io";
import Game from "./models/game";
import PlayField from "./models/playField";
import errorHandler from "./utils/errorHandler";

(async function main() {
	// Read all input from the console

	try {
		const { width, height } = await IO.read.gridSize();
		const gridGenZero = await IO.read.generationZero(height);
		const { coordinates, genCount } = await IO.read.coordinatesAndGenCount();

		// Create and populate the playing field
		const playField = new PlayField(width, height);
		playField.populate(gridGenZero);

		//Construct and start the game
		const game = new Game(playField, coordinates, genCount);
		const result = game.play();

		// Print the result on the console
		IO.write.result(result);
	} catch (error) {
		errorHandler(error);
	}
})();
