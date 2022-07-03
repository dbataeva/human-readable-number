module.exports = function toReadable(number) {
    const numberDictionary = createNumberDictionary();
    const postfixDictionary = createPostfixDictionary();
    let res = '';

    if (number === 0) {
        return ('zero');
    }
    if (number >= 1000000000000) {
        res += numbersInHundreds(Math.floor(number / 1000000000000), numberDictionary, postfixDictionary, 1000000000000);
        number %= 1000000000000;
    }
    if (number >= 1000000000) {
        if (res) {
            res += ' ';
        }
        res += numbersInHundreds(Math.floor(number / 1000000000), numberDictionary, postfixDictionary, 1000000000);
        number %= 1000000000;
    }
    if (number >= 1000000) {
        if (res) {
            res += ' ';
        }
        res += numbersInHundreds(Math.floor(number / 1000000), numberDictionary, postfixDictionary, 1000000);
        number %= 1000000;
    }
    if (number >= 1000) {
        if (res) {
            res += ' ';
        }
        res += numbersInHundreds(Math.floor(number / 1000), numberDictionary, postfixDictionary, 1000);
        number %= 1000;
    }
    if (res) {
        res += ' ';
    }
    res += numbersInHundreds(number, numberDictionary, postfixDictionary, 100);

    return (res);
}

function numbersInHundreds(hundreds, numberDictionary, postfixDictionary, magnitude) {
    let res = '';
    let tenCount = hundreds % 100;
    const hundredsCount = Math.floor(hundreds / 100);

    if (numberDictionary.has(hundredsCount)) {
        res += `${numberDictionary.get(hundredsCount)} ${postfixDictionary.get(100)}`;
    }
    if (tenCount && numberDictionary.has(tenCount)) {
        if (res) {
            res += ' ';
        }
        res += numberDictionary.get(tenCount);
    } else if (tenCount) {
        const digit = tenCount % 10; 
        
        if (res) {
            res += ' ';
        }
        tenCount -= digit;
        res += `${numberDictionary.get(tenCount)} ${numberDictionary.get(digit)}`;
    }
    if (magnitude !== 100 && postfixDictionary.has(magnitude)) {
        res += ` ${postfixDictionary.get(magnitude)}`;
    }

    return (res);
}

function createNumberDictionary() {
    let dictionary = new Map();

    dictionary.set(1, 'one');
    dictionary.set(2, 'two');
    dictionary.set(3, 'three');
    dictionary.set(4, 'four');
    dictionary.set(5, 'five');
    dictionary.set(6, 'six');
    dictionary.set(7, 'seven');
    dictionary.set(8, 'eight');
    dictionary.set(9, 'nine');

    dictionary.set(10, 'ten');
    dictionary.set(11, 'eleven');
    dictionary.set(12, 'twelve');
    dictionary.set(13, 'thirteen');
    dictionary.set(14, 'fourteen');
    dictionary.set(15, 'fifteen');
    dictionary.set(16, 'sixteen');
    dictionary.set(17, 'seventeen');
    dictionary.set(18, 'eighteen');
    dictionary.set(19, 'nineteen');

    dictionary.set(20, 'twenty');
    dictionary.set(30, 'thirty');
    dictionary.set(40, 'forty');
    dictionary.set(50, 'fifty');
    dictionary.set(60, 'sixty');
    dictionary.set(70, 'seventy');
    dictionary.set(80, 'eighty');
    dictionary.set(90, 'ninety');

    return (dictionary);
}

function createPostfixDictionary() {
    let dictionary = new Map();

    dictionary.set(100, 'hundred');
    dictionary.set(1000, 'thousand');
    dictionary.set(1000000, 'million');
    dictionary.set(1000000000, 'trillion');
    dictionary.set(1000000000000, 'billion');

    return (dictionary);
}
