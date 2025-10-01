import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Users from "./pages/users/Users";
import CreateUser from "./pages/users/CreateUser";
import EditUser from "./pages/users/EditUser";

import Products from "./pages/products/Products";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";

function App() {
  return (
    <Router>
      <nav style={{ margin: "10px" }}>
        <Link to="/users" style={{ marginRight: "10px" }}>Usuários</Link>
        <Link to="/products">Produtos</Link>
      </nav>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
