const excelToJson = require('convert-excel-to-json');
const convertExcelToJson = require('convert-excel-to-json');
const fs = require('fs');
const {
    Op
} = require('sequelize');

const Vendas = require('../database/models/Vendas');

class XlsController {
    async transform(req, res) {
        const result = excelToJson({
            source: req.files.xlsx.data
        })
        const values = result.Página1.map((linha) => {
            return {
                nome_produto: linha.A,
                nome_vendedor: "consumidor",
                quantidade: linha.B,
                valor_unitario: linha.C,
                valor_total: linha.D,
                data_emissao: linha.E
            }
        })
        values.shift();
        const filteredValues = values.filter(p => {
            if(p.nome_produto != null){
                return p;
            }
        })
        console.log(filteredValues)

        // await insertToVendas(values);
        return res.redirect('https://grael-restaurane-backend.herokuapp.com/entradas')
    }
}

async function insertToVendas(dados) {
    try {
        await Vendas.bulkCreate(dados);
        return true
    } catch (error) {
        return error;
    }
}

module.exports = new XlsController()