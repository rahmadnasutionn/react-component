import { forwardRef, useEffect, useId, useReducer } from "react";
import { AnimationProps, ToastContainerProps, ToastPosition, ToastProps } from "./types";
import { toastActionEnum, toastReducer } from "./reducer";
import {Toast} from "./Toast";

export function usePropId(propId: any): string {
  const id = useId();

  return propId ?? id;
}

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  (prop: ToastContainerProps, ref: React.Ref<HTMLDivElement>) => {

    const [toasts, dispatch] = useReducer(toastReducer, []);

    const {
      className = '',
      id,
      animation = 'none',
      position = 'top-center',
      ...otherProps
    } = prop;

    const idx = usePropId(id)

    const addToast = (event: CustomEvent<ToastProps>) => {
      dispatch({ type: toastActionEnum.add, payload: event.detail });
    };

    const updateToast = (event: CustomEvent<ToastProps>) => {
      dispatch({ type: toastActionEnum.update, payload: event.detail });
    };

    const removeEvent = (event: CustomEvent<ToastProps>) => {
      dispatch({ type: toastActionEnum.remove, payload: event.detail })
    };

    useEffect(() => {
      document.addEventListener('toasts:add', addToast as EventListener);
      document.addEventListener('toasts:update', updateToast as EventListener);
      document.addEventListener('toasts:remove', removeEvent as EventListener);

      return () => {
        document.removeEventListener('toasts:add', addToast as EventListener);
        document.removeEventListener('toasts:update', updateToast as EventListener);
        document.removeEventListener('toasts:remove', removeEvent as EventListener);
      };
    }, []);

    const stylesPosition: Record<ToastPosition, string> = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',    
      'bottom-center': 'bottom-2 left-1/2 transform -translate-x-1/2',
      'top-center': 'top-2 left-1/2 transform -translate-x-1/2',
      'right-center': 'top-1/2 right-2 transform -translate-y-1/2',
      'left-center': 'top-1/2 left-2 transform -translate-y-1/2',
    };

    const animationStyling: Record<AnimationProps, string> = {
      zoom: 'animate-zoom-in',
      swing: 'animate-swing',
      fadeIn: 'animate-fade-in',
      none: 'animate-none'
    };

   return (
    <div
      id={idx}
      ref={ref}
      {...otherProps}
      className={[
        "fixed flex flex-col gap-y-2 z-[999]",
        stylesPosition[position]
      ].join(" ")}
    >
      {toasts.map((toast: ToastProps) => (
        <div
          key={toast.id}
          className={[
            animationStyling[animation]
          ].join(' ')}
        >
          <Toast {...toast} />
        </div>
      ))}
    </div>
   );
  }
);
