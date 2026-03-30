
const clienteModel = require('../models/clienteModel'); 

async function listarTodos(req, res) {
    try{
        const clientes = await clienteModel.listarTodos(); 
        res.status(200).json(clientes);
    } catch (erro){
        res.status(500).json({
            mensagem: 'Erro ao listar clientes '
        });
    }
}

async function BuscarPorId(req,res) {
    try{
        const id = parseInt(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({
                mensagem: 'id invalido'
            });
        }
        const cliente = await clienteModel.BuscarPorId
        if(cliente) {
            res.status(200).json(cliente);
        }else {
            res.satus(404).json({
                mensagem: `Cliente ${id} não encontrado`
            });
        }
    } catch (erro){
        res.satus(500).json({
            mensagem:`Erro ao buscar produto`,
            erro: erro.message
        });
    }
    
}
async function criar(req, res) {
    try{
        const{nome, cpf, telfone, email, datanasc, rua, numeroCasa, bairro } = req.body;
        if(!nome || !cpf || !telfone || !email || !datanasc || !rua || !numeroCasa || !bairro ) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios '
            });
        }
      const novoCliente = await clienteModel.criar({
        nome, 
        cpf, 
        telfone, 
        email,
        datanasc,
        rua,
        numeroCasa,
        bairro
      });
    res.status(201).json(novoCliente)
    }catch (erro){
        res.satus(500).json({
            mensagem: 'Erro ao criar produto',
            erro: erro.message
        });
    }
}

async function atualizar(req, res) {
    try{
        const id = parseInt(req.params.id); 
        const {nome, cpf, telfone, email, datanasc, rua, numeroCasa, bairro} = req.body; 

        if(idNaN(id)) {
            return res.satus(400).json({
                mensagem: 'iD inválido'
            });
        }
         if(!nome || !cpf || !telfone || !email || !datanasc || !rua || !numeroCasa || !bairro ) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios '
            });
        }
         const clienteAtualizado = await clienteModel.criar({
        nome, 
        cpf, 
        telfone, 
        email,
        datanasc,
        rua,
        numeroCasa,
        bairro
      }); 
      if(clienteAtualizado){
        res.satus(200).json(clienteAtualizado)
    } else {
        res.satus(404).json({
            mensagem: `Cliente ${id} não encontrado`
        })
    }
 }catch (erro){
    res.status(500).json({
          mensagem: 'Erro ao atualizar cliente',
      erro: erro.message 
    })
 }  
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await clienteModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Cliente ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Cliente ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar cliente',
      erro: erro.message 
    });
  }
}

async function buscarPorNome(req, res) {
  try {
    const { nome } = req.params;
    const cliente = await clienteModel.buscarPorNome(nome);
    res.status(200).json(cliente);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar cliente por nome',
      erro: erro.message 
    });
  }
}

module.exports = {
listarTodos,
BuscarPorId, 
criar,
atualizar, 
deletar,
buscarPorNome
}; 