import { Copy } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import { toast } from './use-toast';

interface CopyTextProps {
  text: string | undefined;
}

export const CopyText: FC<CopyTextProps> = ({ text }) => {
  return (
    <Copy
      size={14}
      className="hover:cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(text || '');
        toast({
          title: 'Copied to clipboard',
        });
      }}
    />
  );
};
