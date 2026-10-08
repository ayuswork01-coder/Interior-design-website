import {
  Armchair, Blend, Grid2X2, LampFloor, LayoutDashboard, Lightbulb,
  Palette, PanelsTopLeft, Ruler, Shapes, Sofa, Sparkles,
} from "lucide-react";

export const services = [
  { slug: "interior-consultation", title: "Interior Design Consultation", summary: "A clear design direction shaped around your home, taste, daily life and budget.", icon: Sparkles },
  { slug: "on-site-consultation", title: "On-Site Home Consultation", summary: "We study your completed property, floor plan, measurements, daylight and existing details in person.", icon: Ruler },
  { slug: "space-planning", title: "Space Planning", summary: "Thoughtful room layouts that improve movement, comfort and the way your family uses each space.", icon: LayoutDashboard },
  { slug: "furniture-placement", title: "Furniture Placement", summary: "Guidance on furniture size, proportion, arrangement and the right visual balance for every room.", icon: Sofa },
  { slug: "color-consultation", title: "Color Consultation", summary: "A coordinated palette for walls, upholstery, fabrics, finishes and accents—without guesswork.", icon: Palette },
  { slug: "lighting-guidance", title: "Lighting Guidance", summary: "Practical and decorative lighting recommendations for warmth, function and atmosphere.", icon: Lightbulb },
  { slug: "materials-finishes", title: "Material & Finish Guidance", summary: "Confident choices across wood tones, textiles, textures, surfaces and complementary finishes.", icon: PanelsTopLeft },
  { slug: "decor-styling", title: "Décor & Room Styling", summary: "Curated art, rugs, curtains, mirrors and accessories that make a finished house feel personal.", icon: Shapes },
];

export type Product = {
  slug: string; name: string; category: string; description: string; price: string;
  availability: string; image: string; material: string; dimensions: string; colors: string;
};

export const products: Product[] = [
  { slug: "sculptural-brass-lamp", name: "Sculptural Brass Lamp", category: "Lighting", description: "A warm ambient table lamp with a refined sculptural silhouette.", price: "Contact for price", availability: "Availability on request", image: "/images/decor-still-life.png", material: "Brass-finish metal and linen", dimensions: "Dimensions available on request", colors: "Warm brass / natural linen" },
  { slug: "walnut-side-table", name: "Walnut Side Table", category: "Tables", description: "A compact side table with warm grain and clean architectural lines.", price: "Contact for price", availability: "Availability on request", image: "/images/decor-still-life.png", material: "Walnut finish", dimensions: "Dimensions available on request", colors: "Walnut" },
  { slug: "handwoven-accent-cushion", name: "Handwoven Accent Cushion", category: "Accessories", description: "A tactile layer for sofas, reading corners and bedroom styling.", price: "Contact for price", availability: "Availability on request", image: "/images/decor-still-life.png", material: "Handwoven textile", dimensions: "Size options available", colors: "Cream / forest / clay" },
  { slug: "serene-upholstered-bed", name: "Serene Upholstered Bed", category: "Furniture", description: "A softly upholstered statement bed designed for calm, layered bedrooms.", price: "Contact for price", availability: "Made-to-order options", image: "/images/editorial-bedroom.png", material: "Upholstery and timber", dimensions: "Custom sizing available", colors: "Warm neutrals" },
  { slug: "floor-length-drapery", name: "Floor-Length Drapery", category: "Curtains", description: "Tailored curtains that soften natural light and complete the room.", price: "Contact for price", availability: "Consultation required", image: "/images/editorial-bedroom.png", material: "Linen-blend options", dimensions: "Measured to your space", colors: "Curated to your palette" },
  { slug: "textured-room-rug", name: "Textured Room Rug", category: "Rugs", description: "A grounded neutral rug selected to balance furniture and circulation.", price: "Contact for price", availability: "Availability on request", image: "/images/hero-living-room.png", material: "Woven textile", dimensions: "Multiple sizes", colors: "Warm neutral" },
];

export const processSteps = [
  ["01", "Book a consultation", "Tell us about your home and the decisions you want help with."],
  ["02", "We visit your home", "We experience the completed property, its light, scale and flow."],
  ["03", "Review space & plan", "We study the floor plan, take key measurements and note existing elements."],
  ["04", "Understand you", "We discuss your taste, daily routines, priorities and working budget."],
  ["05", "Shape recommendations", "We develop a coordinated direction for layouts, color, products and styling."],
  ["06", "Bring it to life", "You move forward with clear, practical choices and our continued guidance."],
];

export const faqs = [
  ["What type of homes do you work with?", "We focus on completed or near-completed homes where owners want professional help with layout, furnishing, color, lighting, finishes and styling."],
  ["Do you visit the property first?", "Yes. An on-site visit helps us understand the real dimensions, daylight, circulation and details that a floor plan alone cannot fully show."],
  ["Do you provide construction services?", "No. We specialize in interior design consultation, space planning, styling and product recommendations. We do not alter foundations, columns, beams, walls or major building infrastructure."],
  ["Can you design only one room?", "Yes. You can request guidance for a living room, bedroom, dining area, home office, guest room or another individual space."],
  ["Can you work with my existing furniture?", "Yes. We can assess what you already own, recommend better placement and build a coordinated scheme around pieces you would like to keep."],
  ["Can I purchase interior products from you?", "Yes. Selected furnishings and décor items are available by inquiry. We can also help you choose options that suit your room and design direction."],
  ["Do you provide services outside Kathmandu?", "Service areas and travel arrangements vary. Share your location with us and we will confirm what is currently possible."],
  ["How do I book an appointment?", "Submit the appointment request form with your preferred date and time. Our team will contact you to confirm the schedule; submitting a request does not create an automatic booking."],
];

export const trustItems = [
  { title: "Personalized advice", icon: Blend },
  { title: "On-site consultation", icon: Ruler },
  { title: "Thoughtful planning", icon: Grid2X2 },
  { title: "Furniture guidance", icon: Armchair },
  { title: "Lighting & décor", icon: LampFloor },
  { title: "Curated products", icon: Shapes },
];
