const express = require('express');
const router = express.Router();

const fileControllers = require('./controllers/fileControllers');
const individualController = require('./controllers/individualController');

const Compras = require('./database/models/Compras');
const Vendas = require('./database/models/Vendas');

router.get('/api/compras', async (req, res) => {
    const compras = await Compras.findAll();
    res.json(compras);
})

router.get('/api/vendas', async (req, res) => {
    const vendas = await Vendas.findAll();
    res.json(vendas);
})

router.post('/api/compras/new/NFe', fileControllers.getXmlFile);

router.post('/api/compras/new/NFCe', fileControllers.getHtmlFile);

router.post('/api/vendas/new/NFCe', fileControllers.getHtmlFile);

router.post('/api/vendas/new/NFe', fileControllers.getXmlFile);

router.post('/api/vendas/new/individual', individualController.individualVenda);

router.post('/api/compras/new/individual', individualController.individualCompra);

router.post('/api/auth', async (req, res) => {
    const {
        user,
        password
    } = req.body;
    console.log(user, password)
    if (user == 'grael' && password == 'restaurante') {
        const token = new Date();
        token.setDate(token.getDate() + 1);
        res.send(token);
    } else {
        res.send("falha")
    }

})

router.post('/editar/venda', async (req, res) => {
    const {
        id,
        nomeProduto: nome_produto,
        quantidade,
        valorUnidade: valor_unitario,
        valorTotal: valor_total,
        dataEmissao: data_emissao
    } = req.body;

    await Vendas.update({
        id,
        nome_produto,
        quantidade,
        valor_unitario,
        valor_total,
        data_emissao
    }, {
        where: {
            id
        }
    })

    res.redirect('http://localhost:3000/entradas')
})

module.exports = router;