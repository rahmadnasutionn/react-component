import { ToastProps } from "./types";

export enum toastActionEnum {
  add = 'ADD',
  update = 'UPDATE',
  remove = 'REMOVE',
};

export const toastReducer = (
  toasts: ToastProps[],
  action: { type: toastActionEnum, payload: ToastProps, max?: number},
) => {
  switch(action.type) {
    case toastActionEnum.add:
      if (toasts.length >= (action.max || 3)) {
        return [...toasts];
      }

      if (toasts.find(toast => toast.id === action.payload.id)) {
        return [...toasts]
      }

      if (!action.payload.id) {
        const randomStr = Math.random().toString(32);
        action.payload.id = `toast-${randomStr}`
      }

      return [action.payload, ...toasts];
    case toastActionEnum.update:
      return toasts.map(toast => {
        if (toast.id === action.payload.id) {
          return { ...toast, ...action.payload};
        }

        return toast;
      })
    case toastActionEnum.remove:
      return toasts.filter(toast => toast.id !== action.payload.id);
    default:
      return toasts;
  }
}