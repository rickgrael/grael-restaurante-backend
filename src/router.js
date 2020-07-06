const express = require('express');
const router = express.Router();

const fileControllers = require('./controllers/fileControllers');
const Compras = require('./database/models/Compras');
const Vendas = require('./database/models/Vendas');

router.get('/api/compras', async (req,res)=>{
    const compras = await Compras.findAll();
    res.json(compras);
})

router.get('/api/vendas', async (req,res)=>{
    const vendas = await Vendas.findAll();
    res.json(vendas);
})

router.post('/api/compras/new/NFe',fileControllers.getXmlFile);

router.post('/api/compras/new/NFCe',fileControllers.getHtmlFile);

router.post('/api/vendas/new/NFCe',fileControllers.getHtmlFile);

router.post('/api/vendas/new/NFe',fileControllers.getXmlFile);



module.exports = router;