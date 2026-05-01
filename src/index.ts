const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = [];
const listaPaginas: number[] = [];

titulos.push('O Hobbit', 'Clean Code', '1984', 'Dom Casmurro', 'O Nome do Vento');
autores.push('J.R.R. Tolkien', 'Robert C. Martin', 'George Orwell', 'Machado de Assis', 'Patrick Rothfuss');
anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);

function exibirBiblioteca(): void {
    console.log("=== MINHA BIBLIOTECA ===");
    
    titulos.forEach((titulo, i) => {
        const status = lido[i] ? `LIDO (${avaliacoes[i]}/5)` : "PENDENTE";
        console.log(`${i + 1}. "${titulo}" (${anos[i]}) - ${autores[i]} - ${paginas[i]} pag - ${status}`);
    });
}

exibirBiblioteca();

function adicionarLivro(titulo: string, autor: string, ano: number, paginas: number): void {
    if (ano > 0 && paginas > 0) {
        titulos.push(titulo);
        autores.push(autor);
        anos.push(ano);
        listaPaginas.push(paginas); 
        lido.push(false);            
        avaliacoes.push(0);          
        
        console.log(`Livro "${titulo}" adicionado com sucesso!`);
    } else {
        console.log("Erro: Ano e páginas devem ser valores positivos.");
    }
}

function removerLivro(indice: number): void {
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

console.log("\n--- Testando Cadastro ---");
adicionarLivro("A Sociedade do Anel", "J.R.R. Tolkien", 1954, 576);
adicionarLivro("O Código Limpo", "Robert C. Martin", 2008, 464);

console.log("\n--- Biblioteca Após Adições ---");
exibirBiblioteca();

console.log("\n--- Testando Remoção ---");
removerLivro(2);

console.log("\n--- Biblioteca Final ---");
exibirBiblioteca();  

function buscarPorTitulo(termo: string): number[] {
    const indicesEncontrados: number[] = [];

    titulos.forEach((titulo, index) => {
        if (titulo.toLowerCase().includes(termo.toLowerCase())) {
            indicesEncontrados.push(index);
        }
    });

    return indicesEncontrados;
}   

function listarPorAutor(autorBuscado: string): string[] {
    const indices = titulos.map((_, i) => i);

    return indices
        .filter(i => autores[i]?.toLowerCase() === autorBuscado.toLowerCase())
        .map(i => titulos[i] as string);
}

console.log("\n--- Testando Busca por Título (termo: 'Clean') ---");
const resultadosBusca = buscarPorTitulo("Clean");
resultadosBusca.forEach(i => console.log(`Encontrado: ${titulos[i]}`));

console.log("\n--- Testando Listagem por Autor (Tolkien) ---");
const livrosDoAutor = listarPorAutor("J.R.R. Tolkien");
console.log(`Livros de Tolkien: ${livrosDoAutor.join(", ")}`);

function marcarComoLido(indice: number, avaliacao: number): void {
    if (indice >= 0 && indice < titulos.length) {
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
    return titulos.filter((_, i) => lido[i]);
}

function listarPendentes(): string[] {
    return titulos.filter((_, i) => !lido[i]);
}

console.log("\n--- Testando Status de Leitura ---");
marcarComoLido(2, 4);

console.log("Livros Lidos:", listarLidos());
console.log("Livros Pendentes:", listarPendentes());

function totalLivros(): number {
    return titulos.length;
}

function totalLidos(): number {
    return lido.filter(status => status === true).length;
}

function percentualLidos(): number {
    const total = totalLivros();
    if (total === 0) return 0;
    return Number(((totalLidos() / total) * 100).toFixed(2));
}

function mediaAvaliacoes(): number {
    const notasLidos = avaliacoes.filter(nota => nota > 0);
    
    if (notasLidos.length === 0) return 0;

    const soma = notasLidos.reduce((acc, nota) => acc + nota, 0);
    return Number((soma / notasLidos.length).toFixed(2));
}

function livroMaiorAvaliacao(): string {
    if (titulos.length === 0) return "Nenhum livro cadastrado";

    return titulos.reduce((maior, atual, i) => {
        const indiceMaior = titulos.indexOf(maior);
        return avaliacoes[i]! > avaliacoes[indiceMaior]! ? atual : maior;
    });
}

function totalPaginasLidas(): number {
    return paginas.reduce((acc, qtd, i) => {
        return lido[i] ? acc + qtd : acc;
    }, 0);
}

console.log("\n=== ESTATÍSTICAS ===");
console.log(`Total de livros: ${totalLivros()}`);
console.log(`Livros lidos: ${totalLidos()}`);
console.log(`Percentual lidos: ${percentualLidos()}%`);
console.log(`Média de avaliações: ${mediaAvaliacoes()}`);
console.log(`Livro melhor avaliado: ${livroMaiorAvaliacao()}`);
console.log(`Total de páginas lidas: ${totalPaginasLidas()}`);

function exibirPorDecada(): void {
    console.log("\n=== POR DÉCADA ===");

    const todasDecadas = anos.map(ano => Math.floor(ano / 10) * 10);

    const decadasUnicas = [...new Set(todasDecadas)].sort((a, b) => a - b);

    decadasUnicas.forEach(decada => {
        const livrosDaDecada = titulos
            .filter((_, i) => Math.floor(anos[i]! / 10) * 10 === decada)
            .join(", ");

        console.log(`${decada}s: ${livrosDaDecada}`);
    });
}

exibirPorDecada();

console.log("\n" + "=".repeat(30));
console.log("   SISTEMA DE GESTÃO DE BIBLIOTECA");
console.log("=".repeat(30));

exibirBiblioteca();

console.log("\n>>> Cadastrando novos títulos...");
adicionarLivro("A Sociedade do Anel", "J.R.R. Tolkien", 1954, 576);
adicionarLivro("O Nome da Rosa", "Umberto Eco", 1980, 512);

console.log("\n>>> Buscando por 'Hobbit'...");
const busca = buscarPorTitulo("Hobbit");
if (busca.length > 0 && busca[0] !== undefined) {
    console.log(`Encontrado: ${titulos[busca[0]]}`);
    marcarComoLido(busca[0], 5);
}

console.log("\n" + "=".repeat(30));
console.log("   ESTATÍSTICAS DA COLEÇÃO");
console.log("=".repeat(30));
console.log(`Total de Livros:      ${totalLivros()}`);
console.log(`Livros Lidos:         ${totalLidos()} (${percentualLidos()}%)`);
console.log(`Média de Avaliações:  ${mediaAvaliacoes()}`);
console.log(`Livro Top da Lista:   ${livroMaiorAvaliacao()}`);
console.log(`Total Páginas Lidas:  ${totalPaginasLidas()}`);
console.log("-".repeat(30));

exibirPorDecada();

console.log("\n" + "=".repeat(30));
console.log("      FIM DA DEMONSTRAÇÃO");
console.log("=".repeat(30));