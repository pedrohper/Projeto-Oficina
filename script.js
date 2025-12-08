const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const cadastrarButton = document.getElementById('cadastrar');
const entrarButton = document.getElementById('entrar');

if (cadastrarButton) {
    cadastrarButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const email = emailInput.value;
        const senha = passwordInput.value; 

        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        cadastrarButton.textContent = "Carregando...";
        cadastrarButton.disabled = true;

        fetch('http://localhost:8080/usuarios', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })
        .then(res => {
            if (res.status === 201 || res.status === 200) {
                console.log("Sucesso!");
                alert("Cadastro realizado! Faça login.");
                window.location.replace('entrar.html'); 
            } else {
                alert("Erro ao cadastrar. Tente outro email.");
                cadastrarButton.textContent = "Cadastrar";
                cadastrarButton.disabled = false;
            }
        })
        .catch(err => {
            console.error("Erro:", err);
            alert("Erro de conexão com o servidor.");
            cadastrarButton.textContent = "Cadastrar";
            cadastrarButton.disabled = false;
        });
    });
}

if (entrarButton) {
    entrarButton.addEventListener('click', function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const senha = passwordInput.value;

        entrarButton.textContent = "Verificando...";
        entrarButton.disabled = true;

        fetch('http://localhost:8080/usuarios/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })
        .then(async res => {
            if (res.status === 200) {
                window.location.replace('status.html');
            } else {
                alert("Email ou senha incorretos!");
                entrarButton.textContent = "Entrar";
                entrarButton.disabled = false;
            }
        })
        .catch(err => {
            console.error("Erro:", err);
            alert("Servidor desligado ou erro de conexão.");
            entrarButton.textContent = "Entrar";
            entrarButton.disabled = false;
        });
    });
}