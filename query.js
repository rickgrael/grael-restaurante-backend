const Compras = require('./src/database/models/Compras')
const Vendas = require('./src/database/models/Vendas')
const {
    Op
} = require('sequelize')

const agora = new Date();
Vendas.findAll({
    where: {
        data_emissao: {
            [Op.gt]: agora
        }
    }
}).then(valores => {

    valores.map(valor => {
        let data = valor.dataValues.data_emissao;
        let NdataJustada = data.getMonth() - 1;
        data.setMonth(NdataJustada)
        console.log(data)

        Vendas.update({
            data_emissao: data
        }, {
            where: {
                id: valor.dataValues.id
            }
        })
    })
})