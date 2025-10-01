import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then((res) => {
        setName(res.data.name);
        setValue(res.data.value);
        setQuantity(res.data.quantity);
      })
      .catch(() => setMensagem("Produto não encontrado"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/products/${id}`, {
        name, value, quantity
      });

      setMensagem("Produto atualizado com sucesso!");
      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      setMensagem("Erro ao atualizar produto!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edição de produto</h2>

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

      {mensagem && <p style={{ marginTop: "10px" }}>{mensagem}</p>}
    </div>
  );
}

export default EditProduct;
