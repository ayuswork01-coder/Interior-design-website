import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, HomeIcon, Quote } from "lucide-react";
import { BookingButton } from "@/components/site-shell";
import { CTASection, SectionHeading } from "@/components/shared";
import { faqs, processSteps, products, services, trustItems } from "@/data/content";

export default function Home() {
  return <main id="main-content">
    <section className="home-hero">
      <Image className="hero-image" src="/images/hero-living-room.png" alt="Warm, refined living room in a completed contemporary home" fill priority sizes="100vw" />
      <div className="hero-overlay" />
      <div className="hero-content"><span className="eyebrow">Interior design consultation • Nepal</span><h1>Turn your newly built house into a home you love.</h1><p>We visit your completed home, understand its spaces and your lifestyle, then guide every interior choice—from layout and color to furniture, lighting and décor.</p><div className="hero-actions"><BookingButton>Book an appointment <ArrowRight size={17} /></BookingButton><Link className="button button-ghost" href="/services">Explore our services</Link></div><div className="hero-note"><span><Check size={15} /> On-site guidance</span><span><Check size={15} /> No structural alterations</span></div></div>
      <div className="hero-side-note"><span>01</span><p>Guidance designed around the home you already built.</p></div>
    </section>

    <section className="trust-strip" aria-label="Our approach">{trustItems.map(({ title, icon: Icon }) => <div key={title}><Icon size={21} strokeWidth={1.5} /><span>{title}</span></div>)}</section>

    <section className="section split-about">
      <div className="editorial-image"><Image src="/images/editorial-bedroom.png" alt="Layered neutral bedroom styled with warm wood and soft textiles" width={1024} height={1365} sizes="(max-width: 780px) 100vw, 50vw" /><div className="image-caption"><span>Every room begins with listening.</span><small>Styling concept image</small></div></div>
      <div className="about-copy"><SectionHeading eyebrow="A home, made personal" title="Beautiful decisions. Thoughtfully connected." /><p className="lead">A completed house is only the beginning. We help bridge the space between construction and belonging—so every room feels considered, comfortable and unmistakably yours.</p><p>Our role is not to change the structure. It is to understand what is already there, see its possibilities and create a confident interior direction around your life.</p><Link className="text-link" href="/about">Learn more about our approach <ArrowRight size={16} /></Link><div className="scope-card"><HomeIcon size={22} /><div><strong>Design guidance, not construction</strong><p>We plan, style and recommend. We do not move walls or alter foundations, columns, beams or structural infrastructure.</p></div></div></div>
    </section>

    <section className="section services-preview">
      <div className="heading-row"><SectionHeading eyebrow="What we can help you decide" title="Expert guidance for every interior layer." intro="From the first floor-plan review to the final cushion, each recommendation works as part of one coherent home." /><Link className="text-link" href="/services">View all services <ArrowRight size={16} /></Link></div>
      <div className="service-grid">{services.map(({ title, summary, icon: Icon, slug }, i) => <article className="service-card" key={slug}><span className="card-index">{String(i + 1).padStart(2, "0")}</span><Icon size={29} strokeWidth={1.25} /><h3>{title}</h3><p>{summary}</p><Link aria-label={`Learn more about ${title}`} href={`/services#${slug}`}>Learn more <ArrowRight size={15} /></Link></article>)}</div>
    </section>

    <section className="process-section section-dark"><div className="section"><SectionHeading light eyebrow="How it works" title="From finished house to a clear interior direction." intro="The best advice comes from seeing your real space. Our process begins with your home, not a generic template." /><div className="process-grid">{processSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="philosophy section"><div className="philosophy-title"><span className="eyebrow">Our design philosophy</span><h2>A home should hold your life beautifully.</h2></div><div className="philosophy-copy"><p>We believe lasting interiors are shaped by more than a trend. They balance <em>beauty</em> with ease, <em>function</em> with warmth, and a strong point of view with the people who live there.</p><div className="principles"><span>Beauty</span><span>Comfort</span><span>Function</span><span>Personality</span><span>Balance</span></div></div></section>

    <section className="product-preview section"><div className="product-feature"><Image src="/images/decor-still-life.png" alt="Curated lamp, cushion, vase and material samples" width={1024} height={1024} sizes="(max-width: 780px) 100vw, 55vw" /><span>Curated for real homes</span></div><div><SectionHeading eyebrow="The collection" title="Objects that complete the room." intro="Explore furniture, lighting, rugs, curtains and accessories selected to complement a thoughtful interior plan." /><div className="mini-product-list">{products.slice(0, 3).map((p, i) => <Link key={p.slug} href={`/products/${p.slug}`}><span>0{i + 1}</span><div><strong>{p.name}</strong><small>{p.category} • {p.price}</small></div><ArrowRight size={16} /></Link>)}</div><Link className="button button-dark" href="/products">Explore all products</Link></div></section>

    <section className="project-gallery section"><SectionHeading eyebrow="Design possibilities" title="Rooms with rhythm, warmth and intention." intro="Illustrative concept imagery—ready to be replaced with your completed project photography." /><div className="gallery-grid"><figure><Image src="/images/hero-living-room.png" alt="Warm living room concept" width={1536} height={1024} sizes="(max-width: 780px) 100vw, 50vw" /><figcaption><span>Living Room</span><small>Concept placeholder</small></figcaption></figure><figure><Image src="/images/editorial-bedroom.png" alt="Serene bedroom concept" width={1024} height={1365} sizes="(max-width: 780px) 100vw, 25vw" /><figcaption><span>Bedroom</span><small>Concept placeholder</small></figcaption></figure><figure><Image src="/images/decor-still-life.png" alt="Interior product styling concept" width={1024} height={1024} sizes="(max-width: 780px) 100vw, 25vw" /><figcaption><span>Styling Details</span><small>Concept placeholder</small></figcaption></figure></div></section>

    <section className="why-section section"><div><SectionHeading eyebrow="Why work with us" title="Because good advice prevents expensive guesswork." /><p className="lead">We help you make connected decisions with confidence—before purchasing pieces or committing to a palette that does not serve the whole home.</p></div><div className="why-list">{["Recommendations personal to your family", "In-person property inspection", "Understanding of Nepalese homes", "Practical, achievable solutions", "Premium product selection", "Clear, client-focused communication"].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span><strong>{x}</strong></div>)}</div></section>

    <section className="testimonials section-dark"><div className="section"><SectionHeading light eyebrow="Client stories" title="Space reserved for your real customer voices." intro="The examples below are clearly marked placeholders and should be replaced with verified testimonials before launch." /><div className="testimonial-grid">{[["The design guidance made every decision feel connected, from the palette to the furniture layout.", "CLIENT NAME", "Location placeholder"], ["We understood how to use our rooms better without changing the structure of our new home.", "CLIENT NAME", "Location placeholder"]].map(([quote, name, location]) => <blockquote key={quote}><Quote /><p>“{quote}”</p><footer><strong>{name}</strong><span>{location} • Placeholder testimonial</span></footer></blockquote>)}</div></div></section>

    <section className="faq section"><SectionHeading eyebrow="Frequently asked" title="Clear answers before we begin." /><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <CTASection />
  </main>;
}
