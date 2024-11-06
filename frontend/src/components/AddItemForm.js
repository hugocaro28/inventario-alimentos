import React, { useState } from 'react';

const AddItemForm = ({ onAdd }) => {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [precoCompra, setPrecoCompra] = useState(''); // Novo campo para Preço de Compra
  const [dataValidade, setDataValidade] = useState(''); // Novo campo para Data de Validade

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      nome,
      categoria,
      quantidade: parseFloat(quantidade),
      unidade,
      preco_compra: precoCompra ? parseFloat(precoCompra) : null, // Envia o preço de compra como número ou null
      data_validade: dataValidade || null, // Envia a data de validade como string ou null
    };

    onAdd(newItem);

    // Limpar os campos do formulário após a submissão
    setNome('');
    setCategoria('');
    setQuantidade('');
    setUnidade('');
    setPrecoCompra('');
    setDataValidade('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <h2>Adicionar Novo Item</h2>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Categoria:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
          <option value="">Selecione uma categoria</option>
          <option value="Frigorifico">Frigorifico</option>
          <option value="Congelador">Congelador</option>
          <option value="Armários">Armários</option>
          <option value="Fora">Fora</option>
        </select>
      </div>
      <div>
        <label>Quantidade:</label>
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
      </div>
      <div>
        <label>Unidade:</label>
        <select value={unidade} onChange={(e) => setUnidade(e.target.value)} required>
          <option value="">Selecione a unidade</option>
          <option value="Un">Un</option>
          <option value="Kg">Kg</option>
          <option value="Lt">Lt</option>
          <option value="Pacote">Pacote</option>
        </select>
      </div>
      <div>
        <label>Preço de Compra (€):</label>
        <input type="number" step="0.01" value={precoCompra} onChange={(e) => setPrecoCompra(e.target.value)} />
      </div>
      <div>
        <label>Data de Validade:</label>
        <input type="date" value={dataValidade} onChange={(e) => setDataValidade(e.target.value)} />
      </div>
      <button type="submit" style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
        Adicionar Item
      </button>
    </form>
  );
};

export default AddItemForm;