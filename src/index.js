const express = require('express');
const fs = require('fs');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./router');

const Vendas = require('./database/models/Vendas');

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

app.get('/vendas', async (req,res) => {
    const newDate = new Date();
    const minhasVenda = await Vendas.update({
        nome_produto:"Iphone"
    },{
        where:{
            nome_produto: 'celular'
        }
    }
    )   
    res.json(minhasVenda)
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log("server is running")
})


