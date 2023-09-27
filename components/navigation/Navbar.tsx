import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  return (
    <nav className="flex justify-between p-3 md:justify-end md:p-4 lg:p-5">
      <div className="flex items-center gap-1 md:hidden" onClick={() => setHamburger(!hamburger)}>
        <Image src="/create-black-logo.svg" width={50} height={50} alt="Create Logo" />
        <ChevronRight className="h-5 w-5 text-black" />
      </div>
      {hamburger && (
        <div
          className={`fixed inset-0 z-30 h-screen ${
            hamburger ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <HamburgerMenu setHamburger={setHamburger} hamburger={hamburger} />
          <div
            className="absolute h-full w-screen bg-gray-900 opacity-60"
            onClick={() => setHamburger(false)}
          ></div>
        </div>
      )}
      <ConnectButton
        chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
        showBalance={{ smallScreen: false, largeScreen: true }}
      />
    </nav>
  );
};

export default Navbar;
