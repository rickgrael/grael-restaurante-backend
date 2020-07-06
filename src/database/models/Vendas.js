const connection = require("../connection");
const sequelize = require("sequelize");

const Vendas = connection.define('vendas',{
    data_emissao: {
        type:sequelize.DATE,
        allowNull: false
    },
    nome_vendedor: {
        type:sequelize.STRING,
        allowNull: false
    },
    nome_produto: {
        type:sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type:sequelize.FLOAT,
        allowNull: false
    },
    valor_unitario: {
        type:sequelize.FLOAT,
        allowNull: false
    },
    valor_total: {
        type:sequelize.FLOAT,
        allowNull: false
    }

})

Vendas.sync({force: false}).then(()=>{
    console.log("Tabela Vendas rodando")
})

module.exports = Vendas;