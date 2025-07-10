const perfumesData = [
  { name: 'Sauvage', brand: 'Dior', image: 'dior/sauv.avif', price: 750, category: ['Aromatic', 'Fresh', 'Woody'] },
  { name: 'Fahrenheit', brand: 'Dior', image: 'dior/fahr.avif', price: 450, category: ['Leather', 'Woody', 'Floral'] },
  { name: 'No. 5', brand: 'Chanel', image: 'chanel/n5.avif', price: 650, category: ['Floral', 'Aldehydic'] },
  { name: 'Coco Mademoiselle', brand: 'Chanel', image: 'chanel/cocom.avif', price: 1350, category: ['Citrus', 'Chypre', 'Floral'] },
  { name: 'Oud Wood', brand: 'Tom Ford', image: 'tom-ford/oudwood.avif', price: 1350, category: ['Woody', 'Oriental'] },
  { name: 'Lost Cherry', brand: 'Tom Ford', image: 'tom-ford/lost-cherry.avif', price: 1350, category: ['Fruity', 'Oriental'] },
  { name: 'Tobacco Vanille', brand: 'Tom Ford', image: 'tom-ford/tobacco.avif', price: 1350, category: ['Oriental', 'Spicy'] },
  { name: 'Vanille Fattale', brand: 'Tom Ford', image: 'tom-ford/vanille-fatale.avif', price: 1350, category: ['Oriental', 'Vanilla'] },
  { name: 'Black Lacquer', brand: 'Tom Ford', image: 'tom-ford/lacquer.avif', price: 1350, category: ['Oriental', 'Woody'] },
  { name: 'Oajan', brand: 'Parfums de Marly', image: 'marly/oajan.avif', price: 1050, category: ['Oriental', 'Spicy'] },
  { name: 'Layton', brand: 'Parfums de Marly', image: 'marly/layton.avif', price: 1050, category: ['Oriental', 'Fresh', 'Spicy'] },
  { name: 'Althair', brand: 'Parfums de Marly', image: 'marly/althair.avif', price: 1090, category: ['Vanilla', 'Warm Spicy'] },
  { name: 'Haltane', brand: 'Parfums de Marly', image: 'marly/haltane.avif', price: 1050, category: ['Woody', 'Aromatic'] },
  { name: 'Kalan', brand: 'Parfums de Marly', image: 'marly/kalan.avif', price: 1050, category: ['Spicy', 'Woody'] },
  { name: 'Aventus', brand: 'Creed', image: 'creed/av.avif', price: 1550, category: ['Fruity', 'Chypre'] },
  { name: 'Royal Oud', brand: 'Creed', image: 'creed/ro.avif', price: 1550, category: ['Woody', 'Oriental'] },
  { name: 'Original Vetiver', brand: 'Creed', image: 'creed/veti.avif', price: 1475, category: ['Woody', 'Citrus'] },
  { name: 'Silver Mountain Water', brand: 'Creed', image: 'creed/sm.avif', price: 1475, category: ['Aromatic', 'Fresh'] },
  { name: 'Dia Woman', brand: 'Amouage', image: 'amouage/dw.avif', price: 1825, category: ['Floral', 'Aldehydic'] },
  { name: 'Honour Woman', brand: 'Amouage', image: 'amouage/hw.avif', price: 1825, category: ['Floral', 'White Floral'] },
  { name: 'Interlude Man', brand: 'Amouage', image: 'amouage/im.avif', price: 1825, category: ['Oriental', 'Spicy', 'Woody'] },
  { name: 'Reflection Man', brand: 'Amouage', image: 'amouage/rm.avif', price: 1825, category: ['Floral', 'Woody', 'Musk'] },
  { name: 'Terre d Hermès', brand: 'Hermès', image: 'hermes/terre.avif', price: 545, category: ['Woody', 'Spicy'] },
  { name: 'Eau des Merveilles', brand: 'Hermès', image: 'hermes/merv.avif', price: 890, category: ['Amber', 'Woody'] },
  { name: 'Un Jardin Sur Le Neil', brand: 'Hermès', image: 'hermes/jardin.avif', price: 500, category: ['Fruity', 'Green'] },
  { name: 'Santal 33', brand: 'Le Labo', image: 'labo/s33.jpg', price: 1025, category: ['Woody', 'Aromatic'] },
  { name: 'Another 13', brand: 'Le Labo', image: 'labo/a33.jpg', price: 1025, category: ['Musk', 'Ambery'] },
  { name: 'Rose 31', brand: 'Le Labo', image: 'labo/r31.jpg', price: 1025, category: ['Floral', 'Woody'] },
  { name: 'Bergamote 22', brand: 'Le Labo', image: 'labo/b22.jpg', price: 1025, category: ['Citrus', 'Aromatic'] },
  { name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', image: 'mf/rouge.png', price: 1050, category: ['Amber', 'Floral', 'Woody'] },
  { name: 'À la rose', brand: 'Maison Francis Kurkdjian', image: 'mf/rose.png', price: 1050, category: ['Floral'] },
  { name: 'Grand Soir', brand: 'Maison Francis Kurkdjian', image: 'mf/soir.png', price: 1050, category: ['Amber', 'Vanilla'] },
  { name: 'Aqua Universalis', brand: 'Maison Francis Kurkdjian', image: 'mf/aqua.png', price: 1050, category: ['Citrus', 'Musk'] },
  { name: 'Wood & Spices', brand: 'Montale', image: 'mont/spices.avif', price: 525, category: ['Woody', 'Spicy'] },
  { name: 'Black Aoud', brand: 'Montale', image: 'mont/aoud.avif', price: 525, category: ['Woody', 'Rose'] },
  { name: 'Intense Café', brand: 'Montale', image: 'mont/cafe.avif', price: 525, category: ['Gourmand', 'Rose'] },
  { name: '+22+', brand: 'Chrome Hearts', image: 'ch/22.png', price: 2350, category: ['Oriental', 'Spicy'] },
  { name: '+33+', brand: 'Chrome Hearts', image: 'ch/33.png', price: 2350, category: ['Woody', 'Amber'] }
];

export function createPrompt(msg) {
  return`
    Recomanda 1-2 parfumuri din lista asta (sa nu uiti pretul in cazul in care te intreb ulterior de detalii legate de pret), tinand cont cuvintele cheie legate de categorie (lemnoase, fructate, orientale, etc...), apropo, nu vreau diacritice in text:
    Lista parfumuri:
    ${perfumesData.map(p => `${p.name} (${p.brand}) - pret: ${p.price} lei - categorie: ${p.category}`).join('\n')}

    Exemple:
    Client: "Vreau un parfum fructat pentru vara"
    Raspuns: "Recomand Aqua Universalis de la Maison Francis Kurkdjian sau No. 5 de la Chanel, parfumuri cu note fructate si fresh, perfecte pentru vara."

    Client: "Ce parfum lemnos sa port in toamna?"
    Raspuns: "Pentru toamna, parfumurile lemnoase precum Sauvage sau Fahrenheit de la Dior sunt o alegere excelenta, cu note calde si persistente."

    Client: "${msg}"
    Raspuns:


    Apropo, in cazul in care intrebarea este una ce nu are treaba cu parfumurile, vreau sa raspunzi ceva de genul:
    Raspuns: Aceasta intrebare nu este legata de parfumuri, pune alta.
  `
}

export default perfumesData;