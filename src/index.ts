const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = []; // 0 se nao lido, 1 a 5 se lido
const listaPaginas: number[] = [];

titulos.push('O Hobbit', 'Clean Code', '1984', 'Dom Casmurro', 'O Nome do Vento');
autores.push('J.R.R. Tolkien', 'Robert C. Martin', 'George Orwell', 'Machado de Assis', 'Patrick Rothfuss');
anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);

function exibirBiblioteca(): void {
    console.log("=== MINHA BIBLIOTECA ===");
    
    // Usamos o array de títulos como base para o índice
    titulos.forEach((titulo, i) => {
        const status = lido[i] ? `LIDO (${avaliacoes[i]}/5)` : "PENDENTE";
        console.log(`${i + 1}. "${titulo}" (${anos[i]}) - ${autores[i]} - ${paginas[i]} pag - ${status}`);
    });
}

// Chame a função para testar
exibirBiblioteca();

function adicionarLivro(titulo: string, autor: string, ano: number, paginas: number): void {
    // Validação com if conforme solicitado
    if (ano > 0 && paginas > 0) {
        titulos.push(titulo);
        autores.push(autor);
        anos.push(ano);
        listaPaginas.push(paginas); // Use o nome exato que você deu ao array de páginas
        lido.push(false);            // Todo livro novo começa como não lido
        avaliacoes.push(0);          // E sem ava liação
        
        console.log(`Livro "${titulo}" adicionado com sucesso!`);
    } else {
        console.log("Erro: Ano e páginas devem ser valores positivos.");
    }
}

function removerLivro(indice: number): void {
    // Verificamos se o índice existe na lista
    if (indice >= 0 && indice < titulos.length) {
        const removido = titulos[indice];
        
        titulos.splice(indice, 1);
        autores.splice(indice, 1);
        anos.splice(indice, 1);
        listaPaginas.splice(indice, 1);
        lido.splice(indice, 1);
        avaliacoes.splice(indice, 1);
        
        console.log(`Livro "${removido}" removido com sucesso.`);
    } else {
        console.log("Erro: Índice inválido.");
    }
}

// --- ÁREA DE TESTES (ETAPA 3) ---
console.log("\n--- Testando Cadastro ---");
adicionarLivro("A Sociedade do Anel", "J.R.R. Tolkien", 1954, 576);
adicionarLivro("O Código Limpo", "Robert C. Martin", 2008, 464);

console.log("\n--- Biblioteca Após Adições ---");
exibirBiblioteca();

console.log("\n--- Testando Remoção ---");
removerLivro(2); // Remove o livro que estiver na posição 2 (índice 2)

console.log("\n--- Biblioteca Final ---");
exibirBiblioteca();  

function buscarPorTitulo(termo: string): number[] {
    const indicesEncontrados: number[] = [];

    // Percorremos os títulos para encontrar quais incluem o termo pesquisado
    titulos.forEach((titulo, index) => {
        if (titulo.toLowerCase().includes(termo.toLowerCase())) {
            indicesEncontrados.push(index);
        }
    });

    return indicesEncontrados;
}   

function listarPorAutor(autorBuscado: string): string[] {
    // 1. Criamos um array de índices baseado no tamanho da nossa biblioteca [0, 1, 2...]
    const indices = titulos.map((_, i) => i);

    return indices
        // 2. Filtramos apenas os índices onde o autor bate com a busca
        .filter(i => autores[i]?.toLowerCase() === autorBuscado.toLowerCase())
        // 3. Transformamos esses índices nos nomes dos títulos correspondentes
        .map(i => titulos[i] as string);
}

console.log("\n--- Testando Busca por Título (termo: 'Clean') ---");
const resultadosBusca = buscarPorTitulo("Clean");
resultadosBusca.forEach(i => console.log(`Encontrado: ${titulos[i]}`));

console.log("\n--- Testando Listagem por Autor (Tolkien) ---");
const livrosDoAutor = listarPorAutor("J.R.R. Tolkien");
console.log(`Livros de Tolkien: ${livrosDoAutor.join(", ")}`);

function marcarComoLido(indice: number, avaliacao: number): void {
    // Verifica se o índice existe na biblioteca
    if (indice >= 0 && indice < titulos.length) {
        // Validação da avaliação entre 1 e 5 conforme o roteiro
        if (avaliacao >= 1 && avaliacao <= 5) {
            lido[indice] = true;
            avaliacoes[indice] = avaliacao;
            console.log(`\nStatus atualizado: "${titulos[indice]}" agora está LIDO com nota ${avaliacao}.`);
        } else {
            console.log("Erro: A avaliação deve ser um número entre 1 e 5.");
        }
    } else {
        console.log("Erro: Índice inválido para marcação de leitura.");
    }
}

function listarLidos(): string[] {
    // Filtra os títulos cujo valor no array 'lido' seja true
    return titulos.filter((_, i) => lido[i]);
}

function listarPendentes(): string[] {
    // Filtra os títulos cujo valor no array 'lido' seja false
    return titulos.filter((_, i) => !lido[i]);
}

console.log("\n--- Testando Status de Leitura ---");
marcarComoLido(2, 4); // Marca o livro no índice 2 como lido

console.log("Livros Lidos:", listarLidos());
console.log("Livros Pendentes:", listarPendentes());

function totalLivros(): number {
    return titulos.length; // Retorna o tamanho total da coleção
}

function totalLidos(): number {
    // Filtra o array 'lido' para contar apenas os valores true
    return lido.filter(status => status === true).length;
}

function percentualLidos(): number {
    const total = totalLivros();
    if (total === 0) return 0;
    // Calcula a porcentagem e converte para número com 2 casas decimais
    return Number(((totalLidos() / total) * 100).toFixed(2));
}

function mediaAvaliacoes(): number {
    // Filtra as avaliações que são maiores que 0 (apenas livros lidos)
    const notasLidos = avaliacoes.filter(nota => nota > 0);
    
    if (notasLidos.length === 0) return 0;

    // Usa o reduce para somar todas as notas[cite: 1]
    const soma = notasLidos.reduce((acc, nota) => acc + nota, 0);
    return Number((soma / notasLidos.length).toFixed(2));
}

function livroMaiorAvaliacao(): string {
    if (titulos.length === 0) return "Nenhum livro cadastrado";

    // Usa o reduce para encontrar o título com a maior nota correspondente[cite: 1]
    return titulos.reduce((maior, atual, i) => {
        const indiceMaior = titulos.indexOf(maior);
        return avaliacoes[i]! > avaliacoes[indiceMaior]! ? atual : maior;
    });
}

function totalPaginasLidas(): number {
    // Usa o reduce percorrendo o array de páginas e somando apenas se lido[i] for true[cite: 1]
    // Importante: use o nome do seu array de páginas (paginas ou listaPaginas)
    return paginas.reduce((acc, qtd, i) => {
        return lido[i] ? acc + qtd : acc;
    }, 0);
}

console.log("\n=== ESTATÍSTICAS (ETAPA 6) ===");
console.log(`Total de livros: ${totalLivros()}`);
console.log(`Livros lidos: ${totalLidos()}`);
console.log(`Percentual lidos: ${percentualLidos()}%`);
console.log(`Média de avaliações: ${mediaAvaliacoes()}`);
console.log(`Livro melhor avaliado: ${livroMaiorAvaliacao()}`);
console.log(`Total de páginas lidas: ${totalPaginasLidas()}`);