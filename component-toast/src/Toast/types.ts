import { ComponentPropsWithRef } from 'react';

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastColor = 'white' | 'gray' | 'red' | 'none';
export type ToastIconType = 'info' | 'success' | 'warning' | 'error' | 'question';
export type ToastRadius = 'none' | 'sm' | 'base' | 'md' | 'lg';
export type ToastShadow = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
export type ToastShadowColor =
  | 'none'
  | 'white'
  | 'red'
  | 'yellow'
  | 'gray';

export interface ToastProps extends Omit<ComponentPropsWithRef<'div'>, 'size'> {
  actions?: ToastAction[];
  closeOnClick?: boolean;
  color?: ToastColor;
  description?: string;
  duration?: number;
  progressColor?: ProgressColor;
  stopped?: boolean;
  iconType?: ToastIconType;
  pauseOnHover?: boolean;
  radius?: ToastRadius;
  shadow?: ToastShadow;
  shadowColor?: ToastShadowColor;
  showProgress?: boolean;
  title?: string;
  titleColor?: TitleColor;
};

export type TitleColor = 'white' | 'gray' | 'red' | 'none';
export type ProgressColor = 'gradient' | 'gray' | 'red' | 'none';
export type AnimationProps = 'zoom' | 'swing' | 'fadeIn' | 'none'

export type ToastPosition = 
  'top-left' | 
  'top-right' | 
  'bottom-left' | 
  'bottom-right' |
  'top-center' |
  'bottom-center' |
  'right-center' | 
  'left-center';

export interface ToastContainerProps extends Omit<ComponentPropsWithRef<'div'>, 'size'> {
  position?: ToastPosition;
  animation?: AnimationProps;
}
