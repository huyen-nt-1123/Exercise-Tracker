// Simple observable app state. Components mutate `store` directly, then call
// emitChange() so subscribers (e.g. the shared FAB) can react to changes that
// don't go through the router — like switching Library tabs or entering build
// mode in place.
export const store = {
  draftRoutine: { name: '', exercises: [] },
  libraryTab: 'routines',
  // True while a routine draft is being built inside the Library ROUTINES tab
  // (story 006). The draft lives in `draftRoutine` until saved or discarded.
  buildingRoutine: false,
}

const listeners = new Set()

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function emitChange() {
  listeners.forEach(listener => listener(store))
}

// Reset the in-progress draft and exit build mode. Used by save (story 005)
// and discard (story 008).
export function clearDraft() {
  store.draftRoutine = { name: '', exercises: [] }
  store.buildingRoutine = false
}
