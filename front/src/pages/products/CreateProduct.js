import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/products", {
        name, value, quantity
      });

      setMessage("Produto cadastrado com sucesso!");
      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      setMessage("Erro ao cadastrar produto!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro de produto</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Valor:</label><br />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Quantidade:</label><br />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: 20 }}>Salvar</button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}

export default CreateProduct;
