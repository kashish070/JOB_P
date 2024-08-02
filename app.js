const express = require('express')
const app = express() 
const port = 1000 
const web = require('./routes/web')
const connectDB = require('./db/connection')
const session = require("express-session")
const flash = require("express-flash")
var cookieParser = require('cookie-parser')


//token get
app.use(cookieParser())

app.use(session({ 
    secret: 'secret', 
    cookie: { maxAge: 60000}, 
    resave: false, 
    saveUninitialized: false, 
}));
app.use(flash())

const fileUpload = require("express-fileupload")

app.use(fileUpload({useTempFiles:true
}))
//ejs view engine
app.set('view engine','ejs')

//set image nd css
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//router load
app.use('/',web)

connectDB()


app.listen(port, () =>{
    console.log(`server start  localhost:${port}`)
})
