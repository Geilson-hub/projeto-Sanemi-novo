document.addEventListener('DOMContentLoaded', function () {
    var btnInscrever = document.getElementById('btnInscrever');
    var btnLogin = document.getElementById('btnLogin');
    var btnSair = document.getElementById('btnSair');

    if (typeof netlifyIdentity !== 'undefined') {
        netlifyIdentity.on('init', function (user) {
            updateNav(user);
        });
        netlifyIdentity.on('login', function (user) {
            updateNav(user);
        });
        netlifyIdentity.on('logout', function () {
            updateNav(null);
        });
    }

    function updateNav(user) {
        if (!btnInscrever || !btnLogin || !btnSair) return;
        if (user) {
            btnInscrever.style.display = 'none';
            btnLogin.style.display = 'inline-flex';
            btnSair.style.display = 'inline-flex';
        } else {
            btnInscrever.style.display = 'inline-flex';
            btnLogin.style.display = 'none';
            btnSair.style.display = 'none';
        }
    }

    if (btnInscrever) {
        btnInscrever.addEventListener('click', function () {
            if (typeof netlifyIdentity !== 'undefined') {
                netlifyIdentity.open();
            } else {
                window.location.href = 'inscrever-se.html';
            }
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', function () {
            if (typeof netlifyIdentity !== 'undefined') {
                netlifyIdentity.open();
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    if (btnSair) {
        btnSair.addEventListener('click', function () {
            if (typeof netlifyIdentity !== 'undefined') {
                netlifyIdentity.logout();
            }
            localStorage.removeItem('inscrito');
            localStorage.removeItem('inscrito_dados');
            sessionStorage.removeItem('inscrito');
            sessionStorage.removeItem('inscrito_dados');
            window.location.href = 'index.html';
        });
    }
});