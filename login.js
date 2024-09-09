document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio do formulário até que a validação seja concluída

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Verificação básica dos campos
    if (email === '' || senha === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        // Enviar os dados de login para o back-end
        const response = await fetch('https://seu-backend.up.railway.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha }) // Enviar email e senha como JSON
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login bem-sucedido!');

            // Salvar o token no localStorage para autenticação futura
            localStorage.setItem('token', data.token);

            // Redirecionar para o painel do investidor
            window.location.href = 'painel.html';
        } else {
            alert(data.mensagem || 'Email ou senha incorretos.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao tentar fazer login. Tente novamente.');
    }
});