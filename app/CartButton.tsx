'use client';
import Link from 'next/link';import {ShoppingCart} from 'lucide-react';import {useCart} from './CartContext';
export default function CartButton(){const {count}=useCart();return <Link className="cartHeader" href="/kosar" aria-label={`Kosár, ${count} termék`}><ShoppingCart size={21}/>{count>0&&<span>{count}</span>}</Link>}
