const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(`mongodb://localhost:27017/database`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
       } 
    catch (error){
           console.error(error);
           process.exit(1);
       }
}




app.use(express.static(path.join(__dirname, 'public')));

connectDB();

const registrationSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const registration = mongoose.model("registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname +"/pages/index.html");
});

app.post("/registration", async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        const registeredUser = await registration.findOne({email: email});
        if(!registeredUser){
            const registrationData = new registration({
                username,
                email,
                password
            });
            await registrationData.save();
            res.redirect("/success");
        }
        else{
            console.log(`User already registered.`);
            res.redirect("/error");
        }
    }
    catch(error){
        res.redirect("/error");
        console.log(error);
    }
});


app.get("/success", (req, res) => {
    res.sendFile(__dirname +"/pages/success.html");
});
app.get("/error", (req, res) => {
    res.sendFile(__dirname +"/pages/error.html");
});



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/.`);
});















