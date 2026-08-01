document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formInscrever');
    if (!form) return;

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value;

        if (!nome || !email || !senha) {
            alert('Preencha todos os campos.');
            return;
        }

        if (senha.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            const response = await fetch('/.netlify/identity/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: senha, full_name: nome, app_metadata: { role: 'subscriber' } })
            });

            if (response.status === 422) {
                const errData = await response.json();
                if (errData.error && errData.error.includes('already exists')) {
                    alert('Este e-mail já está cadastrado. Faça login para acessar sua conta.');
                    window.location.href = 'login.html';
                    return;
                }
                alert('Erro ao criar conta: ' + (errData.error_description || errData.error));
                return;
            }

            if (!response.ok) {
                const errData = await response.json();
                alert('Erro ao criar conta: ' + (errData.error_description || 'Tente novamente'));
                return;
            }

            const user = await response.json();

            localStorage.setItem('inscrito', 'true');
            localStorage.setItem('inscrito_dados', JSON.stringify({ nome, email, data: new Date().toISOString() }));
            sessionStorage.setItem('inscrito', 'true');
            sessionStorage.setItem('inscrito_dados', JSON.stringify({ nome, email, data: new Date().toISOString() }));

            const obrigadoData = { nome, email };
            sessionStorage.setItem('obrigado_dados', JSON.stringify(obrigadoData));

            window.location.href = '/obrigado.html';
        } catch (err) {
            console.error('Erro na inscrição:', err);
            alert('Erro ao processar inscrição. Tente novamente.');
        }
    });
});