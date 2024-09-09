// Verificar se o usuário está autenticado
const token = localStorage.getItem('token');

if (!token) {
    // Se o token não estiver presente, redirecionar para a página de login
    window.location.href = 'login.html';
} else {
    // Carregar dados do painel após verificar a autenticação
    carregarDadosPainel();
}

// Função para carregar os dados de investimentos e transações
async function carregarDadosPainel() {
    try {
        // Requisição para obter dados de investimentos ativos
        const responseInvestimentos = await fetch('https://seu-backend.up.railway.app/api/investimentos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Verificar se a requisição foi bem-sucedida
        if (responseInvestimentos.ok) {
            const investimentos = await responseInvestimentos.json();
            exibirInvestimentos(investimentos);
        } else {
            alert('Erro ao carregar dados de investimentos.');
        }

        // Requisição para obter histórico de transações
        const responseTransacoes = await fetch('https://seu-backend.up.railway.app/api/transacoes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Verificar se a requisição foi bem-sucedida
        if (responseTransacoes.ok) {
            const transacoes = await responseTransacoes.json();
            exibirTransacoes(transacoes);
        } else {
            alert('Erro ao carregar histórico de transações.');
        }
    } catch (erro) {
        console.error('Erro ao carregar os dados do painel:', erro);
        alert('Erro ao carregar os dados. Tente novamente mais tarde.');
    }
}

// Função para exibir os dados de investimentos no painel
function exibirInvestimentos(investimentos) {
    const tabelaInvestimentos = document.querySelector('.tabela-investimentos tbody');
    tabelaInvestimentos.innerHTML = ''; // Limpar a tabela antes de adicionar os dados

    investimentos.forEach(investimento => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${investimento.plano}</td>
            <td>${investimento.valorInvestido} MT</td>
            <td>${investimento.rendimentoDiario} MT</td>
            <td>${new Date(investimento.dataInicio).toLocaleDateString('pt-MZ')}</td>
        `;
        tabelaInvestimentos.appendChild(linha);
    });
}

// Função para exibir os dados do histórico de transações no painel
function exibirTransacoes(transacoes) {
    const tabelaTransacoes = document.querySelector('.tabela-transacoes tbody');
    tabelaTransacoes.innerHTML = ''; // Limpar a tabela antes de adicionar os dados

    transacoes.forEach(transacao => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${new Date(transacao.data).toLocaleDateString('pt-MZ')}</td>
            <td>${transacao.plano}</td>
            <td>${transacao.valor} MT</td>
            <td>${transacao.status}</td>
        `;
        tabelaTransacoes.appendChild(linha);
    });
}