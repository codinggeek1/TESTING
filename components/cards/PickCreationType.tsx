import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui';
import { BatchMintForm } from './BatchMintForm';

const contracts = [
  {
    name: 'Single Token',
    description:
      'Single Token is a standard of NFT, in which each type of Token is unique and has distinct value. It is typically suitable for most cases. ERC721 is more complex than ERC20, and has multiple extensions.',
  },
  {
    name: 'Batch Minting',
    description:
      'Batch Minting is a token standard that enables dynamic NFT Creation and can deploy multiple token types like non-fungible, fungible, and semi-fungible tokens in Single Contracts.',
  },
  {
    name: 'Edition',
    description:
      "Edition is an enhanced version of the ERC721 standard that aims to solve Ethereum's scalability and gas fee problems. The ERC721A standard lowers transaction fees and enables the minting of multiple tokens for almost the same price as a single token.",
  },
  {
    name: 'Mint Page',
    description:
      'Mint Page is a community-run platform that grants members voting rights and is controlled by tokens or network functions tokens.',
  },
];

interface PickCreationTypeProps {
  id: string;
}

export const PickCreationType: FC<PickCreationTypeProps> = ({ id }) => {
  const [activeType, setActiveType] = useState(contracts[0].name);
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="my-6 w-full sm:w-1/2 lg:my-6 lg:w-1/3 2xl:w-1/4"
          size={'lg'}
          variant={'secondary'}
        >
          Mint Creation
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] rounded-xl lg:max-w-[42rem] xl:max-w-[48rem]">
        <DialogHeader>
          <DialogTitle className="self-start text-xl">Pick your Contract Type</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:px-4 lg:grid-cols-2 lg:gap-6">
          {contracts.map((contract) => (
            <div
              key={contract.name}
              className={`cursor-pointer space-y-1 rounded-xl p-4 ${
                activeType === contract.name ? 'bg-secondary text-white' : 'bg-muted'
              }`}
              onClick={() => setActiveType(contract.name)}
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{contract.name}</p>
                <div
                  className={`h-5 w-5 rounded-full ${
                    activeType === contract.name
                      ? 'border-[4px] border-white bg-secondary'
                      : 'bg-gray-300'
                  }`}
                ></div>
              </div>
              <p className="text-xs">{contract.description}</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          {activeType === 'Batch Minting' ? (
            <BatchMintForm />
          ) : (
            <Button
              size={'lg'}
              variant={'outline'}
              className="w-fit self-center"
              onClick={() => {
                activeType === 'Single Token'
                  ? router.push(`/collection/${id}/create/single`)
                  : activeType === 'Batch Minting'
                  ? router.push(`/collection/${id}/create/batch`)
                  : activeType === 'Edition'
                  ? router.push(`/collection/${id}/create/edition`)
                  : activeType === 'Mint Page'
                  ? router.push(`/collection/${id}/create/mintpage`)
                  : null;
              }}
            >
              Continue
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
