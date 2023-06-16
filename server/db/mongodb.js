const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hypersikh:Hypersikh%40123@client-server-dashboard.aoi9swx.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let dbConnection;
module.exports = {
  connectToDb: (fn) => {
    client.connect()
      .then(client => {
        dbConnection = client.db("client-server-dashboard")
        return fn()
      })
      .catch(err => {
        console.log(err)
        return fn(err)
      })
  },
  getDb: () => dbConnection
}