const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lry7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
async function run() {
	try {
		await client.connect();
		const productCollection = client
			.db("emaJohnProducts")
			.collection("products");

		app.get("/products", async (req, res) => {
			const query = {};
			const cursor = productCollection.find(query);
			const products = await cursor.toArray();
			res.send(products);
		});

		//product count
		app.get("/productCount", async (req, res) => {
			const query = {};
			const cursor = productCollection.find(query);
			const count = await cursor.count();
			res.send({ count });
		});
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("The Ema john Server is running");
});

app.listen(port, () => {
	console.log(`The server running port is: ${port}`);
});
