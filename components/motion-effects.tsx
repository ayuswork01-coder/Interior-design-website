"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type MotionVariant = "up" | "left" | "right" | "scale" | "clip";

const individualTargets: Array<[string, MotionVariant]> = [
  [".section-heading", "up"],
  [".about-copy", "right"],
  [".editorial-image", "clip"],
  [".philosophy-title", "left"],
  [".philosophy-copy", "right"],
  [".product-feature", "clip"],
  [".product-preview > div:last-child", "right"],
  [".why-section > div:first-child", "left"],
  [".story-grid > div:first-child", "left"],
  [".story-image", "clip"],
  [".scope-clarification > div", "up"],
  [".services-intro > div", "up"],
  [".contact-layout > div", "left"],
  [".contact-card", "right"],
  [".map-placeholder", "scale"],
  [".product-detail-images", "clip"],
  [".product-info", "right"],
  [".cta-section > div", "left"],
  [".cta-section > .button", "right"],
  [".footer-main > div", "up"],
  [".footer-bottom", "up"],
];

const staggerGroups: Array<[string, string, MotionVariant]> = [
  [".trust-strip", ":scope > div", "up"],
  [".service-grid", ":scope > .service-card", "up"],
  [".process-grid", ":scope > article", "up"],
  [".principles", ":scope > span", "scale"],
  [".mini-product-list", ":scope > a", "right"],
  [".gallery-grid", ":scope > figure", "clip"],
  [".why-list", ":scope > div", "right"],
  [".testimonial-grid", ":scope > blockquote", "up"],
  [".faq-list", ":scope > details", "up"],
  [".approach-grid", ":scope > div", "up"],
  [".value-grid", ":scope > div", "up"],
  [".team-grid", ":scope > article", "up"],
  [".service-types", ":scope > div", "right"],
  [".service-details", ":scope > .service-detail", "up"],
  [".product-grid", ":scope > .product-card", "up"],
  [".related-products", ":scope > a", "up"],
];

function prepareElement(element: Element, variant: MotionVariant, delay = 0) {
  if (!(element instanceof HTMLElement) || element.closest(".booking-modal")) return;
  element.classList.add("motion-reveal", `motion-${variant}`);
  element.style.setProperty("--motion-delay", `${delay}ms`);
}

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    root.classList.remove("motion-enhanced");
    if (reducedMotion.matches) return;

    let frame = 0;
    let parallaxFrame = 0;
    let observer: IntersectionObserver | undefined;

    frame = window.requestAnimationFrame(() => {
      individualTargets.forEach(([selector, variant]) => {
        document.querySelectorAll(selector).forEach((element) => prepareElement(element, variant));
      });

      staggerGroups.forEach(([containerSelector, childSelector, variant]) => {
        document.querySelectorAll(containerSelector).forEach((container) => {
          container.querySelectorAll(childSelector).forEach((element, index) => {
            prepareElement(element, variant, Math.min(index, 7) * 90);
          });
        });
      });

      const targets = document.querySelectorAll<HTMLElement>(".motion-reveal");
      if (!("IntersectionObserver" in window)) {
        targets.forEach((element) => element.classList.add("is-visible"));
        root.classList.add("motion-enhanced");
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

      targets.forEach((element) => {
        observer?.observe(element);
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.92 && rect.bottom >= 0) {
          element.classList.add("is-visible");
          observer?.unobserve(element);
        }
      });
      root.classList.add("motion-enhanced");
    });

    const parallaxTargets = Array.from(document.querySelectorAll<HTMLElement>(
      ".home-hero, .page-hero, .editorial-image, .product-feature, .story-image",
    ));

    const updateParallax = () => {
      parallaxFrame = 0;
      const viewportHeight = window.innerHeight;
      parallaxTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        const offset = (viewportHeight / 2 - (rect.top + rect.height / 2)) * 0.035;
        element.style.setProperty("--parallax-y", `${Math.max(-18, Math.min(18, offset))}px`);
      });
    };

    const requestParallax = () => {
      if (parallaxFrame) return;
      parallaxFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      observer?.disconnect();
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
    };
  }, [pathname]);

  return null;
}
