
authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
        .catch(error => console.log('Erro no login', error, alert('Erro no login')));
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
    if (user) {
        console.log("Usuário está autenticado no sistema")
        console.log(user)
    }
    else {
        console.log("usuário não autenticado")
    }
})