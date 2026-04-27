const pool = require('../config/database');

async function listarTodos(){
    const result = await pool.query(
        'SELECT * FROM clientes ORDER BY id'
    ); 
    return result.rows;
}

async function BuscarPorId(id) {
    const result = await pool.query(
        'SELECT * FROM clientes WHERE id = $1',
        [id]
    );
    return result.rows[0];
}

async function criar(dados) {
    const {nome, cpf, email, telefone} = dados; 
    const sql = `
    INSERT INTO clientes (nome, cpf, email, telefone)
    VALUES ($1, $2, $3, $4) RETURNING *
    `; 
    const result = await pool.query(
        sql, 
        [nome, cpf, email, telefone]
    );
    return result.rows[0];
}

async function atualizar(id, dados) {
    const {nome, cpf, email, telefone} = dados;

    const sql = `
    UPDATE clientes SET 
    nome = $1, 
    cpf = $2, 
    email = $3,
    telefone = $4
    WHERE id = $5 RETURNING *
    `;
    const result = await pool.query(
        sql, 
        [nome, cpf, email, telefone, id]
    );
    return result.rows[0] || null;
    
}

async function deletar(id) {
    const result = await pool.query(
        'DELETE FROM clientes WHERE id = $1',
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