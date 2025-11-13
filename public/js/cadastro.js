// API: caminho relativo (mesmo domínio)
const API = "usuarios";

// --- CEP via ViaCEP ---
const preencherFormulario = endereco => {
  document.getElementById("rua").value = endereco.logradouro || "";
  document.getElementById("bairro").value = endereco.bairro || "";
  document.getElementById("cidade").value = endereco.localidade || "";
  document.getElementById("estado").value = endereco.uf || "";
};

const cepValido = cep => cep.length === 8 && /^[0-9]+$/.test(cep);

document.getElementById("cep").addEventListener("focusout", async () => {
  const cep = document.getElementById("cep").value.replace("-", "");
  if (!cepValido(cep)) return;
  try {
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resp.json();
    if (!dados.erro) preencherFormulario(dados);
    else alert("CEP não encontrado!");
  } catch (err) {
    console.error(err);
    alert("Erro ao consultar CEP.");
  }
});

// --- POST (enviarDados) ---
function enviarDados(){
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const cep = document.getElementById('cep').value;
  const rua = document.getElementById('rua').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const estado = document.getElementById('estado').value;
  const telefone = document.getElementById('telefone').value;

  // validação simples
  if (!nome || !email || !senha) {
    alert('Preencha nome, email e senha.');
    return;
  }

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome, sobrenome, cpf, email, senha,
      cep, rua, bairro, cidade, estado, telefone
    })
  })
  .then(response => response.json())
  .then(data => {
    // limpa inputs
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('telefone').value = '';
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html';
  })
  .catch(err => {
    console.error(err);
    alert('Erro ao cadastrar.');
  });
}
