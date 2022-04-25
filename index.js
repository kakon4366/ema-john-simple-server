const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("The Ema john Server is running");
});

app.listen(port, () => {
	console.log(`The server running port is: ${port}`);
});
