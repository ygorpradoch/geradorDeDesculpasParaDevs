// Banco de Dados Categorizado
const dbDesculpas = {
    classico: [
        "Na minha máquina funciona.",
        "Isso não é bug, é feature.",
        "Limpa o cache que resolve.",
        "Reiniciou o computador?",
        "O estagiário mexeu onde não devia.",
        "A documentação estava desatualizada."
    ],
    infra: [
        "O servidor caiu por excesso de sucesso (DDoS).",
        "A AWS está fora do ar na Virginia.",
        "Sempre é culpa do DNS.",
        "O Docker subiu, mas o container morreu.",
        "Erro de permissão no Linux (chmod 777 resolve).",
        "O banco de dados está em Deadlock.",
        "A latência da rede está muito alta."
    ],
    front: [
        "No Figma estava diferente.",
        "Centralizar essa div quebrou o site todo.",
        "Isso é problema de renderização do Chrome.",
        "O cliente tem um monitor muito pequeno.",
        "Essa cor não existe na paleta web-safe.",
        "O JavaScript não carregou por causa do AdBlock."
    ],
    moderno: [
        "A Inteligência Artificial alucinou essa resposta.",
        "O Copilot completou errado e eu aceitei.",
        "A culpa é do algoritmo quântico.",
        "Esqueci de pagar a API do ChatGPT.",
        "Isso funcionava antes da atualização do Framework.",
        "O micro-serviço está órfão."
    ]
};

let categoriaAtual = 'classico';
let txt = '';
let i = 0;
let speed = 30;
let isTyping = false;

// Função para trocar categoria e atualizar estilo dos botões
function mudarCategoria(cat, btnElement) {
    categoriaAtual = cat;
    
    // Remove a classe 'active' de todos os botões
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Adiciona 'active' apenas no clicado
    btnElement.classList.add('active');

    // Feedback visual na tela
    document.querySelector('.status-bar').innerText = `STATUS: MÓDULO [${cat.toUpperCase()}] CARREGADO.`;
}

function iniciarGeracao() {
    if (isTyping) return;
    
    // Seleciona o array baseado na categoria atual
    const listaSelecionada = dbDesculpas[categoriaAtual];
    const indice = Math.floor(Math.random() * listaSelecionada.length);
    
    txt = listaSelecionada[indice];
    
    document.getElementById("typed-text").innerHTML = "";
    i = 0;
    isTyping = true;
    document.querySelector('.status-bar').innerText = "STATUS: PROCESSANDO MENTIRA...";
    typeWriter();
}

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("typed-text").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        isTyping = false;
        document.querySelector('.status-bar').innerText = "STATUS: DESCULPA GERADA COM SUCESSO.";
    }
}

async function copiarTexto() {
    const texto = document.getElementById("typed-text").innerText;
    if(isTyping || texto.includes("...")) return;

    try {
        await navigator.clipboard.writeText(texto);
        const t = document.getElementById("toast-box");
        t.className = "toast show";
        setTimeout(() => { t.className = t.className.replace("toast show", "toast"); }, 3000);
    } catch (err) {
        console.error('Erro ao copiar', err);
    }
}