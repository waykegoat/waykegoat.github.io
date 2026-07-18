export function scrollToId(target: string): void {
  const id = target.replace(/^#/, '')
  if (id === 'top' || id === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
