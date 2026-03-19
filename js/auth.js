
authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
        .catch(error =>
            alert('Erro no login', error),
            hideItem(loading)
        )
};

regForm.onsubmit = function (event) {
    showItem(loading);
    event.preventDefault();

    if (regForm.password.value === regForm.passwordCheck.value) {
        firebase.auth().createUserWithEmailAndPassword(regForm.email.value, regForm.password.value)
            .then(userCredential => {
                const user = userCredential.user;

                // Atualiza o perfil no Auth
                return user.updateProfile({
                    displayName: regForm.name.value
                }).then(() => {
                    // Salva dados extras no Firestore
                    return firebase.firestore().collection("usuarios").doc(user.uid).set({
                        nome: regForm.name.value,
                        email: user.email,
                        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
                    });
                });
            })
            .then(() => {
                hideItem(loading);
                alert("Usuário cadastrado com sucesso!");
                console.log("Cadastro completo com nome e email.");
            })
            .catch(error => {
                hideItem(loading);
                console.error("Erro no cadastro:", error);
                alert("Erro ao cadastrar: " + error.message);
            });
    } else {
        hideItem(loading);
        console.log("Senhas não coincidem");
        alert("Senhas devem ser iguais");
    }
};

firebase.auth().onAuthStateChanged(function (user) {
    hideItem(loading)
    console.log(user)
    if (user) {
        showUserContent(user)
    }
    else {
        showAuth()
    }
})
function signOut(){
    firebase.auth().signOut().catch(function (error) {
        alert('falha ao realizar logout', error)
    })
}
function sendEmailValidation() {
  showItem(loading)
  var user = firebase.auth().currentUser
  user.sendEmailVerification().then(function () {
    alert('E-mail  enviado para ' + user.email + '! Siga as instruções para finalizar a confirmação')
  }).catch(function (error) {
    alert('Falha ao enviar confirmação ' + error)
  }).finally(function () {
    hideItem(loading)
  })
}