'use client';

import { useMemo, useState } from 'react';
import { BatteryCharging, Car, House, Sun, Building2, Zap } from 'lucide-react';

type Vehicle = { model: string; battery: number; acMax: number };
const vehicles: Record<string, Vehicle[]> = {
  Tesla: [
    { model: 'Model 3 RWD', battery: 60, acMax: 11 },
    { model: 'Model 3 Long Range', battery: 79, acMax: 11 },
    { model: 'Model Y RWD', battery: 60, acMax: 11 },
    { model: 'Model Y Long Range', battery: 79, acMax: 11 },
    { model: 'Model S', battery: 100, acMax: 11 },
    { model: 'Model X', battery: 100, acMax: 11 },
  ],
  Hyundai: [
    { model: 'Kona Electric 64 kWh', battery: 64, acMax: 11 },
    { model: 'IONIQ 5', battery: 84, acMax: 11 },
    { model: 'IONIQ 6', battery: 84, acMax: 11 },
  ],
  Kia: [
    { model: 'Niro EV', battery: 65, acMax: 11 },
    { model: 'EV3', battery: 81, acMax: 11 },
    { model: 'EV6', battery: 84, acMax: 11 },
  ],
  Volkswagen: [
    { model: 'ID.3', battery: 59, acMax: 11 },
    { model: 'ID.4', battery: 77, acMax: 11 },
    { model: 'ID.7', battery: 86, acMax: 11 },
  ],
  BMW: [
    { model: 'iX1', battery: 65, acMax: 11 },
    { model: 'i4', battery: 81, acMax: 11 },
    { model: 'iX', battery: 109, acMax: 11 },
  ],
  Nissan: [
    { model: 'Leaf 40 kWh', battery: 40, acMax: 6.6 },
    { model: 'Leaf e+ 62 kWh', battery: 62, acMax: 6.6 },
    { model: 'Ariya', battery: 87, acMax: 22 },
  ],
  Renault: [
    { model: 'Megane E-Tech', battery: 60, acMax: 22 },
    { model: 'Scenic E-Tech', battery: 87, acMax: 22 },
    { model: 'Zoe', battery: 52, acMax: 22 },
  ],
};

const usages = [
  { value: 'home', label: 'Otthoni töltés' },
  { value: 'solar', label: 'Napelemes töltés' },
  { value: 'business', label: 'Üzleti használat' },
];

export default function ChargerSelector() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [usage, setUsage] = useState('home');
  const [showResult, setShowResult] = useState(false);

  const selected = useMemo(() => vehicles[brand]?.find(v => v.model === model), [brand, model]);

  const recommendation = useMemo(() => {
    if (!selected) return null;
    const recommended = selected.acMax < 11 ? 7.4 : selected.acMax >= 22 && usage === 'business' ? 22 : 11;
    const effective = Math.min(recommended, selected.acMax);
    const hours = selected.battery / effective;
    return { recommended, effective, hours };
  }, [selected, usage]);

  function showProducts() {
    if (!recommendation) return;
    window.dispatchEvent(new CustomEvent('charger-filter', { detail: recommendation.recommended }));
    requestAnimationFrame(() => document.getElementById('termekek')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function submit() {
    if (!brand || !model) return;
    setShowResult(true);
    requestAnimationFrame(() => document.getElementById('tolto-ajanlas')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  }

  return <>
    <div className="selectGrid activeSelector">
      <label className="selectField">
        <Car />
        <select aria-label="Autómárka" value={brand} onChange={e => { setBrand(e.target.value); setModel(''); setShowResult(false); }}>
          <option value="">Válassz márkát</option>
          {Object.keys(vehicles).map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <label className={'selectField ' + (!brand ? 'disabled' : '')}>
        <BatteryCharging />
        <select aria-label="Modell" value={model} disabled={!brand} onChange={e => { setModel(e.target.value); setShowResult(false); }}>
          <option value="">Válassz modellt</option>
          {(vehicles[brand] || []).map(v => <option key={v.model} value={v.model}>{v.model}</option>)}
        </select>
      </label>
      <label className="selectField">
        {usage === 'solar' ? <Sun /> : usage === 'business' ? <Building2 /> : <House />}
        <select aria-label="Felhasználás" value={usage} onChange={e => { setUsage(e.target.value); setShowResult(false); }}>
          {usages.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
      </label>
      <button className="btn selectorButton" disabled={!brand || !model} onClick={submit}>Mutasd az ajánlott töltőket →</button>
    </div>

    {showResult && selected && recommendation && <div id="tolto-ajanlas" className="recommendation">
      <div className="recommendationIcon"><Zap /></div>
      <div className="recommendationMain">
        <span className="kicker">AJÁNLOTT OTTHONI MEGOLDÁS</span>
        <h3>{recommendation.recommended} kW-os Type 2 fali töltő</h3>
        <p><b>{brand} {selected.model}</b> • {selected.battery} kWh akkumulátor • max. {selected.acMax} kW AC töltés</p>
        <p className="recommendationNote">Becsült 0–100% AC töltési idő: <b>kb. {recommendation.hours.toFixed(1)} óra</b>. A tényleges időt az autó, a töltöttségi szint, a hőmérséklet és az otthoni elektromos hálózat is befolyásolja.</p>
        {usage === 'solar' && <p className="usageHint">Napelemes használathoz olyan okos töltőt érdemes választani, amely támogatja a PV-többlet követését és a dinamikus teljesítményszabályozást.</p>}
        {usage === 'business' && <p className="usageHint">Üzleti használatnál az RFID, fogyasztásmérés és terhelésmegosztás is fontos szempont lehet.</p>}
      </div>
      <button className="btn resultBtn" onClick={showProducts}>Töltők megtekintése →</button>
    </div>}
  </>;
}
