const xml2json = require('xml2js');
const {
    parse
} = require('node-html-parser');

const Compras = require('../database/models/Compras');
const Vendas = require('../database/models/Vendas');

class fileControllers {
    async getHtmlFile(req, res) {
        const [,,flag] = req.url.split('/');
        let file;
        if (!req.files) {
            res.send("falha")
            return;
        }

        file = req.files.html;

        HTMLtoJson(file.data, res, flag)

    }

    async getXmlFile(req, res) {
        const [,,flag] = req.url.split('/');
        console.log(req.files)
        let file;
        if (!req.files) {
            res.send(req.headers)
            return;
        }

        file = req.files.xml; // here is the field name of the form
        xmlToJson(file.data, flag)
        res.status(201).send();

    }
}

function HTMLtoJson(file, res, flag) {
    let total,
        produto_nome,
        produto_quantidade,
        valor_unidade;

    const root = parse(file.toString());

    let vendedor = root.querySelector('#u20').innerHTML;
    let data_compra = root.querySelector('li').childNodes[12].rawText.slice(0, 19);
    let [dia, mes, ano_horario] = data_compra.split('/');
    let [ano, horario] = ano_horario.split(' ');
    let [hora, minuto, segundo] = horario.split(':');

    let formated_date = new Date(ano, mes - 1, dia, hora, minuto, segundo);
    let tabela = root.querySelectorAll('tr')
    let tabelaArray = Array.from(tabela);

    let arrayResposta = [];
    tabelaArray.forEach(async linha => {

        if (linha.childNodes[3].childNodes[2].innerHTML != undefined) {
            total = linha.childNodes[3].childNodes[2].innerHTML.replace(',', '.');

        }

        if (linha.childNodes[1].childNodes[1].innerHTML != undefined) {
            produto_nome = linha.childNodes[1].childNodes[1].innerHTML
        }

        if (linha.childNodes[1].childNodes[7].childNodes[2].rawText != undefined) {
            produto_quantidade = linha.childNodes[1].childNodes[7].childNodes[2].rawText.replace(',', '.');
        }

        if (linha.childNodes[1].childNodes[11].childNodes[2].rawText != undefined) {
            valor_unidade = linha.childNodes[1].childNodes[11].childNodes[2].rawText.replace(',', '.');
        }

        if (produto_nome !== undefined && produto_quantidade !== undefined && valor_unidade !== undefined && total !== undefined) {
            if ( flag === 'compras') {
                Compras.create({
                    data_emissao: formated_date,
                    nome_vendedor: vendedor,
                    nome_produto: produto_nome,
                    quantidade: Number(produto_quantidade),
                    valor_unitario: Number(valor_unidade),
                    valor_total: Number(total)
                }).then(count => {
                    arrayResposta.push(count)
                })

            } else {
                Vendas.create({
                    data_emissao: formated_date,
                    nome_vendedor: vendedor,
                    nome_produto: produto_nome,
                    quantidade: Number(produto_quantidade),
                    valor_unitario: Number(valor_unidade),
                    valor_total: Number(total)
                }).then(count => {
                    arrayResposta.push(count)
                })
            }
        }

    })
    res.send('ok')

}


function xmlToJson(file, flag) {

    xml2json.parseString(file, {
        mergeAttrs: true
    }, (err, result) => {
        if (err) {
            throw err
        }

        const json = JSON.stringify(result, null, 4)
        console.log(json)

        formatJSON(json, flag)
    })

}

function formatJSON(data, flag) {

    let json = JSON.parse(data);
    //unicos
    let data_emissao = json.nfeProc.NFe[0].infNFe[0].ide[0].dhEmi[0];
    let nome_vendedor = json.nfeProc.NFe[0].infNFe[0].emit[0].xNome[0];
    let total_compra = json.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vProd[0];

    //Vetor de produtos
    let det = json.nfeProc.NFe[0].infNFe[0].det;
    let produtos_comprados = det.map(compra => {
        return compra.prod[0];
    })

    //objeto
    let Compra = {
        data_emissao,
        nome_vendedor,
        total_compra,
        produtos: []
    };

    //iteracao
    produtos_comprados.forEach(produto => {
        let nome_produto = produto.xProd[0];
        let quantidade = produto.qCom[0]
        let valor_unitario = produto.vUnCom[0];
        let valor_total = produto.vProd[0];

        if (flag === 'compras') {
            Compras.create({
                data_emissao,
                nome_vendedor,
                nome_produto,
                quantidade,
                valor_unitario,
                valor_total
            }).then(comp => {
                console.log("compra criada")
            }).catch(e => {
                console.log(e)
            })
        } else {
            Vendas.create({
                data_emissao,
                nome_vendedor,
                nome_produto,
                quantidade,
                valor_unitario,
                valor_total
            }).then(comp => {
                console.log("compra criada")
            }).catch(e => {
                console.log(e)
            })
        }

    })
}


module.exports = new fileControllers();