import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/users", {
        name, password, type
      });

      setMessage("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/users"), 2000);
    } catch (err) {
      setMessage("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro de usuário</h2>

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
          <label>Senha:</label><br />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={type}
              onChange={(e) => setType(e.target.checked ? 1 : 0)}
            />
            Administrador
          </label>
        </div>

        <button type="submit" style={{ marginTop: 20 }}>Salvar</button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}

export default CreateUser;
