// Array para armazenar metas
let metas = [];

// Array para armazenar hábitos
let habitos = [];

// Função para adicionar nova meta
function adicionarMeta() {
    const novaMetaInput = document.getElementById("novaMetaInput");
    const novaMeta = novaMetaInput.value;
    if (novaMeta !== "") {
        metas.push(novaMeta);
        atualizarListaMetas();
        novaMetaInput.value = "";
        calcularProgressoMetas();
    }
}

// Função para atualizar a lista de metas
function atualizarListaMetas() {
    const listaMetas = document.getElementById("listaMetas");
    listaMetas.innerHTML = "";
    metas.forEach(meta => {
        const li = document.createElement("li");
        li.textContent = meta;
        listaMetas.appendChild(li);
    });
}

// Função para adicionar novo hábito
function adicionarHabito() {
    const novoHabitoInput = document.getElementById("novoHabitoInput");
    const novoHabito = novoHabitoInput.value;
    if (novoHabito !== "") {
        habitos.push(novoHabito);
        atualizarListaHabitos();
        novoHabitoInput.value = "";
        calcularProgressoHabitos();
    }
}

// Função para atualizar a lista de hábitos
function atualizarListaHabitos() {
    const listaHabitos = document.getElementById("listaHabitos");
    listaHabitos.innerHTML = "";
    habitos.forEach(habito => {
        const li = document.createElement("li");
        li.textContent = habito;
        listaHabitos.appendChild(li);
    });
}

// Função para calcular o progresso das metas
function calcularProgressoMetas() {
    const progressoMetas = document.getElementById("progressoMetas");
    const totalMetas = metas.length;
    const metasConcluidas = metas.filter(meta => meta.includes("Concluída")).length;
    progressoMetas.textContent = `Metas Concluídas: ${metasConcluidas}/${totalMetas}`;
}

// Função para calcular o progresso dos hábitos
function calcularProgressoHabitos() {
    const progressoHabitos = document.getElementById("progressoHabitos");
    const totalHabitos = habitos.length;
    progressoHabitos.textContent = `Hábitos Criados: ${totalHabitos}`;
}


// ...

// Função para atualizar os gráficos
function atualizarGraficos() {
    // Gráfico de Barras - Progresso das Metas
    const ctxMetas = document.getElementById('graficoMetas').getContext('2d');
    const metasConcluidas = metas.filter(meta => meta.includes("Concluída")).length;
    const totalMetas = metas.length;
    const metasPendentes = totalMetas - metasConcluidas;
    const metasData = [metasConcluidas, metasPendentes];
    const metasLabels = ['Concluídas', 'Pendentes'];
    new Chart(ctxMetas, {
        type: 'bar',
        data: {
            labels: metasLabels,
            datasets: [{
                label: 'Progresso das Metas',
                data: metasData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Pizza - Distribuição dos Hábitos por Categoria
    const ctxHabitos = document.getElementById('graficoHabitos').getContext('2d');
    const habitosPorCategoria = contarHabitosPorCategoria();
    const habitosLabels = Object.keys(habitosPorCategoria);
    const habitosData = Object.values(habitosPorCategoria);
    new Chart(ctxHabitos, {
        type: 'pie',
        data: {
            labels: habitosLabels,
            datasets: [{
                label: 'Distribuição dos Hábitos por Categoria',
                data: habitosData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

// Função para contar os hábitos por categoria
function contarHabitosPorCategoria() {
    const categorias = {};
    habitos.forEach(habito => {
        const categoria = habito.split(':')[0]; // Supondo que os hábitos são inseridos no formato "Categoria: Hábito"
        if (categorias[categoria]) {
            categorias[categoria]++;
        } else {
            categorias[categoria] = 1;
        }
    });
    return categorias;
}

// Chamada inicial para atualizar os gráficos
atualizarGraficos();
