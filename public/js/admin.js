const API = "usuarios";

// popula tabela (GET)
function carregarUsuarios() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const tabela = document.getElementById('tabela-corpo');
      tabela.innerHTML = '';
      data.forEach(obj => {
        const linha = `<tr>
          <td>${obj.id}</td>
          <td>${obj.nome} ${obj.sobrenome || ''}</td>
          <td>${obj.email || ''}</td>
          <td>${obj.cpf || ''}</td>
          <td>
            <button onclick="abrirEditar(${obj.id})">Editar</button>
            <button onclick="deletarPorId(${obj.id})">Excluir</button>
          </td>
        </tr>`;
        tabela.innerHTML += linha;
      });
    });
}
carregarUsuarios();

// buscar por CPF (usa query simples)
function buscarPorCpf() {
  const cpf = document.getElementById('cpfBuscar').value;
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const encontrado = data.find(u => u.cpf === cpf);
      if (!encontrado) return alert('Usuário não encontrado');
      alert(`Usuário encontrado: ${encontrado.nome} ${encontrado.sobrenome || ''}`);
    });
}

// abrir prompt para editar (simples)
function abrirEditar(id) {
  fetch(`${API}`)
    .then(res => res.json())
    .then(data => {
      const u = data.find(x => x.id == id);
      if (!u) return alert('Usuário não encontrado');
      const novoNome = prompt('Nome:', u.nome);
      if (novoNome === null) return;
      const novoSobrenome = prompt('Sobrenome:', u.sobrenome || "");
      if (novoNome.trim() === '') return alert('Nome não pode ser vazio');
      // PUT /usuarios/:id
      fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...u,
          nome: novoNome,
          sobrenome: novoSobrenome
        })
      })
      .then(() => {
        alert('Usuário atualizado');
        carregarUsuarios();
      });
    });
}

// deletar por id
function deletarPorId(id) {
  if (!confirm('Confirma exclusão?')) return;
  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(() => {
      alert('Usuário deletado');
      carregarUsuarios();
    });
}
