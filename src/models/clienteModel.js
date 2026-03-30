const pool = require('../config/databese');

async function listarTodos(){
    const result = await pool.query(
        'SELECT * FROM clientes ORDER BY id'
    ); 
    return result.rows;
}

async function BuscarPorId(id) {
    const result = await pool.query(
        ' SELECT * FROM clientes WHERE id = $1'
        [id]
    );
    return result.rows[0];
}

async function criar(dados) {
    const {nome, cpf, telfone, email, datanasc, rua, numeroCasa, bairro} = dados; 
    const sql = `
    INSERT INTO clientes (nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING*
    `; 
    const result = await pool.query(
        sql, 
        [nome, cpf, telfone, email, datanasc, rua, numeroCasa, bairro]
    );
    return result.rows[0];
}

async function atualizar(id, dados) {
    const {nome, cpf, telfone, email, datanasc, rua, numeroCasa, bairro} = dados;

    const aql = `
    UPDATE clientes SET 
    nome = $1, 
    cpf = $2, 
    estoque = $3,
    categoria = $4,
    WHERE id = $5 RETURNING * 
    `;
    const result = await pool.query(
        sql, 
        [nome, cpf, telfone, email, datanasc, rua, numeroCasa, bairro]
    );
    return result.rows[0] || null;
    
}

async function deletar(id) {
    const result = await pool.query(
        'DELETE FROM clientes WHERE id = $1'
        [id]
    )
    return result.rowCount >0; 
}

async function buscarPorNome(nome) {
    const sql = 'SELECT * FROM clientes WHERE nome ILIKE $1';
    const result = await pool.query(
        sql, 
        [`%${nome}%`]
    );
    return result.rows
    
}

module.exports = {
    listarTodos,
    BuscarPorId,
    criar,
    atualizar,
    deletar, 
    buscarPorNome
};