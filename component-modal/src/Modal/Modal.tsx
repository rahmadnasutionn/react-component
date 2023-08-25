
import * as React from 'react'
import { useLockBodyScroll, useOnClickOutside } from './hooks';
import cn from 'classnames'

type ModalSize = 'auto' | 'sm' | 'md' | 'lg';
type ModalColor = 'white' | 'zinc'
type ModalPosition = 'top' | 'center' | 'bottom';

interface ModalProps {
  open?: boolean;
  title: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  modalSize?: ModalSize;
  modalPosition?: ModalPosition;
  modalColor?: ModalColor;
};

function Modal({
  open,
  title,
  content,
  footer,
  onClose,
  modalColor = 'white',
  modalSize = 'md',
  modalPosition = 'top'
}: ModalProps) {

  const modalRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, () => {
    if (open) {
      onClose()
    }
  });
  useLockBodyScroll()

  if (!open) return null;

  const modalSizeStyle: Record<ModalSize, string> = {
    auto: 'w-auto',
    sm: 'sm:w-[18.75rem] w-[calc(100vw-6rem)]',
    md: 'w-[calc(100vw-6rem)] sm:w-[18.75rem] md:w-[31.25rem]',
    lg: 'w-[calc(100vw-6rem)] sm:w-[18.75rem] md:w-[31.25rem] lg:w-[50rem]'
  };

  const modalPositionStyle: Record<ModalPosition, string> = {
    top: 'mt-12 top-0',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'mt-52 translate-y-1/2'
  };

  const modalColorStyle: Record<ModalColor, string> = {
    white: 'bg-white text-gray-900',
    zinc: 'bg-zinc-800 text-zinc-100'
  };

  return (
    <div
      className='fixed top-0 left-0 w-screen h-screen z-10 inset-0'
      role='dialog'
      aria-modal='true'
    >
      <div className="pt-4 px-4 pb-20 text-center sm:p-0 h-screen">
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          aria-hidden='true'
        >
          <div 
            ref={modalRef} 
            className={cn(
              "relative inline-block rounded text-left overflow-hidden shadow-2xl transform transition-all",
              modalSizeStyle[modalSize],
              modalPositionStyle[modalPosition],
              modalColorStyle[modalColor]
            )}
          >
          <button
            type='button'
            className='absolute text-white top-0 right-0 text-2xl flex items-center justify-center m-6'
            onClick={onClose}
          >
            X
          </button>

          <div className="p-4 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="w-full text-center sm:mt-0 sm:text-left">
                <h3 className='text-base leading-6 mb-6'>
                  {title}
                </h3>
                <div className='mt-2 w-full text-sm'>
                  {content}
                </div>
              </div>
            </div>
          </div>

          {footer && (
            <div className="px-6 py-4 sm:px-6 sm:flex sm:flex-row sm:justify-end">
              {footer}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

