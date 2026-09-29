'use client';

import { useEffect, useMemo, useState } from 'react';
import { ShoppingCart, Wifi, Smartphone, Sun, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { products } from './products';

export default function ProductCatalog(){
  const [filter,setFilter]=useState<'all'|7.4|11|22>('all');
  useEffect(()=>{
    const handler=(event:Event)=>{const power=(event as CustomEvent<number>).detail; if(power===7.4||power===11||power===22)setFilter(power)};
    window.addEventListener('charger-filter',handler); return()=>window.removeEventListener('charger-filter',handler);
  },[]);
  const shown=useMemo(()=>filter==='all'?products:products.filter(p=>p.power===filter),[filter]);
  return <section id="termekek" className="wrap section productSection">
    <div className="sectionHead productHead"><div><span className="kicker">VÁLOGATOTT TÖLTŐK</span><h2>Elektromos autó töltők</h2><p>Szűrj teljesítmény szerint, vagy használd az autóválasztó ajánlását.</p></div>
      <div className="filterChips" role="group" aria-label="Töltők szűrése">
        {([['all','Összes'],[7.4,'7,4 kW'],[11,'11 kW'],[22,'22 kW']] as const).map(([v,l])=><button key={String(v)} className={filter===v?'active':''} onClick={()=>setFilter(v)}>{l}</button>)}
      </div>
    </div>
    {filter!=='all'&&<div className="filterNotice"><CheckCircle2/> Az autóválasztó alapján a <b>{String(filter).replace('.',',')} kW-os</b> töltőket mutatjuk. <button onClick={()=>setFilter('all')}>Összes mutatása</button></div>}
    <div className="shopProducts">{shown.map((p,i)=><article key={p.name} className="shopCard">
      <div className="shopVisual"><div className={'shopCharger s'+(i%4)}><span></span></div>{p.badge&&<label>{p.badge}</label>}<b>{String(p.power).replace('.',',')} kW</b></div>
      <div className="shopBody"><small>{p.smart}</small><h3><Link href={`/termekek/${p.slug}`}>{p.name}</Link></h3><div className="specs"><span>Type 2</span>{p.wifi&&<span><Wifi/> Wi‑Fi</span>}{p.app&&<span><Smartphone/> App</span>}{p.solar&&<span><Sun/> PV</span>}</div>
      <div className="shopBottom"><div><strong>{p.price}</strong><span className="stock">● {p.stock?'Raktáron':'Rendelésre'}</span></div><Link className="detailsBtn" href={`/termekek/${p.slug}`} aria-label={`${p.name} részletei`}><ArrowRight/></Link></div></div>
    </article>)}</div>
  </section>
}
