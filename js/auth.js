
authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
        .catch(error => console.log('Erro no login', error, alert('Erro no login')));
};

regForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();
    if (regForm.password.value === regForm.passwordCheck.value) {
        firebase.auth().createUserWithEmailAndPassword(regForm.email.value, regForm.password.value)
            .catch(error => console.log('Erro no cadastro', error,
        alert('Erro ao cadastrar', error)));
    } else {
        hideItem(loading)
        console.log('Senhas não coincidem'), alert('Senhas devem ser enguais');
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    hideItem(loading)
    if (user) {
        console.log("Usuário está autenticado no sistema")
        console.log(user)
    }
    else {
        console.log("usuário não autenticado")
    }
})