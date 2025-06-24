import { useGesture } from 'react-use-gesture';
import { useCallback } from 'react';

interface UseSwipeGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export const useSwipeGesture = ({ onSwipeLeft, onSwipeRight }: UseSwipeGestureProps) => {
  const handleSwipeLeft = useCallback(onSwipeLeft, [onSwipeLeft]);
  const handleSwipeRight = useCallback(onSwipeRight, [onSwipeRight]);

  const bind = useGesture({
    onDrag: ({ direction: [dx], velocity: [vx] }) => {
      if (Math.abs(vx) > 0.2) {
        if (dx > 0) {
          handleSwipeRight();
        } else {
          handleSwipeLeft();
        }
      }
    },
  });

  return bind;
};