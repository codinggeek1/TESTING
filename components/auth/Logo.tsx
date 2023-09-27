import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="p-4 lg:block">
      <Link href="/">
        <Image src="/logo.svg" width={100} height={100} alt="Logo" className="h-12 sm:h-16" />
      </Link>
    </div>
  );
};

export default Logo;
