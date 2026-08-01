document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formInscrever');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (typeof netlifyIdentity !== 'undefined') {
            const handler = function (user) {
                netlifyIdentity.off('login', handler);
                const nome = document.getElementById('nome') ? document.getElementById('nome').value.trim() : '';
                const email = user ? user.email : '';
                localStorage.setItem('obrigado_dados', JSON.stringify({ nome, email }));
                window.location.href = '/obrigado.html';
            };
            netlifyIdentity.on('login', handler);
            netlifyIdentity.signup();
        } else {
            window.location.href = 'inscrever-se.html';
        }
    });
});