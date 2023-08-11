import { ToastProps } from "./types";

export enum toastActionEnum {
  add = 'ADD',
  update = 'UPDATE',
  remove = 'REMOVE',
};

export const toastReducer = (
  toasts: ToastProps[],
  action: { type: toastActionEnum, payload: ToastProps},
) => {
  switch(action.type) {
    case toastActionEnum.add:
      if (toasts.find(toast => toast.id === action.payload.id)) {
        return [...toasts]
      }

      if (!action.payload.id) {
        const randomId = Math.random().toString(32);
        action.payload.id = `toast-${randomId}`
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