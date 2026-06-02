import '../styles/confirm-dialog.css'

// Shared accessible confirmation dialog (focus moves in, two-button focus trap,
// Escape / overlay-click cancels, focus returns to the trigger on cancel).
// Used by the discard-routine flow (story 008) and delete-routine (story 011).
//
// onConfirm runs after the dialog is removed from the DOM.
export function openConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel,
  dialogTestId,
  confirmTestId,
  cancelTestId,
  onConfirm,
  trigger,
}) {
  const titleId = `${dialogTestId}-title`

  const overlay = document.createElement('div')
  overlay.className = 'confirm-dialog-overlay'
  overlay.innerHTML = `
    <div
      class="confirm-dialog"
      data-testid="${dialogTestId}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="${titleId}"
    >
      <h2 class="confirm-dialog__title" id="${titleId}">${title}</h2>
      <p class="confirm-dialog__body">${body}</p>
      <div class="confirm-dialog__actions">
        <button class="btn confirm-dialog__cancel" data-testid="${cancelTestId}" type="button">
          ${cancelLabel}
        </button>
        <button class="btn confirm-dialog__confirm" data-testid="${confirmTestId}" type="button">
          ${confirmLabel}
        </button>
      </div>
    </div>
  `
  document.body.appendChild(overlay)

  const dialog = overlay.querySelector(`[data-testid="${dialogTestId}"]`)
  const cancelBtn = overlay.querySelector(`[data-testid="${cancelTestId}"]`)
  const confirmBtn = overlay.querySelector(`[data-testid="${confirmTestId}"]`)

  function close() {
    overlay.removeEventListener('keydown', onKeydown)
    overlay.remove()
    if (trigger && document.contains(trigger)) trigger.focus()
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      // Simple two-button focus trap.
      e.preventDefault()
      const next = document.activeElement === confirmBtn ? cancelBtn : confirmBtn
      next.focus()
    }
  }

  cancelBtn.addEventListener('click', close)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) close()
  })
  confirmBtn.addEventListener('click', () => {
    overlay.removeEventListener('keydown', onKeydown)
    overlay.remove()
    onConfirm()
  })
  overlay.addEventListener('keydown', onKeydown)

  // Move focus into the dialog.
  requestAnimationFrame(() => {
    dialog.focus?.()
    confirmBtn.focus()
  })
}
