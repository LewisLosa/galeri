import React, { memo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

export const NavigationButton = memo<NavigationButtonProps>(({ 
  direction, 
  onClick, 
  disabled = false 
}) => {
  const Icon = direction === 'left' ? ChevronLeftIcon : ChevronRightIcon;
  const position = direction === 'left' ? 'left-3' : 'right-3';

  if (disabled) return null;

  return (
    <Button
      variant="ghost"
      className={`absolute ${position} top-[calc(50%-16px)]`}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      onClick={onClick}
      aria-label={`Go to ${direction === 'left' ? 'previous' : 'next'} image`}
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
});

NavigationButton.displayName = 'NavigationButton';