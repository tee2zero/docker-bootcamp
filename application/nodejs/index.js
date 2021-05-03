var express = require("express");
var app = express();
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017`;

console.log(url);

// app.get("/", (req, resp) => {
//     MongoClient.connect(
//         url,
//         (err, client) => {
//             if (err) throw err;
//             console.log("Database connected!");

//             const db = client.db("shoppers");
//             db.collection("products")
//                 .find()
//                 .toArray((err, result) => {
//                     if (err) throw err;
//                     resp.send(result);
//                 });
//         }
//     );
// });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/api/products", (req, resp) => {
    MongoClient.connect(
        url,
        (err, client) => {
            if (err) throw err;
            console.log("Database connected!");

            const db = client.db("shoppers");
            db.collection("products")
                .find()
                .toArray((err, result) => {
                    if (err) throw err;
                    resp.status(200).send(result);
                    client.close();
                });
        }
    );
});

app.listen(8000, () => {
    console.log("Server listening on port 8000");
});