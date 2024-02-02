import type { Router } from 'vitepress'
import type { App, InjectionKey } from 'vue'
import type { Zoom } from 'medium-zoom'

import { inject, onMounted, watch, nextTick } from 'vue'
import mediumZoom from 'medium-zoom'

declare module 'medium-zoom' {
  interface Zoom {
    refresh: (selector?: string) => void
  }
}

const defaultSelector = ':not(a) > img:not(.image-src, .visitor, .vp-sponsor-grid-image)'

export const mediumZoomSymbol: InjectionKey<Zoom> = Symbol('medium-zoom')

export const createMediumZoomProvider = (app: App, router: Router) => {
  if (import.meta.env.SSR) {
    return
  }

  const zoom = mediumZoom()
  zoom.refresh = (selector = defaultSelector) => {
    zoom.detach()
    zoom.attach(selector)
  }

  app.provide(mediumZoomSymbol, zoom)

  watch(
    () => router.route.path,
    () => nextTick(() => zoom.refresh())
  )
}

export function useMediumZoom() {
  return onMounted(() => inject(mediumZoomSymbol)?.refresh())
}
