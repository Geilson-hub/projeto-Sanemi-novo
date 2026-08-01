document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    if (!form) return;

    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const senha = senhaInput.value;

        if (!email || !senha) {
            alert('Preencha o e-mail e a senha.');
            return;
        }

        try {
            const response = await fetch('/.netlify/identity/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: senha })
            });

            if (response.status === 401) {
                alert('E-mail ou senha incorretos.');
                return;
            }

            if (!response.ok) {
                const errData = await response.json();
                alert('Erro ao fazer login: ' + (errData.error_description || 'Tente novamente'));
                return;
            }

            const user = await response.json();

            localStorage.setItem('inscrito', 'true');
            localStorage.setItem('inscrito_dados', JSON.stringify({
                nome: user.user_metadata.full_name || user.email,
                email: user.email,
                data: new Date().toISOString()
            }));
            sessionStorage.setItem('inscrito', 'true');
            sessionStorage.setItem('inscrito_dados', JSON.stringify({
                nome: user.user_metadata.full_name || user.email,
                email: user.email,
                data: new Date().toISOString()
            }));

            form.reset();
            window.location.href = 'episodios.html';
        } catch (err) {
            console.error('Erro no login:', err);
            alert('Erro ao fazer login. Tente novamente.');
        }
    });
});