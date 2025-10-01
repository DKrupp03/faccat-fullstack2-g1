import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(0);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then((res) => {
        setName(res.data.name);
        setPassword(res.data.password);
        setType(res.data.type);
      })
      .catch(() => setMensagem("Usuário não encontrado"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/users/${id}`, {
        name, password, type
      });

      setMensagem("Usuário atualizado com sucesso!");
      setTimeout(() => navigate("/users"), 2000);
    } catch (err) {
      setMensagem("Erro ao atualizar usuário!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edição de usuário</h2>

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

      {mensagem && <p style={{ marginTop: "10px" }}>{mensagem}</p>}
    </div>
  );
}

export default EditUser;
