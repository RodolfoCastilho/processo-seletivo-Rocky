const fs = require('fs');

// Ler o arquivo JSON
function readFile() {
    const rawData = fs.readFileSync('broken-database.json');
    const rawFile = JSON.parse(rawData);
    return rawFile;
}

// Corrigir nomes
function updateCharacters(text) {
    // Mapeia as alterações
    const mapObj = {
        'æ' : 'a',
        '¢' : 'c',
        'ß' : 'b',
        'ø' : 'o',
    }
    // Substitui pelo correto
    return text.replace(/æ|¢|ß|ø/gi, function(match) {
        return mapObj[match]
    })
   
}

// Corrigir preços 
function updatePrices(price) {
    // Transforma o preço para number
    return parseFloat(price);

}

// Corrigir as quantidades
function updateQuantity(quantity = 0) {
    return quantity;
}

// Exportar o arquivo corrigido 
 function exportUpdatedFile() {
    const updatedFile = readFile().map(item => ({
        id: item.id,
        name: updateCharacters(item.name), 
        quantity: updateQuantity(item.quantity),
        price: updatePrices(item.price),
        category: item.category
    }))

    return fs.writeFileSync('saida.json', JSON.stringify(updatedFile, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

// Ordenar os dados
function orderNewDatabase() {
    const rawData = fs.readFileSync('saida.json');
    const rawFile = JSON.parse(rawData);
    
    rawFile.sort((a,b) => {
        if (a.id > b.id) {
            return 1;
        } 
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    })

    rawFile.sort( (a,b) => {
        if (a.category > b.category) {
            return 1;
        } 
        if (a.category < b.category) {
            return -1;
        }
        return 0;
    })

    return fs.writeFile('saida-ordenada.json', JSON.stringify(rawFile, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

// Calcular o preço 
function totalCalculated() {
    const rawData = fs.readFileSync('saida.json');
    const rawFile = JSON.parse(rawData);

    
    const totalValue = rawFile.reduce((accumulator, item) => {
        return accumulator += (item.price * item.quantity);
    }, 0)
    console.log(totalValue);
    return totalValue;
}

exportUpdatedFile();

orderNewDatabase();

totalCalculated();

// A função de exportação e de ordenar o arquivo em ordem alfabética e crescente foram retirados do StackOverflow.