import Image from 'next/image';
import { FC } from 'react';

interface ContractOverviewProps {
  step: number;
}

const stepData = [
  {
    title: 'Deploy Contract',
    description: 'Configure your contract and deploy it on the blockchain',
  },
  {
    title: 'Mint NFTs',
    description: 'Mint your NFTs as Single/Batches/Editions and configure their metadata',
  },
  {
    title: 'Extend it on various marketplaces',
    description:
      'Specify who will get paid when a Creation gets sold on the secondary marketplace.',
  },
];

const Step = ({
  title,
  description,
  active,
}: {
  title: string;
  description: string;
  active: 'Done' | 'Active' | 'Waiting';
}) => {
  return (
    <div
      className={`flex items-center gap-5 rounded-xl px-4 py-3 ${
        active === 'Active' ? 'bg-primary text-white' : 'bg-muted'
      }`}
    >
      {active === 'Done' ? (
        <Image src="/check-circle-green.svg" width={25} height={25} alt="check" />
      ) : active === 'Active' ? (
        <Image src="/active-circle.svg" width={25} height={25} alt="check" />
      ) : (
        <Image src="/disabled-circle.svg" width={25} height={25} alt="check" />
      )}
      <div className="space-y-2">
        <p className="font-semibold">{title}</p>
        <p className="text-xs sm:w-4/5">{description}</p>
      </div>
    </div>
  );
};

const ContractOverview: FC<ContractOverviewProps> = ({ step = 0 }) => {
  return (
    <div className="py-5 lg:w-3/4 lg:py-8 xl:w-3/5">
      <div className="relative flex flex-col gap-8 md:gap-10 lg:gap-12">
        {stepData.map((data, index) => (
          <Step
            key={index}
            title={data.title}
            description={data.description}
            active={index < step ? 'Done' : index === step ? 'Active' : 'Waiting'}
          />
        ))}
        <div className="absolute left-7 top-0 -z-10 h-full border border-dashed border-black"></div>
      </div>
    </div>
  );
};

export default ContractOverview;
