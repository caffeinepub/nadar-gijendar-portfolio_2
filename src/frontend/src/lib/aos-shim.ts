/**
 * Lightweight AOS shim using IntersectionObserver.
 * Supports data-aos, data-aos-delay, data-aos-duration attributes.
 */

type AosOptions = {
  duration?: number;
  easing?: string;
  once?: boolean;
  offset?: number;
  delay?: number;
};

const AOS = {
  init(options: AosOptions = {}) {
    const once = options.once !== false;
    const rootMargin = options.offset
      ? `-${options.offset}px 0px`
      : "-80px 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delay = Number(el.dataset.aosDelay ?? options.delay ?? 0);
            setTimeout(() => {
              el.classList.add("aos-animate");
            }, delay);
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove("aos-animate");
          }
        }
      },
      { rootMargin },
    );

    for (const el of document.querySelectorAll("[data-aos]")) {
      observer.observe(el);
    }
  },

  refresh() {},
  refreshHard() {},
};

export default AOS;
