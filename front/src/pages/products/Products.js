import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const loadProducts = () => {
    axios.get("http://localhost:3001/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:3001/products/${id}`);
        setMessage("Produto excluído com sucesso!");
        loadProducts();
      } catch (err) {
        setMessage("Erro ao excluir produto!");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de produtos</h2>

      <button
        onClick={() => {}}
        style={{ color: "blue" }}
      >
        <Link to="/products/create">Cadastrar produto</Link>
      </button>

      {message && <p>{message}</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.value} - {p.quantity}

            <button style={{ marginLeft: "10px", color: "green" }}>
              <Link to={`/products/${p.id}/edit`}>Editar</Link>
            </button>

            <button
              onClick={() => deleteProduct(p.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
