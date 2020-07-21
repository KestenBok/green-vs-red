import readline from "readline";

// Abstraction over the internal readline module
// Enables use of async/await over callsbacks

// Accept input and write output to the console
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function read(question: string): Promise<string> {
	return new Promise((resolve, reject) => {
		rl.question(question, (answer) => {
			if (!answer) {
				reject(answer);
			}

			resolve(answer);
		});
	});
}

// Input stream needs to be paused, while waiting for different console inputs
// Directly closing the stream kills the readline interface and incoming input
// is no longer accepted from the console

function pause() {
	return rl.pause();
}

function close() {
	return rl.close();
}

export default {
	read,
	pause,
	close,
};
