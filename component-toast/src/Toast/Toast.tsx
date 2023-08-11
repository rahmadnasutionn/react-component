import * as React from 'react';

import { BsCheckCircle, BsInfoCircle, BsQuestionSquare } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';
import { BiErrorCircle } from 'react-icons/bi';
import { forwardRef } from "react";
import {  ProgressColor, TitleColor, ToastColor, ToastIconType, ToastProps, ToastRadius, ToastShadow, ToastShadowColor } from "./types";
import { usePropId } from './ToastContainer';
import { useToast } from './use-toast';

const icons: Record<ToastIconType, JSX.Element> = {
  success: <BsCheckCircle className='w-5 h-5' />,
  error: <BiErrorCircle className='w-5 h-5' />,
  info: <BsInfoCircle className='w-5 h-5' />,
  question: <BsQuestionSquare className='w-5 h-5' />,
  warning: <IoWarningOutline className='w-5 h-5' />
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (props: ToastProps, ref?: React.Ref<HTMLDivElement>) => {

  const {
    actions = [],
    className = '',
    pauseOnHover = false,
    duration = 2000,
    title = '',
    description = '',
    radius = 'md',
    shadow = 'lg',
    titleColor = 'white',
    closeOnClick,
    progressColor = 'gradient',
    iconType,
    id,
    color = 'white',
    shadowColor = 'none',
    showProgress,
    stopped = false,
    ...otherProps
  } = props;

  const [paused, setPaused] = React.useState<boolean>(stopped);
  const [counter, setCounter] = React.useState<number>(stopped ? 1000 : 0);
  const toast = useToast();
  const idx = usePropId(id);
  const animationRef = React.useRef<number | null>(null);
  const previousTimestampRef = React.useRef<number | null>(null);
  const hasTitle = !!title;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (closeOnClick) {
      toast.remove(idx);
    }
  };

  const handleProgress = (timer: number) => {
    if (!previousTimestampRef.current) {
      previousTimestampRef.current = timer;
    }

    const deltaTime = timer - (previousTimestampRef.current || 0);

    if (deltaTime >= 50) {
      setCounter((prevCounter) => prevCounter + 50);
      previousTimestampRef.current = timer;
    }

    animationRef.current = requestAnimationFrame(handleProgress);
  };

  React.useEffect(() => {
    if (!paused) {
      animationRef.current = requestAnimationFrame(handleProgress);
    }

    if (!pauseOnHover) return;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (previousTimestampRef.current) {
        cancelAnimationFrame(previousTimestampRef.current);
      }
    }
  }, [paused]);

  React.useEffect(() => {
    if (duration && counter >= duration) {
      toast.remove(idx);
    }
  }, [counter]);

  const radiusStyling: Record<ToastRadius, string> = {
    none: 'rounded-none',
    base: 'rounded',
    sm: 'rounded-sm',
    lg: 'rounded-lg',
    md: 'rounded-md',
  };

  const toastColors: Record<ToastColor, string> = {
    'none': '',
    'white': 'bg-white',
    'gray': 'bg-gray-800',
    'red': 'bg-red-800',
  };

  const shadowStyling: Record<ToastShadow, string> = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    md: 'shadow-md',
  };

  const shadowColorStyling: Record<ToastShadowColor, string> = {
    none: '',
    white: 'shadow-gray-200/50 hover:shadow-gray-200/60',
    red: 'shadow-red-500/50 hover:shadow-red-500/60',
    yellow: 'shadow-yellow-500/50 hover:shadow-yellow-500/60',
    gray: 'shadow-gray-400/50 hover:shadow-gray-400/60',
  };

  const progressColors: Record<ProgressColor, string> = {
    none: '',
    // source: https://tailwindcomponents.com/gradient-generator/
    gradient: 'bg-gradient-to-r from-amber-500 to-pink-500',
    gray: 'bg-gray-800',
    red: 'bg-red-600',
  };

  const titleColors: Record<TitleColor, string> = {
    none: '',
    white: 'text-white',
    gray: 'text-gray-800',
    red: 'text-red-600',
  };

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

    return (
      <div
        id={id}
        ref={ref}
        role='alert'
        aria-label='Toast Notification'
        tabIndex={-1}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={[
          'flex flex-col w-72 overflow-hidden transition-colors',
          toastColors[color],
          radiusStyling[radius],
          shadowColorStyling[shadowColor],
          shadowStyling[shadow],
          titleColors[titleColor],
          className,
        ].join(' ')}
        {...otherProps}
      >
        {duration > 0 && showProgress && (
          <div
            className={[
              'w-full h-2',
              progressColors[progressColor],
            ].join(' ')}
          >
            <div
              className='h-full transition-[width] bg-gray-200 shadow'
              style={{
                width: (counter * 100) / duration + '%',
                transitionDuration: '50ms'
              }}
            />
          </div>
        )}

        <div 
          className={[
            'flex gap-x-3 p-3 items-center',
            closeOnClick ? 'cursor-pointer' : ''
          ].join(' ')}
          onClick={handleClick}
          role='button'
        >
          {iconType && icons[iconType]}
          <div className="flex flex-col gap-y-1.5">
            <h4 
              className="text-xl font-medium leading-none"
            >
              {title}
            </h4>
            {description && <p className={hasTitle ? 'text-sm' : 'text-base'}>{description}</p>}
          </div>
          <span className='absolute top-2 right-2 w-4 h-4'>
            X
          </span>
        </div>

        {actions.length > 0 && (
          <div className="flex items-center w-full divide-x border-t">
            {actions.map((action, index) => (
              <button
                key={`action-ke${index}`}
                className={[
                  className,
                  'w-full py-2 text-sm'
                ].join(' ')}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)