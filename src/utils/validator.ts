function validateCoordinates(
	coordinates: { x: number; y: number },
	grid: number[][]
) {
	const { x, y } = coordinates;
	const width = grid.length;
	const height = grid[0].length;

	return x >= 0 && x <= width && y >= 0 && y <= height;
}

function validateGridSize(width: number, height: number) {
	return width <= height && height < 1000;
}

function validateGeneration(width: number, generation: string[]) {
	let isValid = true;

	generation.forEach((line) => {
		if (line.length !== width) {
			isValid = false;
		}
	});

	return isValid;
}

export default {
	validateCoordinates,
	validateGridSize,
	validateGeneration,
};
