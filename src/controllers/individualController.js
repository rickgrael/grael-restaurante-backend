const Compras = require('../database/models/Compras');
const Vendas = require('../database/models/Vendas');

class individualController {
    async individualVenda(req, res) {
        try {
            const {
                produto_nome,
                produto_quantidade,
                produto_preco,
                produto_total,
                produto_data
            } = req.body;

            await Vendas.create({
                data_emissao: produto_data,
                nome_vendedor: "consumidor",
                nome_produto: produto_nome,
                quantidade: Number(produto_quantidade),
                valor_unitario: Number(produto_preco),
                valor_total: Number(produto_total)
            })
            console.log(venda)
            res.send('ok')
        } catch (e) {
            res.send(e)
        }

    }

    async individualCompra(req, res) {
        try {
            const {
                produto_nome,
                produto_quantidade,
                produto_preco,
                produto_total,
                produto_data
            } = req.body;

            await Compras.create({
                data_emissao: produto_data,
                nome_vendedor: "vendedor",
                nome_produto: produto_nome,
                quantidade: Number(produto_quantidade),
                valor_unitario: Number(produto_preco),
                valor_total: Number(produto_total)
            })
            res.send('ok')
        } catch (e) {
            res.send('falha')
        }
    }
}


module.exports = new individualController();