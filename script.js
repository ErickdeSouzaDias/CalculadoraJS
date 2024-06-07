function fracao(numerador, denominator) {
    this.numerador = numerador;
    this.denominator = denominator;

    this.simplificar = function() {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(this.numerador, this.denominator);
        this.numerador /= divisor;
        this.denominator /= divisor;
        return this;
    };

    this.decimal = function() {
        return this.numerador / this.denominator;
    };

    this.pow = function(expoente) {
        return new fracao(
            Math.pow(this.numerador, expoente),
            Math.pow(this.denominator, expoente)
        ).simplificar();
    };

    this.adicao = function(outro) {
        return new fracao(
            this.numerador * outro.denominator + outro.numerador * this.denominator,
            this.denominator * outro.denominator
        ).simplificar();
    };

    this.subtrair = function(outro) {
        return new fracao(
            this.numerador * outro.denominator - outro.numerador * this.denominator,
            this.denominator * outro.denominator
        ).simplificar();
    };

    this.multiplicar = function(outro) {
        return new fracao(
            this.numerador * outro.numerador,
            this.denominator * outro.denominator
        ).simplificar();
    };

    this.dividir = function(outro) {
        return new fracao(
            this.numerador * outro.denominator,
            this.denominator * outro.numerador
        ).simplificar();
    };
}

function criar_fracao(num, denom, expoente) {
    return new fracao(num, denom).pow(expoente);
}

function calcular() {
    const num1 = parseInt(document.getElementById('num1').value);
    const denom1 = parseInt(document.getElementById('denom1').value);
    const exp1 = parseInt(document.getElementById('exp1').value);

    const num2 = parseInt(document.getElementById('num2').value);
    const denom2 = parseInt(document.getElementById('denom2').value);
    const exp2 = parseInt(document.getElementById('exp2').value);

    const f1 = criar_fracao(num1, denom1, exp1);
    const f2 = criar_fracao(num2, denom2, exp2);

    const op = document.getElementById('op').value;
    let result;

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

    document.getElementById('resultado').innerText = `Resultado em fração: ${result.numerador}/${result.denominator}`;
    document.getElementById('resultado_decimal').innerText = `Resultado em decimal: ${result.decimal().toFixed(3)}`;
}
