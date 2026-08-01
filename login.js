document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (typeof netlifyIdentity !== 'undefined') {
            const handler = function (user) {
                netlifyIdentity.off('login', handler);
                window.location.href = 'episodios.html';
            };
            netlifyIdentity.on('login', handler);
            netlifyIdentity.login();
        } else {
            window.location.href = 'login.html';
        }
    });
});