let usuariosCadastrados = []; // Guarda os dados

// Selecionando os botões
const btnEntrar = document.getElementById("btnEntrar");
const btnCadastrar = document.getElementById("btnCadastrar");
const formEntrar = document.getElementById("formEntrar");
const formCadastrar = document.getElementById("formCadastrar");
const MensagemEntrar = document.getElementById("mensagem");
const MensagemCadastro = document.getElementById("mensagemCadastro");

// Adicionando o Evento no Botão de Entrar
btnEntrar.addEventListener("click", () => {
  formEntrar.classList.add("ativo");
  formEntrar.classList.remove("oculto");
  formCadastrar.classList.add("oculto");
  formCadastrar.classList.remove("ativo");
  btnEntrar.classList.add("ativo");
  btnCadastrar.classList.remove("ativo");
});

// Adicionando o Evento no Botão de Cadastrar
btnCadastrar.addEventListener("click", () => {
  formCadastrar.classList.add("ativo");
  formCadastrar.classList.remove("oculto");
  formEntrar.classList.add("oculto");
  formEntrar.classList.remove("ativo");
  btnCadastrar.classList.add("ativo");
  btnEntrar.classList.remove("ativo");
});

// Parte do Cadastro
const formCadastrarElement = document.getElementById("formCadastrar");

formCadastrarElement.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que o formulário seja enviado

  const novoEmail = document.getElementById("novo-email").value.trim();
  const novaSenha = document.getElementById("nova-senha").value.trim();
  const confirmaSenha = document.getElementById("confirmar-senha").value.trim();

  // Validação do Email
  if (!novoEmail.includes("@")) {
    MensagemCadastro.style.display = "block";
    MensagemCadastro.textContent = "Por favor, insira um e-mail válido.";
    MensagemCadastro.style.color = "red";
    return;
  }

  // Validação das Senhas
  if (novaSenha !== confirmaSenha) {
    MensagemCadastro.style.display = "block";
    MensagemCadastro.textContent = "As senhas não coincidem.";
    MensagemCadastro.style.color = "red";
    return;
  }

  // Verificação se o Email já está cadastrado
  const usuarioExistente = usuariosCadastrados.find(
    (user) => user.email === novoEmail
  );
  if (usuarioExistente) {
    MensagemCadastro.style.display = "block";
    MensagemCadastro.textContent = "Email já cadastrado.";
    MensagemCadastro.style.color = "red";
    return;
  }

  // Se tudo estiver certo, adiciona o Usuário
  usuariosCadastrados.push({ email: novoEmail, senha: novaSenha });
  MensagemCadastro.style.display = "block";
  MensagemCadastro.textContent = "Cadastro realizado com sucesso.";
  MensagemCadastro.style.color = "blue";

  // Limpa os Campos
  document.getElementById("novo-email").value = "";
  document.getElementById("nova-senha").value = "";
  document.getElementById("confirmar-senha").value = "";
});

// Parte do Login
const formEntrarElement = document.getElementById("formEntrar");

formEntrarElement.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que o formulário seja enviado

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Validação do Email
  if (!email.includes("@")) {
    MensagemEntrar.style.display = "block";
    MensagemEntrar.textContent = "Por favor, insira um e-mail válido.";
    MensagemEntrar.style.color = "red";
    return;
  }

  // Verifica se o email existe na lista de usuários
  const usuario = usuariosCadastrados.find((user) => user.email === email);
  if (!usuario) {
    MensagemEntrar.style.display = "block";
    MensagemEntrar.textContent = "Usuário não existente.";
    MensagemEntrar.style.color = "red";
    return;
  }

  // Verifica se a senha está correta
  if (usuario.senha !== senha) {
    MensagemEntrar.style.display = "block";
    MensagemEntrar.textContent = "Senha incorreta.";
    MensagemEntrar.style.color = "red";
    return;
  }

  // Se tudo estiver certo
  MensagemEntrar.style.display = "block";
  MensagemEntrar.textContent = "Login bem-sucedido.";
  MensagemEntrar.style.color = "blue";
});
