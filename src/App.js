import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const { data } = await api.get('repositories');

    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      url: "https://github.com/lucas-eduardo",
      title: `Desafio ReactJS ${new Date()}`,
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(item => item.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
