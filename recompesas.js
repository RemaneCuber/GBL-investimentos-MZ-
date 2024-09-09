// Verificar se o usuário está autenticado
const token = localStorage.getItem('token');

if (!token) {
    // Se o token não estiver presente, redirecionar para a página de login
    window.location.href = 'login.html';
} else {
    // Carregar dados de recompensas após verificar a autenticação
    carregarRecompensas();
    gerarLinkIndicacao();
}

// Função para carregar as recompensas do usuário
async function carregarRecompensas() {
    try {
        const response = await fetch('https://seu-backend.up.railway.app/api/recompensas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Verificar se a requisição foi bem-sucedida
        if (response.ok) {
            const dadosRecompensas = await response.json();
            exibirRecompensas(dadosRecompensas);
        } else {
            alert('Erro ao carregar recompensas.');
        }
    } catch (erro) {
        console.error('Erro ao carregar recompensas:', erro);
        alert('Erro ao carregar as recompensas. Tente novamente mais tarde.');
    }
}

// Função para exibir as recompensas no painel
function exibirRecompensas(recompensas) {
    const tabelaRecompensas = document.querySelector('.tabela-recompensas tbody');
    tabelaRecompensas.innerHTML = ''; // Limpar a tabela antes de adicionar os dados

    // Loop pelas recompensas e adição dinâmica na tabela
    recompensas.forEach(recompensa => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${recompensa.data}</td>
            <td>${recompensa.indicado}</td>
            <td>${recompensa.valorInvestido} MT</td>
            <td>${recompensa.bonusRecompensa} MT</td>
        `;
        tabelaRecompensas.appendChild(linha);
    });
}

// Função para gerar link de indicação
function gerarLinkIndicacao() {
    const baseUrl = 'https://seu-front.vercel.app/cadastro.html'; // URL do cadastro no front-end
    const userId = '123'; // Aqui você deve usar o ID do usuário autenticado, vindo do back-end

    // Exemplo de link de indicação (pode ser ajustado conforme a lógica do back-end)
    const linkIndicacao = `${baseUrl}?indicacao=${userId}`;

    // Exibir o link gerado no DOM
    const linkElemento = document.getElementById('link-indicacao');
    linkElemento.textContent = linkIndicacao;
    linkElemento.href = linkIndicacao;
}

// Função para copiar o link de indicação
function copiarLink() {
    const linkElemento = document.getElementById('link-indicacao');
    const tempInput = document.createElement('input');
    tempInput.value = linkElemento.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Link de indicação copiado para a área de transferência!');
}