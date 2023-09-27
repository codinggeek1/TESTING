import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Thanks = (address: any) => {
  const router = useRouter();

  useEffect(() => {
    const redirectToUsernamePage = () => {
      void router.push(`/`);
    };

    const timer = setTimeout(redirectToUsernamePage, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur-md">
      <div className="scale-75 rounded-[1.5rem] bg-white px-4 py-8 lg:px-12 lg:py-12">
        <div className="flex flex-col items-center justify-center  ">
          <Image
            src="/animation_llroti3v_small.gif"
            alt="animation"
            height={200}
            width={200}
            className="max-h-25 flex-shrink-0"
          />
          <h3 className="py-4 text-sm font-bold sm:text-xl md:text-2xl lg:text-3xl ">Thank You!</h3>
          <p className="mx-auto flex text-sm font-normal sm:text-xl md:text-xl lg:text-2xl">
            Get Started Right Away...
          </p>
          {/* <p className="mx-auto text-lg font-normal sm:text-xl md:text-xl lg:text-2xl  ">
            Creativity Shine
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Thanks;
