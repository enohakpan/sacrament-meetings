'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

const slides = [
  {
    src: '/hero-congregation-1.jpg',
    alt: 'Ward members gathered for sacrament meeting',
  },
  {
    src: '/hero-congregation-2.png',
    alt: 'Congregation seated together during Sunday worship',
  },
  {
    src: '/hero-congregation-3.png',
    alt: 'Families and ward members attending sacrament meeting',
  },
];

export function HeroSlider(): ReactElement {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[12/7] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 37vw, 100vw"
          className={[
            'object-cover transition-opacity duration-700',
            index === activeSlide ? 'opacity-100' : 'pointer-events-none opacity-0',
          ].join(' ')}
          aria-hidden={index !== activeSlide}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show image ${index + 1} of ${slides.length}`}
            aria-current={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            className={[
              'h-2.5 rounded-full transition-all',
              index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/90',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
