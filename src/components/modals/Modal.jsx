import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

export function Modal({ open, onClose, title, children, footer, width = 420 }) {
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-4">
      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl" style={{ maxWidth: width }}>
        <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-4">
          <h3 className="text-base font-semibold text-ink-900">{title}</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-900">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-ink-200/70 px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}