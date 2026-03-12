
authForm.onsubmit = function (event) {
  event.preventDefault();
  firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
    .then(userCredential => {
      console.log('Login ok', userCredential.user);
    })
    .catch(error => console.log('Erro no login', error));
};

regForm.onsubmit = function (event) {
  event.preventDefault();
  if (regForm.password.value === regForm.passwordCheck.value) {
    firebase.auth().createUserWithEmailAndPassword(regForm.email.value, regForm.password.value)
      .then(userCredential => {
        console.log('Cadastro ok', userCredential.user);
      })
      .catch(error => console.log('Erro no cadastro', error));
  } else {
    console.log('Senhas não coincidem');
  }
}
