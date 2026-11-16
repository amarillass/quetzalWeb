"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import donacionComputadora from "@/public/images/donacion-computadora.webp";
import equipoColaborando from "@/public/images/equipo-colaborando.webp";
import equipoTrabajando from "@/public/images/equipo-trabajando.webp";
import estudiantesConComputadoras from "@/public/images/estudiantes-con-computadoras.webp";

// To add a photo: put the file in public/images, import it above, add it here.
const PHOTOS: { src: StaticImageData; alt: string }[] = [
  { src: equipoTrabajando, alt: "Equipo preparando las computadoras para entregar" },
  { src: donacionComputadora, alt: "Entrega de computadoras donadas" },
  { src: estudiantesConComputadoras, alt: "Estudiantes con las computadoras donadas" },
  { src: equipoColaborando, alt: "Equipo de Quetzal colaborando" },
];

const SPEED_PX_PER_SECOND = 30;
const RESUME_AFTER_MS = 5000;
// The photos are repeated so the strip can loop forever. Four copies leave enough
// room to scroll either way on screens up to twice as wide as one set of photos.
const COPIES = 4;

export function PhotoGallery({ className = "" }: { className?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let setWidth = 0; // width of one full set of photos, gaps included
    let pos = 0; // exact position; the browser rounds scrollLeft, which would stall slow speeds
    let expected = 0; // the scrollLeft we last set, to tell our scrolling from the visitor's
    let pausedUntil = 0;
    let holding = false; // finger or mouse button is down on the gallery
    let frame = 0;
    let lastTime = 0;

    const measure = () => {
      const first = el.children[0] as HTMLElement;
      const firstOfNextSet = el.children[PHOTOS.length] as HTMLElement;
      setWidth = firstOfNextSet.offsetLeft - first.offsetLeft;
    };

    // Keep the position inside the second copy. Every copy looks identical, so
    // jumping by one set width is invisible and the loop never runs out.
    const wrap = (x: number) => {
      if (setWidth <= 0) return x;
      while (x < setWidth) x += setWidth;
      while (x >= setWidth * 2) x -= setWidth;
      return x;
    };

    const scrollTo = (x: number) => {
      pos = wrap(x);
      expected = pos;
      el.scrollLeft = pos;
    };

    const pauseForAWhile = () => {
      pausedUntil = performance.now() + RESUME_AFTER_MS;
    };

    const tick = (time: number) => {
      // Cap the step so returning to a background tab doesn't jump the strip.
      const elapsed = lastTime ? Math.min(time - lastTime, 100) : 0;
      lastTime = time;
      if (!holding && time >= pausedUntil) {
        scrollTo(pos + (SPEED_PX_PER_SECOND * elapsed) / 1000);
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || reduceMotion) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Any scroll we didn't cause is the visitor: swipe, trackpad, arrow keys.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - expected) <= 2) return;
      pauseForAWhile();
      scrollTo(el.scrollLeft);
    };

    const onTouchStart = () => {
      holding = true;
    };
    const onTouchEnd = () => {
      holding = false;
      pauseForAWhile();
    };

    // Mouse users can drag the strip like on a phone.
    let dragStartX = 0;
    let dragStartScroll = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      holding = true;
      dragStartX = e.clientX;
      dragStartScroll = pos;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!holding || e.pointerType !== "mouse") return;
      const target = dragStartScroll - (e.clientX - dragStartX);
      scrollTo(target);
      dragStartScroll += pos - target; // keep the drag anchored across a loop jump
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !holding) return;
      holding = false;
      pauseForAWhile();
    };

    measure();
    scrollTo(setWidth);

    // Only animate while the gallery is on screen.
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(el);

    const resize = new ResizeObserver(() => {
      const offsetInSet = setWidth ? pos - setWidth : 0;
      measure();
      scrollTo(setWidth + offsetInSet);
    });
    resize.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      role="region"
      aria-label="Galería de fotos"
      tabIndex={0}
      // py-6 / -my-6 leave room for the card shadows, which a scroll box would otherwise clip.
      className={`flex gap-6 md:gap-12 overflow-x-auto py-6 -my-6 px-6 cursor-grab active:cursor-grabbing select-none outline-none focus-visible:ring-2 focus-visible:ring-main [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {Array.from({ length: COPIES }, (_, copy) =>
        PHOTOS.map((photo) => (
          <div
            key={`${copy}-${photo.alt}`}
            aria-hidden={copy > 0 || undefined}
            className="group relative shrink-0 w-[85vw] max-w-[36rem] h-64 md:h-96 overflow-hidden rounded-lg shadow-xl"
          >
            <Image
              src={photo.src}
              alt={copy === 0 ? photo.alt : ""}
              fill
              sizes="(min-width: 768px) 36rem, 85vw"
              placeholder="blur"
              draggable={false}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))
      )}
    </div>
  );
}
