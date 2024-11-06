// src/components/InventoryList.js
import React from 'react';

const InventoryList = ({ items, onRemoveItem }) => {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {});

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Inventário Agrupado por Categoria</h2>
      {Object.keys(groupedItems).map((categoria) => (
        <div key={categoria} style={{ margin: '20px 0' }}>
          <h3>{categoria}</h3>
          <table style={{ width: '100%', margin: '0 auto', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}>Nome</th>
                <th style={{ padding: '8px' }}>Qt</th>
                <th style={{ padding: '8px' }}>Unidade</th>
                <th style={{ padding: '8px' }}>Preço Total (€)</th>
                <th style={{ padding: '8px' }}>Validade</th>
                <th style={{ padding: '8px' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems[categoria]
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((item) => (
                  <tr key={item.item_id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '8px' }}>{item.nome}</td>
                    <td style={{ padding: '8px' }}>{Math.floor(item.quantidade)}</td>
                    <td style={{ padding: '8px' }}>{item.unidade}</td>
                    <td style={{ padding: '8px' }}>{item.preco_compra ? `€${(parseFloat(item.preco_compra) * Math.floor(item.quantidade)).toFixed(2)}` : '-'}</td>
                    <td style={{ padding: '8px' }}>{formatDate(item.data_validade)}</td>
                    <td style={{ padding: '8px' }}>
                      <button
                        onClick={() => onRemoveItem(item.item_id)}
                        style={{ marginLeft: '10px', color: 'white', backgroundColor: 'red', border: 'none', padding: '5px', cursor: 'pointer' }}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;