import errorList from "../config/errors";

function handle(error: Error) {
	if (errorList.includes(error.message)) {
		console.error(`Error: ${error.message}`);
	} else {
		console.log(
			"I'm not cool enough to have a sensible global error handler, so this will need to do =D"
		);
	}
}

export default handle;
