'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {products} from './products';
export type CartLine={slug:string;qty:number};
type CartApi={items:CartLine[];count:number;add:(slug:string)=>void;remove:(slug:string)=>void;setQty:(slug:string,qty:number)=>void;clear:()=>void};
const CartContext=createContext<CartApi|null>(null);
const KEY='toltesotthon-cart-v1';
export function CartProvider({children}:{children:React.ReactNode}){
 const [items,setItems]=useState<CartLine[]>([]); const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(KEY);if(raw){const parsed=JSON.parse(raw) as CartLine[];setItems(parsed.filter(x=>products.some(p=>p.slug===x.slug)&&x.qty>0));}}catch{}finally{setReady(true)}},[]);
 useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(items))},[items,ready]);
 const api=useMemo<CartApi>(()=>({items,count:items.reduce((s,x)=>s+x.qty,0),add:(slug)=>setItems(a=>{const hit=a.find(x=>x.slug===slug);return hit?a.map(x=>x.slug===slug?{...x,qty:x.qty+1}:x):[...a,{slug,qty:1}]}),remove:(slug)=>setItems(a=>a.filter(x=>x.slug!==slug)),setQty:(slug,qty)=>setItems(a=>qty<=0?a.filter(x=>x.slug!==slug):a.map(x=>x.slug===slug?{...x,qty}:x)),clear:()=>setItems([])}),[items]);
 return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}
export function useCart(){const c=useContext(CartContext);if(!c)throw new Error('useCart must be inside CartProvider');return c}
