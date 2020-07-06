const connection = require("../connection");
const sequelize = require("sequelize");

const Compras = connection.define('compras',{
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

Compras.sync({force: false}).then(()=>{
    console.log("Tabela Compras rodando")
})

module.exports = Compras;