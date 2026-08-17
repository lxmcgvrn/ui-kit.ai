'use client'

import { useSyncExternalStore } from 'react'

const listeners = new Set<() => void>()

let isOpen = false

/** Opens the drawer from anywhere — the nav button, or an MDX page. */
export function openThemeEditor() {
  setThemeEditorOpen(true)
}

export function setThemeEditorOpen(next: boolean) {
  if (isOpen === next) return

  isOpen = next
  for (const listener of listeners) listener()
}

export function useIsThemeEditorOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function getServerSnapshot() {
  return false
}

function getSnapshot() {
  return isOpen
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
