import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { BookingButton } from "@/components/site-shell";
import { products } from "@/data/content";

export function generateStaticParams(){ return products.map(p => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> { const {slug}=await params; const p=products.find(x=>x.slug===slug); return p ? { title: p.name, description: p.description } : {}; }

export default async function ProductDetail({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params; const product=products.find(p=>p.slug===slug); if(!product) notFound();
  const related=products.filter(p=>p.slug!==slug && p.category===product.category).slice(0,2);
  return <main id="main-content" className="product-detail-page"><Link className="back-link" href="/products"><ArrowLeft size={16}/> Back to products</Link><section className="product-detail"><div className="product-detail-images"><Image src={product.image} alt={`${product.name} illustrative view`} width={1024} height={1024} sizes="(max-width: 780px) 100vw, 55vw"/><div><Image src={product.image} alt={`${product.name} detail view`} width={700} height={500}/><Image src={product.image} alt={`${product.name} styled context`} width={700} height={500}/></div></div><div className="product-info"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p className="product-description">{product.description}</p><strong className="product-price">{product.price}</strong><dl><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Dimensions</dt><dd>{product.dimensions}</dd></div><div><dt>Color options</dt><dd>{product.colors}</dd></div><div><dt>Availability</dt><dd>{product.availability}</dd></div></dl><div className="inquiry-note"><Check/>This is an inquiry-based catalogue. No online purchase is implied.</div><Link className="button button-dark" href="/contact"><Mail size={17}/> Inquire about this product</Link><BookingButton>Ask during a consultation</BookingButton></div></section>{related.length>0&&<section className="related-products"><h2>Related products</h2>{related.map(p=><Link href={`/products/${p.slug}`} key={p.slug}><Image src={p.image} alt="" width={700} height={500}/><span>{p.name}</span></Link>)}</section>}</main>;
}
