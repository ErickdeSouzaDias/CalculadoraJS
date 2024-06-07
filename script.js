function Fraction(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;

    this.simplify = function() {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(this.numerator, this.denominator);
        this.numerator /= divisor;
        this.denominator /= divisor;
        return this;
    };

    this.toDecimal = function() {
        return this.numerator / this.denominator;
    };

    this.pow = function(exponent) {
        return new Fraction(
            Math.pow(this.numerator, exponent),
            Math.pow(this.denominator, exponent)
        ).simplify();
    };

    this.add = function(other) {
        return new Fraction(
            this.numerator * other.denominator + other.numerator * this.denominator,
            this.denominator * other.denominator
        ).simplify();
    };

    this.subtract = function(other) {
        return new Fraction(
            this.numerator * other.denominator - other.numerator * this.denominator,
            this.denominator * other.denominator
        ).simplify();
    };

    this.multiply = function(other) {
        return new Fraction(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        ).simplify();
    };

    this.divide = function(other) {
        return new Fraction(
            this.numerator * other.denominator,
            this.denominator * other.numerator
        ).simplify();
    };
}

function createFractionWithExponent(num, denom, exponent) {
    return new Fraction(num, denom).pow(exponent);
}

function calculate() {
    const num1 = parseInt(document.getElementById('num1').value);
    const denom1 = parseInt(document.getElementById('denom1').value);
    const exp1 = parseInt(document.getElementById('exp1').value);

    const num2 = parseInt(document.getElementById('num2').value);
    const denom2 = parseInt(document.getElementById('denom2').value);
    const exp2 = parseInt(document.getElementById('exp2').value);

    const fraction1 = createFractionWithExponent(num1, denom1, exp1);
    const fraction2 = createFractionWithExponent(num2, denom2, exp2);

    const operation = document.getElementById('operation').value;
    let result;

    switch (operation) {
        case 'add':
            result = fraction1.add(fraction2);
            break;
        case 'subtract':
            result = fraction1.subtract(fraction2);
            break;
        case 'multiply':
            result = fraction1.multiply(fraction2);
            break;
        case 'divide':
            result = fraction1.divide(fraction2);
            break;
        default:
            result = null;
    }

    document.getElementById('result').innerText = `Resultado: ${result.numerator}/${result.denominator}`;
    document.getElementById('resultDecimal').innerText = `Resultado em decimal: ${result.toDecimal()}`;
}
