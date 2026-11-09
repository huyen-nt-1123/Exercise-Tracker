// AI citation: I designed the functions and direction of this file; Claude Code (Anthropic) helped me write the code.
import { openDB } from 'idb'
import { EXERCISES_SEED } from './exercises-seed.js'

const DB_NAME = 'exercise-tracker'
const DB_VERSION = 1

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('exercises', { keyPath: 'id' })
    db.createObjectStore('routines', { keyPath: 'id' })
  },
})

async function getDb() {
  const db = await dbPromise
  const count = await db.count('exercises')
  if (count === 0) {
    const tx = db.transaction('exercises', 'readwrite')
    await Promise.all(EXERCISES_SEED.map(e => tx.store.put(e)))
    await tx.done
  }
  return db
}

export async function getAllExercises() {
  const db = await getDb()
  return db.getAll('exercises')
}

export async function searchExercises(query) {
  const all = await getAllExercises()
  if (!query) return all
  const q = query.toLowerCase()
  return all.filter(e => e.name.toLowerCase().includes(q))
}

export async function saveRoutine(routine) {
  const db = await getDb()
  return db.put('routines', routine)
}

export async function getAllRoutines() {
  const db = await getDb()
  return db.getAll('routines')
}

export async function deleteRoutine(id) {
  const db = await getDb()
  return db.delete('routines', id)
}
