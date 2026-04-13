
firebase.auth().languageCode = 'pt-BR'

authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
        .catch(error => showError('Falha ao entrar: ', error)
        )
};

regForm.onsubmit = function (event) {
    showItem(loading);
    event.preventDefault();

    if (regForm.password.value === regForm.passwordCheck.value) {
        firebase.auth().createUserWithEmailAndPassword(regForm.email.value, regForm.password.value)
            .then(userCredential => {
                const user = userCredential.user;
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
                alert("Usuário cadastrado com sucesso!");
                console.log("Cadastro completo com nome e email.");
            })
            .catch(error => {
                showError('Falha ao realizar cadastro: ', error)
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
        const photo = user.photoURL || "https://i.pinimg.com/474x/21/9e/ae/219eaea67aafa864db091919ce3f5d82.jpg";
        if (photo) {
            document.getElementById("userPhoto").src = photo;
        }
        showUserContent(user)
    }
    else {
        showAuth()
    }
})
function signOut() {
    showItem(loading)
    firebase.auth().signOut().catch(function (error) {
        showError('Falha ao sair: ', error)
    })
}
function sendEmailValidation() {
    showItem(loading)
    var user = firebase.auth().currentUser
    user.sendEmailVerification(actionCodeSeting).then(function () {
        alert('E-mail  enviado para ' + user.email + '! Siga as instruções para finalizar a confirmação')
    }).catch(function (error) {
        showError('Falha ao enviar email: ', error)
    })
}

function resetPassword() {
    var email = prompt("Digite seu email para receber as instruções de redefinição de senha:");
    if (email) {
        showItem(loading);
        firebase.auth().sendPasswordResetEmail(email, actionCodeSeting)
            .then(function () {
                alert('E-mail de redefinição de senha enviado para ' + email + '! Siga as instruções para redefinir sua senha.');
            })
            .catch(function (error) {
                showError('Falha ao resetar senha: ', error)
            });
    } else {
        alert("Email é necessário para redefinir a senha.");
    }
}

function googleAccess() {
    showItem(loading)
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .catch((error) => {
            showError('Falha ao acessar com google: ', error)
        });

}

function deleteUser() {
    var confirmation = confirm("deseja mesmo fazer isso malokeiro?")
    if (confirm) {
        showItem(loading)
        firebase.auth().currentUser.delete().then(function () {
            alert("Conta removida com sucesso =) ")
        }).catch(function (error) {
            showError('Falha ao deletar usuário: ', error)
        })
    }

}
