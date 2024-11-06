const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados com variáveis de ambiente para facilitar o deploy
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Usar a senha do MariaDB definida nas variáveis de ambiente
  database: process.env.DB_NAME || 'InventarioAlimentos',
  port: process.env.DB_PORT || 3306,
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MariaDB:', err);
    process.exit(1);
  } else {
    console.log('Conectado ao MariaDB!');
  }
});

app.get('/', (req, res) => {
  res.send('API de Inventário de Alimentos está funcionando!');
});

app.get('/items', (req, res) => {
  const query = `
    SELECT item_id, nome, categoria, quantidade, unidade, preco_compra, data_validade
    FROM Items
    ORDER BY categoria, nome
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.post('/items', (req, res) => {
  const { nome, categoria, quantidade, unidade, preco_compra, data_validade } = req.body;

  const query = 'INSERT INTO Items (nome, categoria, quantidade, unidade, preco_compra, data_validade) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nome, categoria, quantidade, unidade, preco_compra || null, data_validade || null], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Item adicionado com sucesso!', itemId: result.insertId });
    }
  });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Items WHERE item_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao remover item' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Item não encontrado' });
    } else {
      res.json({ message: 'Item removido com sucesso' });
    }
  });
});

// Definir para escutar em '0.0.0.0' para acesso na rede
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});