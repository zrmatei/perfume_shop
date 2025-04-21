import althair from '../assets/images/althair.avif'

let id = 1;

function createPerfume(name, brand, image, price) {
    return {id: id++, name, brand, image, price};
}

const diorPerfumes = [
    {name: 'Sauvage', image: '/assets/sauvage.jpg', price: 120},
    {name: 'Fahrenheit', image: '/assets/sauvage.jpg', price: 90},
]

const chaPerfumes = [
    {name:'No. 5', image: '/assets/sauvage.jpg', price: 1350},
    {name:'Coco Mademoiselle', image: '/assets/sauvage.jpg', price: 1350},
]

const pmPerfumes = [
    {name:'Oajan', image: '/assets/sauvage.jpg', price: 1050},
    {name:'Layton', image: '/assets/sauvage.jpg', price: 1050},
    {name:'Althair', image: althair, price: 1090},
    {name:'Haltane', image: '/assets/sauvage.jpg', price: 1050},
    {name:'Kalan', image: '/assets/sauvage.jpg', price: 1050},
]

const tfPerfumes = [
    {name: 'Oud Wood', image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Lost Cherry', image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Tobacco Vanille', image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Vanille Fattale', image: '/assets/sauvage.jpg', price: 1350},
]

const crPerfumes = [
    {name:'Aventus', image: '/assets/sauvage.jpg', price: 1350},
    {name:'Royal Oud', image: '/assets/sauvage.jpg', price: 1350 },
    {name:'Original Vetiver', image: '/assets/sauvage.jpg', price: 1350 },
    {name:'Silver Mountain Water', image: '/assets/sauvage.jpg', price: 1350 },
] 

const amPerfumes = [
    {name:'Dia Woman', image: '/assets/sauvage.jpg', price: 1350 },
    {name:'Honour Woman', image: '/assets/sauvage.jpg', price: 1350},
    {name:'Interlude Man', image: '/assets/sauvage.jpg', price: 1350 },
    {name:'Reflection Man', image: '/assets/sauvage.jpg', price: 1350},
]

const herPerfumes = [
    {name: 'Terre d Hermès',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Eau des Merveilles',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Un Jardin Sur Le Neil',image: '/assets/sauvage.jpg', price: 1350}
]

const lbPerfumes = [
    {name: 'Santal 33',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Another 13',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Rose 31',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Bergamote 22',image: '/assets/sauvage.jpg', price: 1350}
]

const mfPerfumes = [
    {name: 'Baccarat Rouge 540',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'À la rose',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Grand Soir',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Aqua Universalis',image: '/assets/sauvage.jpg', price: 1350}
]

const mPerfumes = [
    {name: 'Oud Wood',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Black Aoud',image: '/assets/sauvage.jpg', price: 1350},
    {name: 'Intense Café',image: '/assets/sauvage.jpg', price: 1350}
]

const chPerfumes = [
    {name: '+22+',image: '/assets/sauvage.jpg', price: 1350},
    {name: '+33+',image: '/assets/sauvage.jpg', price: 1350}
]

const perfumes = [
    ...diorPerfumes.map(p => createPerfume(p.name, 'Dior', p.image, p.price)),
    ...chaPerfumes.map(p => createPerfume(p.name, 'Chanel', p.image, p.price)),
    ...tfPerfumes.map(p => createPerfume(p.name, 'Tom Ford', p.image, p.price)),
    ...pmPerfumes.map(p =>createPerfume(p.name, 'Parfums de Marly', p.image, p.price)),
    ...crPerfumes.map(p =>createPerfume(p.name, 'Creed', p.image, p.price)),
    ...amPerfumes.map(p =>createPerfume(p.name, 'Amouage', p.image, p.price)),
    ...herPerfumes.map(p =>createPerfume(p.name, 'Hermès', p.image, p.price)),
    ...lbPerfumes.map(p =>createPerfume(p.name, 'Le Labo', p.image, p.price)),
    ...mfPerfumes.map(p =>createPerfume(p.name, 'Maison Francis Kurkdjian', p.image, p.price)),
    ...mPerfumes.map(p =>createPerfume(p.name, 'Montale', p.image, p.price)),
    ...chPerfumes.map(p =>createPerfume(p.name, 'Chrome Hearts', p.image, p.price)),

];


export default perfumes;