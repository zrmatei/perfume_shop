//MARLY
import althair from '../assets/images/marly/althair.avif'
import oajan from '../assets/images/marly/oajan.avif'
import haltane from '../assets/images/marly/haltane.avif'
import layton from '../assets/images/marly/layton.avif'
import kalan from '../assets/images/marly/kalan.avif'
//TF
import cherry from '../assets/images/tom-ford/lost-cherry.avif'
import lq from '../assets/images/tom-ford/lacquer.avif'
import fatale from '../assets/images/tom-ford/vanille-fatale.avif'
import tb from '../assets/images/tom-ford/tobacco.avif'
import oud from '../assets/images/tom-ford/oudwood.avif'
//AMOUAGE
import dw from '../assets/images/amouage/dw.avif'
import hw from '../assets/images/amouage/hw.avif'
import rm from '../assets/images/amouage/rm.avif'
import im from '../assets/images/amouage/im.avif'
//CREED
import av from '../assets/images/creed/av.avif'
import ro from '../assets/images/creed/ro.avif'
import veti from '../assets/images/creed/veti.avif'
import sm from '../assets/images/creed/sm.avif'
//LABO
import a33 from '../assets/images/labo/a33.jpg'
import b22 from '../assets/images/labo/b22.jpg'
import r31 from '../assets/images/labo/r31.jpg'
import s33 from '../assets/images/labo/s33.jpg'
//CH
import ch1 from '../assets/images/ch/22.png'
import ch2 from '../assets/images/ch/33.png'
//DIOR
import d1 from '../assets/images/dior/fahr.avif'
import d2 from '../assets/images/dior/sauv.avif'
//CHANEL
import c1 from '../assets/images/chanel/cocom.avif'
import c2 from '../assets/images/chanel/n5.avif'
//HERMES
import h1 from '../assets/images/hermes/jardin.avif'
import h2 from '../assets/images/hermes/merv.avif'
import h3 from '../assets/images/hermes/terre.avif'
//FRANCIS
import mf1 from '../assets/images/mf/aqua.png'
import mf2 from '../assets/images/mf/rose.png'
import mf3 from '../assets/images/mf/rouge.png'
import mf4 from '../assets/images/mf/soir.png'
//MONTALE
import mp1 from '../assets/images/mont/aoud.avif'
import mp2 from '../assets/images/mont/cafe.avif'
import mp3 from '../assets/images/mont/spices.avif'


let id = 1;

function createPerfume(name, brand, image, price) {
    return {id: id++, name, brand, image, price};
}

const diorPerfumes = [
    {name: 'Sauvage', image: d2, price: 750},
    {name: 'Fahrenheit', image: d1, price: 450},
]

const chaPerfumes = [
    {name:'No. 5', image: c2, price: 650},
    {name:'Coco Mademoiselle', image: c1, price: 1350},
]

const pmPerfumes = [
    {name:'Oajan', image: oajan, price: 1050},
    {name:'Layton', image: layton, price: 1050},
    {name:'Althair', image: althair, price: 1090},
    {name:'Haltane', image: haltane, price: 1050},
    {name:'Kalan', image: kalan, price: 1050},
]

const tfPerfumes = [
    {name: 'Oud Wood', image: oud, price: 1350},
    {name: 'Lost Cherry', image: cherry, price: 1350},
    {name: 'Tobacco Vanille', image: tb, price: 1350},
    {name: 'Vanille Fattale', image: fatale, price: 1350},
    {name: 'Black Lacquer', image: lq, price: 1350},
]

const crPerfumes = [
    {name:'Aventus', image: av, price: 1550},
    {name:'Royal Oud', image: ro, price: 1550 },
    {name:'Original Vetiver', image: veti, price: 1475},
    {name:'Silver Mountain Water', image: sm, price: 1475},
] 

const amPerfumes = [
    {name:'Dia Woman', image: dw, price: 1825},
    {name:'Honour Woman', image: hw, price: 1825},
    {name:'Interlude Man', image: im, price: 1825 },
    {name:'Reflection Man', image: rm, price: 1825},
]

const herPerfumes = [
    {name: 'Terre d Hermès',image: h3, price: 545},
    {name: 'Eau des Merveilles',image: h2, price: 890},
    {name: 'Un Jardin Sur Le Neil',image: h1, price: 500}
]

const lbPerfumes = [
    {name: 'Santal 33', image: s33, price: 1025},
    {name: 'Another 13', image: a33, price: 1025},
    {name: 'Rose 31', image: r31, price: 1025},
    {name: 'Bergamote 22', image: b22, price: 1025}
]

const mfPerfumes = [
    {name: 'Baccarat Rouge 540',image: mf2, price: 1050},
    {name: 'À la rose',image: mf3, price: 1050},
    {name: 'Grand Soir',image: mf4, price: 1050},
    {name: 'Aqua Universalis',image: mf1, price: 1050}
]

const mPerfumes = [
    {name: 'Wood & Spices',image: mp3, price: 525},
    {name: 'Black Aoud',image: mp1, price: 525},
    {name: 'Intense Café',image: mp2, price: 525}
]

const chPerfumes = [
    {name: '+22+',image: ch1, price: 2350},
    {name: '+33+',image: ch2, price: 2350}
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