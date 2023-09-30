const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();


//============ CONNECTING DATA BASE ============//
mongoose.connect("mongodb://127.0.0.1:27017/ReduxProject_1",{
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//============= SECURING REQUESTS BY CORS  =========//

app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST'],
    credentials:true
}));

//============= SETTING PATH FOR USERSIDE =========//
const userRoutes = require('./Routes/userRoutes');
app.use('/',userRoutes)


//============= SETTING PATH FOR ADMINSIDE =========//

const adminRoutes = require('./Routes/adminRouts');
app.use('/admin',adminRoutes)


//============= SERVER =========//

app.listen(3001,()=>{
    console.log("Server running in port 3001");
})


