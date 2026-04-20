interface MonogramAvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-10 h-10 text-[0.8rem]',
  md: 'w-16 h-16 text-[1rem]',
  lg: 'w-20 h-20 text-[1.2rem]',
};

export default function MonogramAvatar({ initials, size = 'md', className = '' }: MonogramAvatarProps) {
  return (
    <div className={`monogram-avatar ${sizes[size]} ${className}`}>
      {initials}
    </div>
  );
}
