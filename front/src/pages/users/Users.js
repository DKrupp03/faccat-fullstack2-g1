import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const loadUsers = () => {
    axios.get("http://localhost:3001/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        setMessage("Usuário excluído com sucesso!");
        loadUsers();
      } catch (err) {
        setMessage("Erro ao excluir usuário!");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de usuários</h2>

      <button
        onClick={() => {}}
        style={{ color: "blue" }}
      >
        <Link to="/users/create">Cadastrar usuário</Link>
      </button>

      {message && <p>{message}</p>}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.password} - {u.type}

            <button style={{ marginLeft: "10px", color: "green" }}>
              <Link to={`/users/${u.id}/edit`}>Editar</Link>
            </button>

            <button
              onClick={() => deleteUser(u.id)}
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

export default Users;
