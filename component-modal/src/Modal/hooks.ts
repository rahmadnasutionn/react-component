

import * as React from 'react'

export function useModal(): [boolean, { openModal: () => void, closeModal: () => void }] {
  const [open, setOpen] = React.useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return [open, { openModal, closeModal }];
};

export function useLockBodyScroll(
  lock: boolean = true,
  ref?: React.RefObject<HTMLElement>
): void {
  React.useLayoutEffect(() => {
    let element = ref?.current ?? document.body;

    if (lock) {
      let prevValue = element.style.overflow || 'visible';
      element.style.overflow = 'hidden';
      return () => {
        element.style.overflow = prevValue
      }
    }
  }, [lock, ref]);
};

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
  }, [handler, ref]);
}
