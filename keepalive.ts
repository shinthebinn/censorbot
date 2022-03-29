// import packages and set up constants
const express = require('express');
const app = express();
const port = 3000;

// on a GET request to the root, return a simple string
app.get('/', (req: any, res: any) => {
	res.send('hi');
});

// export server launch function so it can be run in index.ts
export const keepAlive = () => {
	app.listen(port, () => {
		console.log(`listening on port ${port}`);
	});
}