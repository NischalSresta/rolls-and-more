import { useEffect, useRef } from 'react'

// All crops and movement share a 1000-unit square, regardless of screen width.
const layers = [[0, 235, 180], [235, 200, 115], [435, 155, 65], [590, 220, 0], [810, 190, -60]]

export default function BurgerAssembly() {
  const root = useRef(null)
  useEffect(() => {
    const svg = root.current
    const section = svg.closest('.burger-story')
    const sticky = section.querySelector('.story-sticky')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const distance = Math.max(1, section.offsetHeight - sticky.offsetHeight)
      const raw = reduced.matches ? 1 : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance))
      const t = Math.min(1, raw / .85)
      const p = t * t * (3 - 2 * t)
      // Scale the complete assembly together; never shrink individual ingredients.
      svg.querySelector('[data-stack]').setAttribute('transform', `translate(500 500) scale(${1 - p * .06}) translate(-500 -500)`)
      svg.querySelectorAll('[data-layer]').forEach((group, i) => {
        group.setAttribute('transform', `translate(0 ${layers[i][2] * p})`)
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(sticky)
    window.addEventListener('scroll', schedule, { passive: true })
    reduced.addEventListener('change', schedule)
    update()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); reduced.removeEventListener('change', schedule) }
  }, [])
  return <svg ref={root} className="burger-assembly" viewBox="0 0 1000 1000" aria-hidden="true">
    <g data-stack="">
      {layers.map(([y, height], i) => <g data-layer="" key={i}>
        <svg x="0" y={y} width="1000" height={height} viewBox={`0 ${y} 1000 ${height}`} overflow="hidden">
          <image href="/images/layers.png" x="0" y="0" width="1000" height="1000"/>
        </svg>
      </g>)}
    </g>
  </svg>
}
