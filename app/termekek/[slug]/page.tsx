import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ShieldCheck, ShoppingCart, Smartphone, Sun, Wifi, Wrench, Zap } from 'lucide-react';
import { products } from '../../products';
import AddToCartButton from '../../AddToCartButton';
import CartButton from '../../CartButton';

export function generateStaticParams(){ return products.map((p)=>({slug:p.slug})); }

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const p=products.find((item)=>item.slug===slug);
  if(!p) notFound();
  return <main className="productPage">
    <header className="productTop"><Link href="/#termekek" className="backLink"><ArrowLeft/> Vissza a töltőkhöz</Link><Link className="productBrand" href="/"><span><Zap/></span><b>Töltés<em>Otthon</em></b></Link><CartButton/></header>
    <section className="productDetail wrap">
      <div className="detailVisual"><div className="detailCharger"><Zap/><i></i></div>{p.badge&&<span className="detailBadge">{p.badge}</span>}<b>{String(p.power).replace('.',',')} kW</b></div>
      <div className="detailInfo"><span className="kicker">{p.smart.toUpperCase()}</span><h1>{p.name}</h1><p className="detailLead">{p.description}</p>
        <div className="detailSpecs"><span>{p.connector}</span><span>{String(p.power).replace('.',',')} kW</span>{p.wifi&&<span><Wifi/> Wi-Fi</span>}{p.app&&<span><Smartphone/> App</span>}{p.solar&&<span><Sun/> Napelem-ready</span>}</div>
        <div className="availability"><CheckCircle2/> <b>{p.stock?'Raktáron':'Rendelésre'}</b> · Garancia: {p.warranty}</div>
        <div className="detailPrice">{p.price} <small>bruttó ár</small></div>
        <div className="detailActions"><AddToCartButton slug={p.slug}/><button className="installBtn"><Wrench/> Kérem telepítéssel</button></div>
        <p className="networkNote">A tényleges töltési teljesítmény az autó fedélzeti töltőjétől és az ingatlan elektromos hálózatától is függ.</p>
      </div>
    </section>
    <section className="wrap detailLower"><div><span className="kicker">MŰSZAKI ADATOK</span><h2>A legfontosabb tudnivalók</h2><div className="techGrid"><p><span>Teljesítmény</span><b>{String(p.power).replace('.',',')} kW</b></p><p><span>Csatlakozó</span><b>{p.connector}</b></p><p><span>Hálózat</span><b>{p.phases}</b></p><p><span>Védelem</span><b>{p.protection}</b></p><p><span>Kábel</span><b>{p.cable}</b></p><p><span>Garancia</span><b>{p.warranty}</b></p></div></div>
      <aside><ShieldCheck/><h3>Biztonságos választás</h3><p>Segítünk ellenőrizni, hogy a töltő illeszkedik-e az autódhoz és az otthoni hálózatodhoz.</p><Link className="btn" href="/#telepites">Telepítést kérek →</Link></aside>
    </section>
  </main>
}
