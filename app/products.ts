export type Product = {
  slug: string; name: string; power: 7.4|11|22; price: string; smart: string;
  wifi: boolean; app: boolean; solar: boolean; stock: boolean; badge?: string;
  warranty: string; connector: string; phases: string; protection: string; cable: string;
  description: string;
};

export const products: Product[] = [
  {slug:'home-7',name:'Home 7',power:7.4,price:'99 900 Ft',smart:'Kompakt otthoni fali töltő',wifi:false,app:false,solar:false,stock:true,warranty:'3 év',connector:'Type 2',phases:'1 fázis / 32 A',protection:'IP54',cable:'5 m',description:'Egyszerű és megbízható otthoni töltő azoknak, akik 7,4 kW teljesítménnyel szeretnék tölteni elektromos autójukat.'},
  {slug:'pulse-home',name:'Pulse Home',power:11,price:'189 900 Ft',smart:'Okos fali töltő',wifi:true,app:true,solar:false,stock:true,badge:'Népszerű',warranty:'3 év',connector:'Type 2',phases:'3 fázis / 16 A',protection:'IP55',cable:'5 m',description:'Modern, alkalmazásból vezérelhető 11 kW-os otthoni fali töltő Wi-Fi kapcsolattal és intelligens töltési funkciókkal.'},
  {slug:'solar-sync',name:'Solar Sync',power:11,price:'219 900 Ft',smart:'Napelem-ready okos töltő',wifi:true,app:true,solar:true,stock:true,badge:'Napelemhez',warranty:'3 év',connector:'Type 2',phases:'3 fázis / 16 A',protection:'IP55',cable:'5 m',description:'Napelemes rendszerhez előkészített intelligens töltő, amellyel a saját megtermelt energiád nagyobb részét használhatod autózásra.'},
  {slug:'volt-pro',name:'Volt Pro',power:22,price:'239 900 Ft',smart:'Nagy teljesítményű fali töltő',wifi:true,app:true,solar:false,stock:true,warranty:'3 év',connector:'Type 2',phases:'3 fázis / 32 A',protection:'IP55',cable:'5 m',description:'Nagy teljesítményű, 22 kW-os intelligens fali töltő olyan helyekre, ahol az elektromos hálózat és az autó is képes kihasználni a magasabb AC teljesítményt.'},
  {slug:'business-pro-rfid',name:'Business Pro RFID',power:22,price:'279 900 Ft',smart:'Üzleti töltő RFID hozzáféréssel',wifi:true,app:true,solar:false,stock:true,badge:'Üzleti',warranty:'3 év',connector:'Type 2',phases:'3 fázis / 32 A',protection:'IP55',cable:'5 m',description:'RFID azonosítással ellátott 22 kW-os töltő céges parkolókhoz, társasházakhoz és szabályozott hozzáférést igénylő helyszínekhez.'},
  {slug:'eco-smart',name:'Eco Smart',power:11,price:'169 900 Ft',smart:'Egyszerű okos otthoni töltő',wifi:true,app:true,solar:false,stock:true,warranty:'3 év',connector:'Type 2',phases:'3 fázis / 16 A',protection:'IP54',cable:'5 m',description:'Jó ár-érték arányú 11 kW-os okos töltő Wi-Fi és alkalmazásvezérléssel, mindennapi otthoni használatra.'},
];
