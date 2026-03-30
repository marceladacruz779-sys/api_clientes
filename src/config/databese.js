require('dotenv').config();
const { Pool } = require('pg'); 

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,          
    database: process.env.DB_NAME,      
    password: process.env.DB_PASSWORD,   
    port: parseInt(process.env.DB_PORT),
}); 

pool.connect((erro, cliente, release) => {
    if(erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro.message);
    console.error('💡 Verifique suas credenciais no arquivo .env');
    }else{
    console.log('✅ Conectado ao PostgreSQL!');
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();  
    }
}); 
const criarTabela = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY, 
        nome VARCHAR(150) NOT NULL,
        cpf VARCHAR (15) NOT NULL,
        telefone VARCHAR(14) NOT NULL,
        email VARCHAR (150) NOT NULL,
        datanasc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        rua VARCHAR (150) NOT NULL,
        numeroCasa INT NOT NULL, 
        bairro VARCHAR NOT NULL
    )`;

    try{
        await pool.query(sql);
        console.log('A tabela Clientes foi criada com sucesso');
    } catch (erro) {
        console.error('Deu ruim :', erro.message)
    }
};

criarTabela();

module.exports = pool; 
