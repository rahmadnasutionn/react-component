import { ToastProps } from "./types"

export const useToast = () => {
  return {
    add: (payload: ToastProps) => {
      const event = new CustomEvent('toasts:add', {
        detail: payload,
      });

      document.dispatchEvent(event);
    },
    update: (payload: ToastProps) => {
      const event = new CustomEvent('toasts:update', {
        detail: payload,
      });

      document.dispatchEvent(event);
    },
    remove: (id: string | number) => {
      const event = new CustomEvent('toasts:remove', {
        detail: { id },
      });

      document.dispatchEvent(event);
    },
  }
}