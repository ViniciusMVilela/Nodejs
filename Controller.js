const express = require('express');
const cors = require('cors');
const {Sequelize} = require('./models');
const models = require ('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let cartao = models.Cartao;
let empresa = models.Empresa;
let compra = models.Compra;
let promocao = models.Promocao;

app.get('/', function(req,res){
    res.send('Bem vindo ao desafio!')
});
//criação cliente
app.post('/clientes',  async function(req,res){
    await cliente.create(
        req.body
        // nome:"Vinicius",
        // cidade:"Maringá",
        // uf:"PR",
        // nascimento:"2003",
        // createAt: new Date(),
        // updateAt: new Date()

    ).then(function(){
        return res.json({
            error:false,
            message:"Cliente criado com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
    // res.send('Cliente criado com Sucesso');
});
app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        //raw:true
        order:[['nome', 'ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

//atualização de clientes
app.put('/atualizacliente ', async(req,res)=>{
    await cliente.update(req.body,{
        where:{id: req.body.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Cliente alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro na alteração do cliente"
        });

    });
});
    //exclusao cliente
app.get('excluircliente', async(req,res)=>{
    cliente.destroy({
        where:{id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Cliente excluido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"erro ao excluir cliente"
        })
    })
});

// criacão de empresas
app.post('/empresas',  async function(req,res){
    await empresa.create(
        req.body
        // nome:"Lachonete Felipo's",
        // dataAdesao:"02/02/2022",
        // createAt: new Date(),
        // updateAt: new Date()

    ).then(function(){
        return res.json({
            error:false,
            message:"Empresa criada com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
    // res.send('Empresa criado com Sucesso');
});
//listagem empresas
app.get('/listaempresas', async(req,res)=>{
    await empresa.findAll({
        //raw:true
        order:[['nome', 'ASC']]
    }).then(function(empresas){
        res.json({empresas})
    });
});
//atualização de empresa
app.put('/atualizaempresa ', async(req,res)=>{
    await empresa.update(req.body,{
        where:{id: req.body.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Empresa alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro na alteração do emrpesa"
        });

    });
});
//exclusao empresa
app.get('excluirempresa', async(req,res)=>{
    empresa.destroy({
        where:{id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Empresa excluido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"erro ao excluir empresa"
        })
    })
});
//criaçaõ de promoção
app.post('/promocaos',  async function(req,res){
    await promocao.create(
        req.body
        // nome:"25% de desconto",
        // descrição:"Ativando essa promoçaõ ganhe 25% de desconto na sua compra",
        //validade:"10/12/2022"
        //EmpresaId:"1"
    ).then(function(){
        return res.json({
            error:false,
            message:"Promoção criada com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});
//listagem promoções
app.get('/listapromocaos', async(req,res)=>{
    await promocao.findAll({
        //raw:true
        order:[['nome', 'ASC']]
    }).then(function(promocaos){
        res.json({promocaos})
    });
});
//atualização de promocao
app.put('/atualizapromocao ', async(req,res)=>{
    await promocao.update(req.body,{
        where:{id: req.body.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Promocao alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro na alteração do promocao"
        });

    });
});
//exclusao promocao
app.get('excluirpromocao', async(req,res)=>{
    promocao.destroy({
        where:{id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Promocao excluido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"erro ao excluir promoção"
        })
    })
});
//criaçaõ de cartao
app.post('/cartaos',  async function(req,res){
    await cartao.create(
        req.body
        // dataCartao:"07/08/2022",
        // validade:"07/01/2023",
        //ClienteId:""
    ).then(function(){
        return res.json({
            error:false,
            message:"Cartão criado com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});
//listagem de cartoes
app.get('/listacartaos', async(req,res)=>{
    await cartao.findAll({
        //raw:true
        order:[['id', 'ASC']]
    }).then(function(cartaos){
        res.json({cartaos})
    });
});
 //atualização de cartao
app.put('/atualizacartao ', async(req,res)=>{
    await cartao.update(req.body,{
        where:{id: req.body.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "cartao alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro na alteração do cartao"
        });

    });
});
//exclusao cartao
app.get('excluircartao', async(req,res)=>{
    cartao.destroy({
        where:{id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Cartão excluido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"erro ao excluir cartão"
        })
    })
});
//criaçaõ de compra
app.post('/compras',  async function(req,res){
    await compra.create(   // tive que realizar a inserção manual dentro do mySql, relatava problema de data não reconhecida
        req.body
        // data:"07/08/2022",
        // quantidade:"1",
        //valor:"55",
        //PromocaoId:"2",
        //CartaoId:"1"
    ).then(function(){
        return res.json({
            error:false,
            message:"Compra criada com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});
//listagem compras
app.get('/listacompras', async(req,res)=>{
    await compra.findAll({
        //raw:true
       order:[['data', 'DESC']]
    }).then(function(compras){
        res.json({compras})
    });
});

//atualização de compra
app.put('/atualizacompra ', async(req,res)=>{
    await compra.update(req.body,{
        where:{data: req.body.data}
    }).then(function(){
        return res.json({
            error:false,
            message: "compra alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro na alteração do compra"
        });

    });
});

//exclusao compra
app.get('excluircompra', async(req,res)=>{
    compra.destroy({
        where:{data: req.params.data}
    }).then(function(){
        return res.json({
            error:false,
            message:"Compra excluido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"erro ao excluir compra"
        })
    })
});











let port = process.env.PORT || 3003; 

app.listen(port, (req,res)=>{
    console.log('Servidor está ativo: http://localhost:3003');
})