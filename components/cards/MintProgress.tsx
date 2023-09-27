import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui';

interface MintProgressProps {
  open: boolean;
  network: string;
  step: number;
}

const steps = [
  {
    title: 'Uploading metadata',
    description: 'We are uploading your metadata to IPFS',
  },
  {
    title: 'Awaiting confirmation',
    description: 'We are waiting for your confirmation',
  },
  {
    title: 'Minting',
    description: 'We are minting your creation',
  },
];

export const MintProgress: FC<MintProgressProps> = ({ open, network, step }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="w-[95%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="self-start text-xl">Minting a creation on {network}</DialogTitle>
        </DialogHeader>
        <div className="relative my-4 flex flex-col justify-between gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="mr-2">
                  {step === i + 1 ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                      <div className="h-4 w-4 animate-ping rounded-full bg-black"></div>
                    </div>
                  ) : (
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-black ${
                        i + 1 < step ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      <span className={`${i + 1 < step ? 'text-white' : 'text-black'}`}>
                        {i + 1}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{s.title}</span>
                  <span className="text-sm text-muted-foreground">{s.description}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute left-3.5 top-1/2 -z-10 h-[80%] w-0.5 -translate-y-1/2 bg-gray-400" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
