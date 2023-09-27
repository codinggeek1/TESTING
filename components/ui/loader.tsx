import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { FC } from 'react';

interface Props {
  className?: string;
  width?: string;
  height?: string;
}

export const Loader: FC<Props> = ({ className, width = '70px', height = '70px' }) => {
  return <Loader2Icon className={cn('animate-spin', className)} width={width} height={height} />;
};
