const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.mydb("name");
    const coll = db.collection("users");

    // find code goes here
    const cursor = coll.find({ hasRings: true });

    // iterate code goes here
    await cursor.forEach(console.log);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
