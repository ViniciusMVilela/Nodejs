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

//criação cliente --> front-end
app.get("/cliente",  async function(req,res){
    await cliente.create(
        req.body
    
    ).then(cli=>{
        return res.json({
            error:false,
            message:"Cliente criado com sucesso",
            cli
            
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});

//inserir um pedido para um cliente --> front-end
app.post('/cliente/:id', async(req,res)=>{
    const ped = {
    data : req.body,
    ClienteId: req.params.id    
    };

    if(! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message:"Cliente não existe"
        });
    };
    await pedido.create(ped)
    .then(pedcli=>{
        return res.json({
            error:false,
            message:"Pedido foi inserido com sucesso",
            pedcli
            
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
})
//listar todos os clientes --> front-end
app.get('/clientes', async(req,res)=>{
    await cliente.findAll()
    .then(cli =>{
        return res.json({
            error:false,
            cli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
}); 

//listar todos os pedidos dos clientes --> front-end
app.get('clientes-pedidos', async(req,res)=>{
    await cliente.findAll({include : [{all:true}]})
    .then(cli =>{
        return res.json({
            error:false,
            cli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });

});

// listar todos os cartões do cliente --> front-end
app.get('clientes-cartaos', async(req,res)=>{
    await cliente.findAll({include : [{all:true}]})
        .then(cli=>{
            return res.json({
                error:false,
                cli
            });
        }).catch(erro=>{
            return res.status(400).json({
                error: true,
                message: "Problema com a API."
            })
        })
})
//listar compras do cliente --> front-end
app.get('/cartao/:id/compras', async(req,res)=>{
    await compras.findAll({
        where :{CartaoId: req.params.id}
    }).then(compras =>{
        return res.json({
        error:false,
        compras
    });
}).catch(erro=>{
    return res.status(400).json({
        error:true,
        message:"Problema com a API"
    });
});
})

//listar pedidos de um cliente --> front-end
app.get('cliente/:id/pedidos', async(req,res)=>{
    await pedido.findAll({
        where :{ClienteId: req.params.id}
    }).then(pedidos =>{
        return res.json({
            error:false,
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
})
//listar cartaos do cliente --> front-end
app.get('/cliente/:id/cartaos', async(req,res)=>{
    await cartao.findAll({
        where :{ClienteId: req.params.id}
    }).then(cartaos =>{
        return res.json({
        error:false,
        cartaos
    });
}).catch(erro=>{
    return res.status(400).json({
        error:true,
        message:"Problema com a API"
    });
});
})
//excluir um cliente --> front-end
app.delete('/excluir-cliente/:id', async(req,res)=>{
    await cliente.destroy({
        where : {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Cliente excluído com sucesso"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
})
//listar um pedido --> front-end
app.get('/cartao/:id', async(req,res)=>{
    await cart.findByPk(req.params.id)
    .then(ped =>{
        return res.json({
            error:false,
           cart
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
    
})
//alteração de cartão
app.put('/editar-cartao/:id', async(req,res)=>{
    const cart ={
        id: req.params.id,
        ClienteId: res.body.ClienteId,
        dataCartao: req.body.data,
        validade: req.body.validade
    }
    if(! await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error : true,
            message: "Cliente não existe"
        });
    };
    await cartao.update(cart,{
        where: Sequelize.and({ClienteId : req.body.ClienteId},
            {id : req.params.id})
    }).then(umcartao =>{
        return res.json({
            error:false,
            message: "Cartão alterado com sucesso",
           umcartao
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
})

//criacao empresa --> front-end
app.post("/novaempresa",  async function(req,res){
    await empresa.create(
        req.body
    
    ).then(empr=>{
        return res.json({
            error:false,
            message:"Empresa criada com sucesso",
            empr
            
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});

//lista todas as empresas --> front-end
app.get('/empresas', async(req,res)=>{
    await empresa.findAll()
    .then(empr =>{
        return res.json({
            error:false,
            empr
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
}); 
//promoções da empresa --> front-end
app.get('/empresa/:id/promocaos', async(req,res)=>{
    await promocao.findAll({
        where :{EmpresaId: req.params.id}
    }).then(promocaos =>{
        return res.json({
        error:false,
        promocaos
    });
}).catch(erro=>{
    return res.status(400).json({
        error:true,
        message:"Problema com a API"
    });
});
})
//excluir uma empresa --> front-end
app.delete('/excluir-empresa/:id', async(req,res)=>{
    await empresa.destroy({
        where : {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Empresa excluída com sucesso"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
})
//criação cartao --> front-end
app.get("/cartao",  async function(req,res){
    await cartao.create(
        req.body
    
    ).then(cart=>{
        return res.json({
            error:false,
            message:"Cartão criado com sucesso ",
            cart
            
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});
//listar todos os cartões --> front-end
app.get('/cartaos', async(req,res)=>{
    await cartao.findAll()
    .then(cart =>{
        return res.json({
            error:false,
            cart
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
}); 
//excluir um cartão --> front-end
app.delete('/excluir-cartao/:id', async(req,res)=>{
    await cartao.destroy({
        where : {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Cartão excluído com sucesso"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
})
//criação promoção --> front-end
app.get("/promocao",  async function(req,res){
    await promocao.create(
        req.body
    
    ).then(promo=>{
        return res.json({
            error:false,
            message:"Promoção criada com sucesso ",
            promo
            
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});
//listar todos as promoções --> front-end
app.get('/promocoes', async(req,res)=>{
    await promocao.findAll()
    .then(promo =>{
        return res.json({
            error:false,
            promo
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
}); 
//excluir uma promoção --> front-end
app.delete('/excluir-promocao/:id', async(req,res)=>{
    await promocao.destroy({
        where : {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Promoção excluída com sucesso"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
})
//criação compra --> front-end
app.get("/compra",  async function(req,res){
    await compra.create(
        req.body
    
    ).then(compra=>{
        return res.json({
            error:false,
            message:"Compra criada com sucesso ",
            compra
            
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Foi impossível conectar"
        })
    });
});
//listar todos as promoções --> front-end
app.get('/compras', async(req,res)=>{
    await compra.findAll()
    .then(compra =>{
        return res.json({
            error:false,
            compra
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
}); 
//excluir uma promoção --> front-end
app.delete('/excluir-compra/:id', async(req,res)=>{
    await compra.destroy({
        where : {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:"Compra excluída com sucesso"
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
    });
})
let port = process.env.PORT || 3005;

app.listen(port, (req,res)=>{
    console.log('Servidor está ativo: '+'http://localhost:3005');
});


// funções realizadas no ciclo3  back-end 

//listacliente
app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw:true,
        order:[['nome', 'ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
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

//atualização de clientes 
//put
app.get('/atualizacliente ', async(req,res)=>{
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
//criação empresa
app.get('/empresa',  async function(req,res){
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
//criação de promocão
app.get('/promocaos',  async function(req,res){
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
//criação de cartao
app.get('/cartaos',  async function(req,res){
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
        raw:true,
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
//criação de compra
app.get('/novacompra',  async function(req,res){
    await compra.create(   // tive que realizar a inserção manual dentro do mySql, relatava problema de data não reconhecida
        req.body
        // data:'2022-08-15',
        // quantidade:"1",
        // valor:"87",
        // PromocaoId:"3",
        // CartaoId:"2"
    
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
        raw:true,
       order:[[`data`,'DESC']]
    }).then(function(compras){
        res.json({compras})
    });
});
app.get('listacompras', async(req,res)=>{
    await compra.findAll({include : [{all:true}]})
    .then(function(cartaos){
        return res.json({compras
          
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema com a API."
        });
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

