"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/content";

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

export function ProductsCatalogue() {
  const [category, setCategory] = useState("All");
  const list = useMemo(() => category === "All" ? products : products.filter(p => p.category === category), [category]);
  return <>
    <div className="product-filters" role="group" aria-label="Filter products by category">{categories.map(x => <button aria-pressed={category === x} className={category === x ? "active" : ""} onClick={() => setCategory(x)} key={x}>{x}</button>)}</div>
    <p className="filter-count" role="status">Showing {list.length} illustrative catalogue {list.length === 1 ? "item" : "items"}</p>
    <div className="product-grid">{list.map((p, i) => <article className="product-card" key={p.slug}><Link className="product-image" href={`/products/${p.slug}`}><Image src={p.image} alt={`${p.name} illustrative product image`} width={900} height={900} sizes="(max-width: 780px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectPosition: `${35 + (i % 3) * 20}% center` }} /><span>{p.availability}</span></Link><div><small>{p.category}</small><h2><Link href={`/products/${p.slug}`}>{p.name}</Link></h2><p>{p.description}</p><footer><strong>{p.price}</strong><Link aria-label={`View ${p.name}`} href={`/products/${p.slug}`}><ArrowUpRight /></Link></footer></div></article>)}</div>
  </>;
}
