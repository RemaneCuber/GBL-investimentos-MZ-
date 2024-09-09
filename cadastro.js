document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio do formulário até que seja validado

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Verificação básica dos campos
    if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Validação da senha
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    // Dados do cadastro que serão enviados para o back-end
    const dadosCadastro = {
        nome,
        email,
        senha
    };

    try {
        // Enviar os dados do cadastro para o back-end
        const response = await fetch('https://seu-backend.up.railway.app/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCadastro) // Converter os dados do cadastro para JSON
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            // Redirecionar para a página de login
            window.location.href = 'login.html';
        } else {
            alert(data.mensagem || 'Erro ao realizar cadastro. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro ao realizar cadastro:', erro);
        alert('Erro ao tentar cadastrar. Tente novamente.');
    }
});