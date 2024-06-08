function Fraction(numerador, denominador) {
    this.numerador = numerador;
    this.denominador = denominador;

    this.simplificar = function() {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(this.numerador, this.denominador);
        this.numerador /= divisor;
        this.denominador /= divisor;
        return this;
    };

    this.toDecimal = function() {
        return this.numerador / this.denominador;
    };

    this.pow = function(expoente) {
        if (expoente >= 0) {
            return new Fraction(
                Math.pow(this.numerador, expoente),
                Math.pow(this.denominador, expoente)
            ).simplificar();

            // Inverte para funcionar caso seja expoente negativo
        } else {
            return new Fraction(
                Math.pow(this.denominador, -expoente),
                Math.pow(this.numerador, -expoente)
            ).simplificar();
        }
    };

    this.adicao = function(outra_fracao) {
        return new Fraction(
            this.numerador * outra_fracao.denominador + outra_fracao.numerador * this.denominador,
            this.denominador * outra_fracao.denominador
        ).simplificar();
    };

    this.sub = function(outra_fracao) {
        return new Fraction(
            this.numerador * outra_fracao.denominador - outra_fracao.numerador * this.denominador,
            this.denominador * outra_fracao.denominador
        ).simplificar();
    };

    this.mult = function(outra_fracao) {
        return new Fraction(
            this.numerador * outra_fracao.numerador,
            this.denominador * outra_fracao.denominador
        ).simplificar();
    };

    this.divi = function(outra_fracao) {
        return new Fraction(
            this.numerador * outra_fracao.denominador,
            this.denominador * outra_fracao.numerador
        ).simplificar();
    };

    this.toMixedNumber = function() {
        const inteiro = Math.floor(this.numerador / this.denominador); 
        const resto = this.numerador % this.denominador; 
        return {inteiro: inteiro, numerador: resto, denominador: this.denominador}; 
    };
    
    
}

// Validar se é numero 
document.getElementById('num1').addEventListener('input', validadar_entrada);
document.getElementById('denom1').addEventListener('input', validadar_entrada);
document.getElementById('exp1').addEventListener('input', validadar_entrada);
document.getElementById('num2').addEventListener('input', validadar_entrada);
document.getElementById('denom2').addEventListener('input', validadar_entrada);
document.getElementById('exp2').addEventListener('input', validadar_entrada);

function validadar_entrada(event) {
    const valor = event.target.value; 
    const numero = parseFloat(valor); 


    if (isNaN(numero)) {
    
        event.target.value = '';
    }
}

function criar_fracao(num, denom, expoente) {
    return new Fraction(num, denom).pow(expoente);
}

function calcular() {
    const num1 = parseInt(document.getElementById('num1').value);
    const denom1 = parseInt(document.getElementById('denom1').value);
    const exp1 = document.getElementById('exp1').value.trim() === '' ? 1 : parseInt(document.getElementById('exp1').value);

    const num2 = parseInt(document.getElementById('num2').value);
    const denom2 = parseInt(document.getElementById('denom2').value);
    const exp2 = document.getElementById('exp2').value.trim() === '' ? 1 : parseInt(document.getElementById('exp2').value);

    const f1 = criar_fracao(num1, denom1, exp1);
    const f2 = criar_fracao(num2, denom2, exp2);

    const op = document.getElementById('op').value;
    let result;

    switch (op) {
        case 'adicao':
            result = f1.adicao(f2);
            break;
        case 'sub':
            result = f1.sub(f2);
            break;
        case 'mult':
            result = f1.mult(f2);
            break;
        case 'divi':
            result = f1.divi(f2);
            break;
        default:
            result = null;
    }

    if (result) {
        const mixedNumber = result.toMixedNumber();
        const mixedNumberStr = mixedNumber.inteiro !== 0 
            ? `${mixedNumber.inteiro} <span class="fracao">${formata_numero(mixedNumber.numerador, 'numerador')}<span class="denominador">${formata_numero(mixedNumber.denominador, 'denominador')}</span></span>`
            : `<span class="fracao">${formata_numero(mixedNumber.numerador, 'numerador')}<span class="denominador">${formata_numero(mixedNumber.denominador, 'denominador')}</span></span>`;

        document.getElementById('resultado').innerHTML = `
            Fração: <span class="fracao">${formata_numero(result.numerador, 'numerador')}<span class="denominador">${formata_numero(result.denominador, 'denominador')}</span></span> <br> 
            Decimal: ${result.toDecimal().toFixed(3)} <br> 
            Misto: ${mixedNumberStr}`;
    } else {
        document.getElementById('resultado').innerHTML = `Operação inválida.`;
    }
}

// Função para formatar e adicionar a classe "large" se for grande (não ta funcionando ainda)
function formata_numero(numero, tipo) {
    const tamanho = numero.toString().length;
    return tamanho > 4 ? `<span class="${tipo} large">${numero}</span>` : `<span class="${tipo}">${numero}</span>`;
}

function limparCampos() {
    document.getElementById('num1').value = '';
    document.getElementById('denom1').value = '';
    document.getElementById('exp1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('denom2').value = '';
    document.getElementById('exp2').value = '';
    document.getElementById('resultado').innerHTML = '';
}


    

