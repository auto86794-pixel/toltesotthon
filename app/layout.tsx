import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './CartContext';
export const metadata: Metadata = { title: 'TöltésOtthon | Elektromos autó töltők', description: 'Otthoni és üzleti elektromos autó töltők, telepítéssel és szakértői segítséggel.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="hu"><body><CartProvider>{children}</CartProvider></body></html>}
