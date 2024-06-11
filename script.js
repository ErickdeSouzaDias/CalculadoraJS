class Fracao {
    constructor(numerador, denominador) {
        this.numerador = numerador;
        this.denominador = denominador;
    }

    simplificar() {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(this.numerador, this.denominador);
        let numeradorSimplificado = this.numerador / divisor;
        let denominadorSimplificado = this.denominador / divisor;

        if (denominadorSimplificado < 0) {
            numeradorSimplificado *= -1;
            denominadorSimplificado *= -1;
        }

        const simplificacao = divisor !== 1 ? 
            `Simplificação: ${this.numerador} ÷ ${divisor} / ${this.denominador} ÷ ${divisor} = ${numeradorSimplificado}/${denominadorSimplificado}` : 
            `A fração já está simplificada.`;

        this.numerador = numeradorSimplificado;
        this.denominador = denominadorSimplificado;
        return { simplificada: this, passos: simplificacao };
    }

    toDecimal() {
        return this.numerador / this.denominador;
    }

    pow(expoente) {
        if (expoente >= 0) {
            return new Fracao(
                Math.pow(this.numerador, expoente),
                Math.pow(this.denominador, expoente)
            ).simplificar();
        } else {
            return new Fracao(
                Math.pow(this.denominador, -expoente),
                Math.pow(this.numerador, -expoente)
            ).simplificar();
        }
    }

    mmc(a, b) {
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        return Math.abs(a * b) / gcd(a, b);
    }

    adicao(outra_fracao) {
        const mmc = this.mmc(this.denominador, outra_fracao.denominador);
        const novoNumerador = (this.numerador * (mmc / this.denominador)) + (outra_fracao.numerador * (mmc / outra_fracao.denominador));
        const { simplificada, passos } = new Fracao(novoNumerador, mmc).simplificar();
        return {
            result: simplificada,
            steps: `MMC(${this.denominador}, ${outra_fracao.denominador}) = ${mmc}\n` +
                   `${this.numerador} * (${mmc} / ${this.denominador}) + ${outra_fracao.numerador} * (${mmc} / ${outra_fracao.denominador}) = ${novoNumerador}\n` +
                   passos
        };
    }

    sub(outra_fracao) {
        const mmc = this.mmc(this.denominador, outra_fracao.denominador);
        const novoNumerador = (this.numerador * (mmc / this.denominador)) - (outra_fracao.numerador * (mmc / outra_fracao.denominador));
        const { simplificada, passos } = new Fracao(novoNumerador, mmc).simplificar();
        return {
            result: simplificada,
            steps: `MMC(${this.denominador}, ${outra_fracao.denominador}) = ${mmc}\n` +
                   `${this.numerador} * (${mmc} / ${this.denominador}) - ${outra_fracao.numerador} * (${mmc} / ${outra_fracao.denominador}) = ${novoNumerador}\n` +
                   passos
        };
    }

    mult(outra_fracao) {
        const novoNumerador = this.numerador * outra_fracao.numerador;
        const novoDenominador = this.denominador * outra_fracao.denominador;
        const { simplificada, passos } = new Fracao(novoNumerador, novoDenominador).simplificar();
        return {
            result: simplificada,
            steps: `${this.numerador} * ${outra_fracao.numerador} = ${novoNumerador}\n` +
                   `${this.denominador} * ${outra_fracao.denominador} = ${novoDenominador}\n` +
                   passos
        };
    }

    divi(outra_fracao) {
        const novoNumerador = this.numerador * outra_fracao.denominador;
        const novoDenominador = this.denominador * outra_fracao.numerador;
        const { simplificada, passos } = new Fracao(novoNumerador, novoDenominador).simplificar();
        return {
            result: simplificada,
            steps: `${this.numerador} * ${outra_fracao.denominador} = ${novoNumerador}\n` +
                   `${this.denominador} * ${outra_fracao.numerador} = ${novoDenominador}\n` +
                   passos
        };
    }

    toMixedNumber() {
        const inteiro = Math.floor(this.numerador / this.denominador);
        const resto = this.numerador % this.denominador;
        return { inteiro: inteiro, numerador: resto, denominador: this.denominador };
    }
}

// EM TESTES

// document.getElementById('num1').addEventListener('input', validar_entrada);
// document.getElementById('denom1').addEventListener('input', validar_entrada);
// document.getElementById('exp1').addEventListener('input', validar_entrada);
// document.getElementById('num2').addEventListener('input', validar_entrada);
// document.getElementById('denom2').addEventListener('input', validar_entrada);
// document.getElementById('exp2').addEventListener('input', validar_entrada);

// function validar_entrada(event) {
//     console.log("Validando entrada...");
//     const valor = event.target.value;
//     const numero = parseFloat(valor);
//     if (isNaN(numero) && valor !== '-') {
//         event.target.value = '';
//     }
// }

function criar_fracao(num, denom, expoente) {
    return new Fracao(num, denom).pow(expoente).simplificada;
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
    let result, steps;

    switch (op) {
        case 'adicao':
            ({ result, steps } = f1.adicao(f2));
            break;
        case 'sub':
            ({ result, steps } = f1.sub(f2));
            break;
        case 'mult':
            ({ result, steps } = f1.mult(f2));
            break;
        case 'divi':
            ({ result, steps } = f1.divi(f2));
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

        document.getElementById('calculos').innerHTML = steps.replace(/\n/g, '<br>');
    } else {
        document.getElementById('resultado').innerHTML = `Operação inválida.`;
        document.getElementById('calculos').innerHTML = ``;
    }
}

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
    document.getElementById('calculos').innerHTML = '';
}
