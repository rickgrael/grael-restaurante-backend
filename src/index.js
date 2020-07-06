const express = require('express');
const fs = require('fs');
const session = require('express-session')
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const router = require('./router');


const app = express();

app.use(cors())

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'aposokolm',
    cookie: {
        maxAge: 14400000
    }
}))

app.use(router)


app.post('/teste',async (req,res)=>{
    console.log(req.files)
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log("server is running")
})


