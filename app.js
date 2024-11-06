// src/app.js ou o arquivo principal do seu backend

const express = require('express');
const { Pool } = require('pg'); // Cliente para PostgreSQL
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com PostgreSQL usando variáveis de ambiente
const db = new Pool({
  host: process.env.DB_HOST || 'dpg-csllhu1u0jms73f8nmog-a',
  user: process.env.DB_USER || 'base_dados_5qwb_user',
  password: process.env.DB_PASSWORD || 'ok7EDZnDpMc35LzEcF69NdfxiKQZvaQv',
  database: process.env.DB_NAME || 'base_dados_5qwb',
  port: process.env.DB_PORT || 5432,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
    process.exit(1);
  } else {
    console.log('Conectado ao PostgreSQL!');
  }
});

app.get('/', (req, res) => {
  res.send('API de Inventário de Alimentos está funcionando!');
});

app.get('/items', async (req, res) => {
  const query = `
    SELECT item_id, nome, categoria, quantidade, unidade, preco_compra, data_validade
    FROM Items
    ORDER BY categoria, nome
  `;
  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/items', async (req, res) => {
  const { nome, categoria, quantidade, unidade, preco_compra, data_validade } = req.body;

  const query = `
    INSERT INTO Items (nome, categoria, quantidade, unidade, preco_compra, data_validade) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING item_id
  `;
  
  try {
    const { rows } = await db.query(query, [nome, categoria, quantidade, unidade, preco_compra || null, data_validade || null]);
    res.json({ message: 'Item adicionado com sucesso!', itemId: rows[0].item_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Items WHERE item_id = $1';

  try {
    const { rowCount } = await db.query(query, [id]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'Item não encontrado' });
    } else {
      res.json({ message: 'Item removido com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover item' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});