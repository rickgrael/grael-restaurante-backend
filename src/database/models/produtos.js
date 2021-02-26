const connection = require("../connection");
const sequelize = require("sequelize");

const Produtos = connection.define('Produtos',{
    nome: {
        type:sequelize.STRING,
        allowNull: false
    },
    preco: {
        type:sequelize.STRING,
        allowNull: false
    },
    grupo: {
        type:sequelize.STRING,
        allowNull: false
    },
    subgrupo: {
        type:sequelize.STRING,
        allowNull: false
    },

})

Produtos.sync({force: false}).then(()=>{
    console.log("Tabela Produtos rodando")
})

module.exports = Produtos;