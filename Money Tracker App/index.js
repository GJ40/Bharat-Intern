
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect(`mongodb://localhost:27017/MoneyList`);
const db = mongoose.connection;
db.on('error', () => console.log("Error while connecting to Database."));
db.once('open', () => console.log(`connected to database.`));


app.post("/add", (req, res) => {
    var category_select = req.body.category_select;
    var amount_input = req.body.amount_input;
    var info = req.body.info;
    var date_input = req.body.date_input;

    var data = {
        "category": category_select,
        "amount": amount_input,
        "info": info,
        "date": date_input
    }
    db.collection('userRecords').insertOne(data, (error, collection) => {
        if(error){
            throw error;
        }
        console.log('record inserted successfully.');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('index.html');
});


app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/.`);
});






















