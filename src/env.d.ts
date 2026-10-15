/// <reference types="astro/client" />

interface Window {
  proseflyAnalytics?: {
    track(event: string): void
  }
}
