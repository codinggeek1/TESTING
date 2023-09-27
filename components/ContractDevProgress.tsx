import Image from 'next/image';
import { FC } from 'react';

interface ContractDevProgressProps {
  currentStep: 'Form' | 'Features' | 'Deployment';
  backstep: () => void;
}

const ContractDevProgress: FC<ContractDevProgressProps> = ({ currentStep, backstep }) => {
  return (
    <div className="relative my-5 py-5 md:px-10 lg:mx-auto lg:my-7 lg:w-3/4 xl:my-10 xl:w-[70%] 2xl:w-3/5">
      <div
        className={`flex items-center justify-between ${
          currentStep === 'Form' && 'details-active'
        } ${currentStep === 'Features' && 'features-active'} ${
          currentStep === 'Deployment' && 'deploy-active'
        }`}
      >
        <div
          //! Detail
          onClick={() => backstep()}
          className={`${
            currentStep === 'Form'
              ? 'flex cursor-pointer items-center gap-1 rounded-[8px_47px_8px_8px] bg-gray-300 px-3 py-2'
              : currentStep === 'Features'
              ? 'flex'
              : ''
          }`}
        >
          {currentStep === 'Features' || currentStep === 'Deployment' ? (
            <Image
              width="20"
              height="20"
              src="/tick-circle.svg"
              alt="tick"
              //@ts-ignore
              className={`${currentStep === 'Form' ? '' : currentStep === 'Features' ? '' : 'w-0'}`}
            />
          ) : (
            <Image
              width="20"
              height="20"
              src="/test-deploy-detail.svg"
              alt="detail"
              className={`${currentStep === 'Form' ? '' : currentStep === 'Features' ? '' : 'w-0'}`}
            />
          )}
          <p
            className={`${
              currentStep === 'Form'
                ? 'font-semibold'
                : currentStep === 'Features'
                ? 'flex'
                : 'text-white'
            }`}
          >
            Contract Details
          </p>
        </div>
        <div
          //! Features
          className="features basic"
        >
          {currentStep === 'Deployment' ? (
            <Image width="20" height="20" src="/tick-circle.svg" alt="tick" />
          ) : (
            <Image width="20" height="20" src="/test-deploy-detail.svg" alt="detail" />
          )}
          <p>Contract Features</p>
        </div>
        <div
          //! Deployment
          className="deploy basic"
        >
          <Image width="20" height="20" src="/testnet-img.svg" alt="deploy" />
          <p>Testnet Deploy</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 flex w-3/4 -translate-x-1/2 justify-between">
        {currentStep === 'Form' || currentStep === 'Features' || currentStep === 'Deployment' ? (
          <div className="h-3 w-3 rounded-[50%] border-2 border-gray-300 bg-secondary"></div>
        ) : (
          <div className="h-3 w-3 rounded-[50%] border-2 border-secondary bg-gray-500"></div>
        )}
        {currentStep === 'Features' || currentStep === 'Deployment' ? (
          <div className="h-3 w-3 rounded-[50%] border-2 border-gray-300 bg-secondary"></div>
        ) : (
          <div className="h-3 w-3 rounded-[50%] border-2 border-secondary bg-gray-500"></div>
        )}
        {currentStep === 'Deployment' ? (
          <div className="h-3 w-3 rounded-[50%] border-2 border-gray-300 bg-secondary"></div>
        ) : (
          <div className="h-3 w-3 rounded-[50%] border-2 border-secondary bg-gray-500"></div>
        )}
      </div>
      <div className="absolute bottom-1 left-1/2 w-3/4 -translate-x-1/2 border border-dashed border-gray-600 lg:w-4/5"></div>
    </div>
  );
};

export default ContractDevProgress;
