import React, { useState, useEffect } from 'react';
import InventoryList from './components/InventoryList';
import AddItemForm from './components/AddItemForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function App() {
  const [items, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const fetchItems = () => {
    fetch(`${process.env.REACT_APP_API_URL}/items`)  // Mudança para usar variável de ambiente
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        const total = data.reduce((acc, item) => acc + (parseFloat(item.preco_compra || 0) * parseFloat(item.quantidade || 0)), 0);
        setTotalValue(total);
      })
      .catch((error) => {
        console.error('Erro ao buscar itens:', error);
        toast.error('Erro ao buscar itens');
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = (newItem) => {
    fetch(`${process.env.REACT_APP_API_URL}/items`, {  // Mudança para variável de ambiente
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success('Item adicionado com sucesso');
        fetchItems();
      })
      .catch((error) => {
        console.error('Erro ao adicionar item:', error);
        toast.error('Erro ao adicionar item');
      });
  };

  const removeItem = (itemId) => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${itemId}`, {  // Mudança para variável de ambiente
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Item removido com sucesso');
          fetchItems();
        } else {
          return response.json().then((errorData) => {
            toast.error(`Erro ao remover item: ${errorData.error}`);
          });
        }
      })
      .catch((error) => {
        console.error('Erro ao remover item:', error);
        toast.error('Erro ao remover item');
      });
  };

  // Restante do código permanece o mesmo
}

export default App;