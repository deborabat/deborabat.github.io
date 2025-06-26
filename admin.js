document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const lista = document.getElementById("listaUsuarios");
  const limparCamposBtn = document.getElementById("limparCampos");
  const limparListaBtn = document.getElementById("limparLista");
  const pesquisaInput = document.getElementById("pesquisa");

  function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
  }

  function setUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  function renderLista(filtro = "") {
    lista.innerHTML = "";
    const usuarios = getUsuarios();
    usuarios
      .filter(
        (u) =>
          u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
          u.email.toLowerCase().includes(filtro.toLowerCase())
      )
      .forEach((usuario, idx) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${usuario.nome}</strong> (${usuario.email})<br>
                <small>${usuario.data}</small>
                <button class="btn-excluir" data-idx="${idx}">Excluir</button>`;
        lista.appendChild(li);
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    if (!nome || !email) return;
    const usuarios = getUsuarios();
    usuarios.push({
      nome,
      email,
      data: new Date().toLocaleString("pt-BR"),
    });
    setUsuarios(usuarios);
    renderLista(pesquisaInput.value);
    form.reset();
    nomeInput.focus();
  });

  limparCamposBtn.addEventListener("click", () => {
    form.reset();
    nomeInput.focus();
  });

  lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-excluir")) {
      const idx = e.target.getAttribute("data-idx");
      const usuarios = getUsuarios();
      usuarios.splice(idx, 1);
      setUsuarios(usuarios);
      renderLista(pesquisaInput.value);
    }
  });

  limparListaBtn.addEventListener("click", () => {
    if (confirm("Deseja excluir todos os usuários?")) {
      localStorage.removeItem("usuarios");
      renderLista(pesquisaInput.value);
    }
  });

  pesquisaInput.addEventListener("input", () => {
    renderLista(pesquisaInput.value);
  });

  renderLista();
});
