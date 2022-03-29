const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => {
	res.send('hi');
});

export const keepAlive = () => {
	app.listen(port, () => {
		console.log(`listening on port ${port}`);
	});
}