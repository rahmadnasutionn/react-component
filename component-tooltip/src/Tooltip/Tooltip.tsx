

import * as React from 'react'
import { isFocusEvent, isMouseEvent } from './utils';

type CommonStyledProps = {
  as?: string | React.ComponentType<any>;
}

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  children?: React.ReactNode;
  className?: string;
  disabledFocusListener?: boolean;
  disabledMouseListener?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onClose?: (
    event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;
  onFocus?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onOpen?: (
    event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void;
  style?: React.CSSProperties;
  // tempat menampung contentnya
  content: string;
  position?: TooltipPosition;
} & Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'onBlur' | 'onClose' | 'onMouseEnter' | 'onMouseLeave' | 'onOpen'
> & 
  CommonStyledProps

export function Tooltip({
  children,
  className,
  disabledFocusListener,
  disabledMouseListener,
  enterDelay,
  leaveDelay,
  onBlur,
  onClose,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onOpen,
  style,
  content,
  position,
  ...props
}: TooltipProps) {

    // state
  const [show, setShow] = React.useState(false);
  const [openTimer, setOpenTimer] = React.useState<number>();
  const [closeTimer, setCloseTimer] = React.useState<number>();

  const isFocus = !disabledFocusListener;
  const isMouse = !disabledMouseListener;

  const handleOpen = (
    event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    window.clearTimeout(openTimer);
    window.clearTimeout(closeTimer);

    const timer = window.setTimeout(() => {
      setShow(true);

      onOpen?.(event);
    }, leaveDelay);

    setOpenTimer(timer);
  };

  const handleEnter = (
    event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    // digunakan untuk menjaga object event tetap ada dan berlaku setelah fungsi event handler
    // sumber https://legacy.reactjs.org/docs/legacy-event-pooling.html
    event.persist();

    if (isFocusEvent(event)) {
      onFocus?.(event);
    } else if (isMouseEvent(event)) {
      onMouseEnter?.(event);
    }

    handleOpen(event);
  };

  const handleClose = (
    event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    window.clearTimeout(openTimer);
    window.clearTimeout(closeTimer);

    const timer = window.setTimeout(() => {
      setShow(false);

      onClose?.(event);
    }, leaveDelay);

    setCloseTimer(timer);
  };

  const handleLeave = (
    event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    // digunakan untuk menjaga object event tetap ada dan berlaku setelah fungsi event handler
    // sumber https://legacy.reactjs.org/docs/legacy-event-pooling.html
    event.persist();

    if (isFocusEvent(event)) {
      onBlur?.(event);
    } else if (isMouseEvent(event)) {
      onMouseLeave?.(event);
    }

    handleClose(event);
  }

  const whenBlur = isFocus ? handleLeave : undefined;
  const whenFocus = isFocus ? handleEnter : undefined;

  const whenMouseEnter = isMouse ? handleEnter : undefined;
  const whenMouseLeave = isMouse ? handleLeave : undefined;

  // for accesibility
  const tabIndex = isFocus ? 0 : undefined;

  // styling tiap-tiap position
  const positionStyles: Record<TooltipPosition, string> = {
    top: '-top-2 left-[50%] -translate-x-[50%] -translate-y-[100%]',
    bottom: '-bottom-1 left-[50%] -translate-x-[50%] translate-y-[100%]',
    left: '-left-1 top-[50%] -translate-x-[100%] -translate-y-[50%]',
    right: '-right-1 top-[50%] translate-x-[100%] -translate-y-[50%]'
  };

  return (
    <div
      className='relative inline-block whitespace-nowrap'
      onMouseEnter={whenMouseEnter}
      onMouseLeave={whenMouseLeave}
      tabIndex={tabIndex}
      onFocus={whenFocus}
      onBlur={whenBlur}
      role='tooltip'
    >
      <span
        className={[
            // lebih baik gunakanan library semacam classnames clsx
          'absolute z-50 w-max p-2 font-normal text-center text-white rounded-sm shadow-md bg-black/75',
          position && positionStyles[position],
          show ? 'opacity-100 transition duration-200' : 'opacity-0'
        ].join(" ")}
        style={{
          ...style
        }}
        {...props}
      >
        {content}
      </span>
      {children}
    </div>
  )
}