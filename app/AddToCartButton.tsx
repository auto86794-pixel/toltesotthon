'use client';
import {useState} from 'react';import {Check,ShoppingCart} from 'lucide-react';import {useCart} from './CartContext';
export default function AddToCartButton({slug}:{slug:string}){const {add}=useCart();const [done,setDone]=useState(false);return <button className="btn" onClick={()=>{add(slug);setDone(true);setTimeout(()=>setDone(false),1200)}}>{done?<><Check/> Kosárban</>:<><ShoppingCart/> Kosárba</>}</button>}
