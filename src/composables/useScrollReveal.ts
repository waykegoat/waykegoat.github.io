import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Плавно показывает элементы с классом `.reveal` при попадании во вьюпорт.
 * Один IntersectionObserver на всё приложение, подключается в корне.
 */
export function useScrollReveal(): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add('in'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
