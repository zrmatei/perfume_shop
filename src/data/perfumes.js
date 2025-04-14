let id = 1;

function createPerfume(name, brand) {
    return {id: id++, name, brand};
}

const perfumes = [
    // Dior
    ...['Sauvage', 'Fahrenheit'].map(name => createPerfume(name, 'Dior')),
    // Chanel
    ...['No. 5', 'Coco Mademoiselle'].map(name => createPerfume(name, 'Chanel')),
    // TF
    ...['Oud Wood', 'Lost Cherry', 'Tobacco Vanille', 'Vanille Fattale'].map(name => createPerfume(name, 'Tom Ford')),
    // Marly
    ...['Oajan', 'Layton', 'Althair', 'Haltane', 'Kalan'].map(name =>createPerfume(name, 'Parfums de Marly'))
];

console.log(perfumes)

export default perfumes;