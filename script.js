
// Função construtora principal
function fracao(numerador, denominador) {
    this.numerador = numerador;
    this.denominador = denominador;

    // Método para simplificar a fração
    this.simplificar = function() {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // Função recursiva para calcular o máximo divisor comum (MDC)
        const divisor = gcd(this.numerador, this.denominador); // Calcula o MDC do numerador e do denominador
        this.numerador /= divisor; // Divide o numerador pelo MDC para simplificar
        this.denominador /= divisor; // Divide o denominador pelo MDC para simplificar
        return this; // Retorna a fração simplificada
    };

    // Método para converter uma fração imprópria em número misto
    this.toMixedNumber = function() {
        const inteiro = Math.floor(this.numerador / this.denominador); // Parte inteira do número misto
        const resto = this.numerador % this.denominador; // Resto da divisão
        return {inteiro: inteiro, numerador: resto, denominador: this.denominador}; // Retorna o número misto como um objeto
    };

    // Método para converter um número misto em uma fração imprópria
    this.toImproperFraction = function() {
        const numerador = this.inteiro * this.denominador + this.numerador; // Calcula o numerador da fração imprópria
        return new fracao(numerador, this.denominador); // Retorna a fração imprópria
    };


    // Método para converter a fração para decimal
    this.decimal = function() {
        return this.numerador / this.denominador;
    };

    // Método para elevar a fração a um expoente
    this.pow = function(expoente) {
        if (expoente >= 0) {
            // Se o expoente for positivo
            return new fracao(
                Math.pow(this.numerador, expoente), // Eleva o numerador ao expoente
                Math.pow(this.denominador, expoente) // Eleva o denominador ao expoente
            ).simplificar(); // Simplifica a fração resultante
        } else {
            // Se o expoente for negativo, inverte a fração e eleva ao expoente positivo
            return new fracao(
                Math.pow(this.denominador, -expoente), // Eleva o denominador ao expoente positivo
                Math.pow(this.numerador, -expoente) // Eleva o numerador ao expoente positivo
            ).simplificar(); // Simplifica a fração resultante
        }
    };

    // Método para adicionar a segunda_fracao fração
    this.adicao = function(segunda_fracao) {
        return new fracao(
            this.numerador * segunda_fracao.denominador + segunda_fracao.numerador * this.denominador, // Calcula o numerador da soma
            this.denominador * segunda_fracao.denominador // Calcula o denominador da soma
        ).simplificar(); // Simplifica a fração resultante
    };

    // Método para subtrair segunda_fracao fração
    this.subtrair = function(segunda_fracao) {
        return new fracao(
            this.numerador * segunda_fracao.denominador - segunda_fracao.numerador * this.denominador, // Calcula o numerador da subtração
            this.denominador * segunda_fracao.denominador // Calcula o denominador da subtração
        ).simplificar(); // Simplifica a fração resultante
    };

    // Método para multiplicar pela segunda fração
    this.multiplicar = function(segunda_fracao) {
        return new fracao(
            this.numerador * segunda_fracao.numerador, // Calcula o numerador do produto
            this.denominador * segunda_fracao.denominador // Calcula o denominador do produto
        ).simplificar(); // Simplifica a fração resultante
    };

    // Método para dividir pela segunda fração
    this.dividir = function(segunda_fracao) {
        return new fracao(
            this.numerador * segunda_fracao.denominador, // Multiplica o numerador pelo denominador da segunda_fracao 
            this.denominador * segunda_fracao.numerador // Multiplica o denominador pelo numerador da segunda_fracao 
        ).simplificar(); // Simplifica a fração resultante
    };
}

// Função extra para criar uma fração e elevar a um expoente
function criar_fracao(num, denom, expoente) {
    return new fracao(num, denom).pow(expoente);
}

// Função principal para calcular o resultado com base na operação selecionada
function calcular() {
    // Valores de entrada do usuário
    const num1 = parseInt(document.getElementById('num1').value);
    const denom1 = parseInt(document.getElementById('denom1').value);
    const exp1 = parseInt(document.getElementById('exp1').value);

    const num2 = parseInt(document.getElementById('num2').value);
    const denom2 = parseInt(document.getElementById('denom2').value);
    const exp2 = parseInt(document.getElementById('exp2').value);

    // Cria frações a partir dos valores de entrada
    const f1 = criar_fracao(num1, denom1, exp1);
    const f2 = criar_fracao(num2, denom2, exp2);

    // Operação selecionada pelo usuário
    const op = document.getElementById('op').value;
    let result;

    // Realiza a operação selecionada
    switch (op) {
        case 'adicao':
            result = f1.adicao(f2);
            break;
        case 'sub':
            result = f1.subtrair(f2);
            break;
        case 'mult':
            result = f1.multiplicar(f2);
            break;
        case 'dividir':
            result = f1.dividir(f2);
            break;
        default:
            result = null;
    }

    // Mostra o resultado em fração, decimal e número misto
    document.getElementById('resultado').innerHTML = `Resultado em fração: ${result.numerador}/${result.denominador} <br> 
    Resultado em decimal: ${result.decimal().toFixed(3)} <br> 
    Resultado em número misto: ${result.toMixedNumber().inteiro} ${result.toMixedNumber().numerador}/${result.toMixedNumber().denominador}`;

}
