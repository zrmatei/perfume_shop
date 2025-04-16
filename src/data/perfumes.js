let id = 1;

function createPerfume(name, brand) {
    return {id: id++, name, brand};
}

const perfumes = [
    ...['Sauvage', 'Fahrenheit'].map(name => createPerfume(name, 'Dior')),
    ...['No. 5', 'Coco Mademoiselle'].map(name => createPerfume(name, 'Chanel')),
    ...['Oud Wood', 'Lost Cherry', 'Tobacco Vanille', 'Vanille Fattale'].map(name => createPerfume(name, 'Tom Ford')),
    ...['Oajan', 'Layton', 'Althair', 'Haltane', 'Kalan'].map(name =>createPerfume(name, 'Parfums de Marly')),
    ...['Aventus', 'Royal Oud', 'Original Vetiver', 'Silver Mountain Water'].map(name =>createPerfume(name, 'Creed')),
    ...['Dia Woman', 'Honour Woman', 'Interlude Man', 'Reflection Man'].map(name =>createPerfume(name, 'Amouage')),
    ...['Terre d Hermès', 'Eau des Merveilles', 'Un Jardin Sur Le Neil'].map(name =>createPerfume(name, 'Hermès')),
    ...['Santal 33', 'Another 13', 'Rose 31', 'Bergamote 22'].map(name =>createPerfume(name, 'Le Labo')),
    ...['Baccarat Rouge 540', 'À la rose', 'Grand Soir', 'Aqua Universalis'].map(name =>createPerfume(name, 'Maison Francis Kurkdjian')),
    ...['Oud Wood', 'Black Aoud', 'Intense Café'].map(name =>createPerfume(name, 'Montale')),
    ...['+22+', '+33+'].map(name =>createPerfume(name, 'Chrome Hearts')),

];


export default perfumes;