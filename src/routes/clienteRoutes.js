const express = require('express');
const router = express.Router();

const clientesController = require('../controller/clientesController'); 

router.get('/', clientesController.listarTodos);

router.get('/nome/:nome', clientesController.buscarPorNome);

router.get('/:id', clientesController.BuscarPorId);

router.post('/',clientesController.criar);

router.put('/:id', clientesController.atualizar);

router.delete('/:id', clientesController.deletar);

module.exports = router; 
