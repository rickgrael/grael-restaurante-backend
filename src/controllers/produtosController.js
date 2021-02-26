const Produtos = require('../database/models/produtos');

class produtosController {
    async create (req,res) {
        try {
            const {nome, preco, grupo, subgrupo} = req.body;
            
            const check = await Produtos.findOne({where:{
                nome,
                grupo,
                subgrupo
            }})
    
            if (check !== undefined || check !== null ){
                await Produtos.create({
                    nome,
                    preco,
                    grupo,
                    subgrupo
                })
        
                return res.json({message: 'ok'})
            } else {
                return res.json({message: 'already exist'})
            }
    
        } catch(e){
            return res.json({message: 'fail'})
        }
    }
    
    async index(req,res) {
        const produtos = await Produtos.findAll({
            raw: true
        })

        return res.json(produtos)
    }

    async edit (req,res) {
        const {
            id,
            nome,
            preco,
            grupo,
            subgrupo,
        } = req.body;
        try{
            await Produtos.update({
                id,
                nome,
                preco,
                grupo,
                subgrupo,
            }, {
                where: {
                    id
                }
            })
            
            return res.json({message: 'Produto alterado'})

        } catch(e){
            return res.json({message:'Erro ao modificar produto'})
        }

    }

    async delete (req,res) {
        const id = req.params.id;
        try{
            await Produtos.destroy({
                where:{
                    id
                }
            })
    
            return res.json({message: 'produto deletado'})
        } catch(e){
            return res.json({message: 'error'})
        }
    }
}


module.exports = new produtosController();