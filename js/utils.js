var authForm = document.getElementById('authForm');
var title = document.getElementById('authFormTitle');
var register = document.getElementById('register');
var access = document.getElementById('access');
var loading = document.getElementById('loading');

function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar'
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar'
  hideItem(authForm)
  hideItem(register)
  showItem(access)
  showItem(document.getElementById('regForm'))
}

function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse a sua conta para continuar'
  hideItem(document.getElementById('regForm'))
  hideItem(access)
  showItem(register)
  showItem(authForm)

}

function showItem(element) {
  element.style.display = 'block'
}

function hideItem(element) {
  element.style.display = 'none'
}
