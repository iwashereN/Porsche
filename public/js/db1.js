const {MongoClient} = require("mongodb")

let dbConnection 
module.exports = {
    connectToDb: (cb)=>{
        MongoClient.connect("mongodb+srv://clown:SE123@cluster1.llyk9cg.mongodb.net/Porsche")
        .then((client)=>{
            dbConnection = client.db()
            console.log("tmm")
            return cb()
        })
        .catch(err=>{
            console.log("nope")
            return cb(err)
        })
    },
    getDbConn: ()=> dbConnection
}