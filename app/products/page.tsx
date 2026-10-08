import type { Metadata } from "next";
import { ProductsCatalogue } from "@/components/products-client";
import { Breadcrumbs, CTASection, PageHero, SectionHeading } from "@/components/shared";

export const metadata: Metadata = { title: "Interior Products & Décor", description: "Explore an illustrative catalogue of furniture, lighting, rugs, curtains and interior accessories available by inquiry in Nepal." };
export default function ProductsPage(){return <main id="main-content"><PageHero eyebrow="The collection" title="Interior pieces chosen with the whole room in mind." text="Explore an illustrative catalogue of furniture, lighting, textiles and finishing details. Products are available by inquiry—not online checkout." image="/images/decor-still-life.png"/><Breadcrumbs current="Products"/><section className="section catalogue"><SectionHeading eyebrow="Browse the collection" title="Designed to layer, balance and belong." intro="Catalogue names, specifications and availability are placeholders. Replace them with verified inventory before launch."/><ProductsCatalogue/></section><CTASection/></main>}
