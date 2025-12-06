const formulario = document.querySelector('form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const cadastrarButton = document.getElementById('cadastrar');
const entrarButton = document.getElementById('entrar');

function cadastrarUsuario(email, senha) {
    fetch('https://localhost:8080/cadastrar', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, 
        method: 'POST',
        body: JSON.stringify({ 
            email: email, 
            senha: senha })
    })
    .then(function(res) {console.log(res)})
    .catch(function(res){console.log(res)});
    console.log('Usuário cadastrado:', email, senha);
}

function limparFormulario() {
    emailInput.value = '';
    passwordInput.value = '';
}

cadastrarButton.addEventListener('click', function(event) {
    event.preventDefault();
    cadastrarUsuario(emailInput.value, passwordInput.value);
    limparFormulario();
    window.location.replace('entrar.html');
});

entrarButton.addEventListener('click', function() {
    window.location.replace('status.html');
});


