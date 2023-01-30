import React from 'react';

interface iconProps {
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  icon: string;
  onClick?: () => void;
}

export const UiIcons = ({
  size = 'medium',
  backgroundColor,
  icon,
  ...props
}: iconProps) => {
  return (
    <button
      type='button'
      className={['ui-icon', `ui-icon--${size}`].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      <span className='material-icons'>{icon}</span>
    </button>
  );
};

// export default UiIcons;
