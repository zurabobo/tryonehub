import { useLayoutEffect } from 'react'

export const useLockBodyScroll = (locked: boolean) => {
  useLayoutEffect(() => {
    if (!locked) return

    const body = document.body
    const scrollY = window.scrollY

    // ширина скроллбара чтобы не было прыжка
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      const y = body.style.top

      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.overflow = ''
      body.style.paddingRight = ''

      window.scrollTo(0, Math.abs(parseInt(y || '0', 10)))
    }
  }, [locked])
}
