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
    let revealTargets: HTMLElement[] = [];
    let visibilityFailsafe = 0;

    const revealVisibleTargets = () => {
      const viewportHeight = window.innerHeight;
      revealTargets.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportHeight * 0.92 && rect.bottom >= viewportHeight * 0.08) {
          element.classList.add("is-visible");
          observer?.unobserve(element);
        }
      });
    };

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

      revealTargets = Array.from(document.querySelectorAll<HTMLElement>(".motion-reveal"));
      if (!("IntersectionObserver" in window)) {
        revealTargets.forEach((element) => element.classList.add("is-visible"));
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

      revealTargets.forEach((element) => {
        observer?.observe(element);
      });
      root.classList.add("motion-enhanced");
      revealVisibleTargets();

      // Animations must never make content permanently unavailable if a browser
      // delays or drops an observer callback (for example during scroll restore).
      visibilityFailsafe = window.setTimeout(() => {
        revealTargets.forEach((element) => element.classList.add("is-visible"));
      }, 12000);
    });

    const parallaxTargets = Array.from(document.querySelectorAll<HTMLElement>(
      ".home-hero, .page-hero, .editorial-image, .product-feature, .story-image",
    ));

    const updateViewportEffects = () => {
      parallaxFrame = 0;
      revealVisibleTargets();
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
      parallaxFrame = window.requestAnimationFrame(updateViewportEffects);
    };

    updateViewportEffects();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax, { passive: true });
    window.addEventListener("pageshow", requestParallax);

    return () => {
      window.cancelAnimationFrame(frame);
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      if (visibilityFailsafe) window.clearTimeout(visibilityFailsafe);
      observer?.disconnect();
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      window.removeEventListener("pageshow", requestParallax);
    };
  }, [pathname]);

  return null;
}
