// AI citation: I designed the functions and direction of this file; Claude Code (Anthropic) helped me write the code.
import '../styles/toast.css'

// Transient top-of-screen confirmation toast. Shared across flows (save routine,
// delete routine). Auto-dismisses; a new toast replaces any existing one.
export function showToast(message) {
  const existing = document.querySelector('[data-testid="save-routine-success-toast"]')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.className = 'save-success-toast'
  toast.setAttribute('data-testid', 'save-routine-success-toast')
  toast.setAttribute('role', 'status')
  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => toast.remove(), 2000)
}
