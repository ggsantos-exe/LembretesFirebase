var authForm = document.getElementById('authForm');
var regForm = document.getElementById('regForm');
var userContent = document.getElementById('user');
var authContent = document.getElementById('auth');
var title = document.getElementById('authFormTitle');
var register = document.getElementById('register');
var access = document.getElementById('access');
var loading = document.getElementById('loading');
var userName = document.getElementById('userName');
var sendEmailValidationDiv = document.getElementById('sendEmailValidationDiv');
var emailValidator = document.getElementById('emailValidator');
var passwordReset = document.getElementById('passwordReset');
var actionCodeSeting = { url: 'http://127.0.0.1:5500/'}

function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar'
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar'
  hideItem(passwordReset)
  hideItem(authForm)
  hideItem(register)
  showItem(access)
  showItem(regForm)
}

function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse a sua conta para continuar'
  hideItem(document.getElementById('regForm'))
  hideItem(access)
  showItem(passwordReset)
  showItem(register)
  showItem(authForm)

}

function showItem(element) {
  element.style.display = 'block'
}

function hideItem(element) {
  element.style.display = 'none'
}

function showAuth(){
  hideItem(userContent)
  showItem(authContent)
}

function showUserContent(user){
  if(user.emailVerified){
    emailValidator.innerHTML = "Email já verificado =)"
    hideItem(sendEmailValidationDiv)
  }
  else{
    emailValidator.innerHTML = "Email NÃO verificado =("
    showItem(sendEmailValidationDiv)
  }
  authForm.email.value = ""
  authForm.password.value = ""
  regForm.name.value = ""
  regForm.email.value = ""
  regForm.password.value = ""
  regForm.passwordCheck.value = ""
  
  userName.innerHTML = 'Olá senhor '+ user.displayName + ' tudo bem?'
  hideItem(authContent)
  showItem(userContent)
  

}