import { FileBarChart2, FolderClosed, HelpCircle, LogOut, User2, WalletCards } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const mainNavData = [
  {
    title: 'Collections',
    icon: <FolderClosed className="h-5 w-5" />,
    link: '/',
  },
  {
    title: 'Assets',
    icon: <WalletCards className="h-5 w-5" />,
    link: '/assets',
  },
  {
    title: 'Analytics',
    icon: <FileBarChart2 className="h-5 w-5" />,
    link: '/analytics',
  },
  // {
  //   title: 'Docs',
  //   icon: '/docs-icon.svg',
  //   link: '/docs',
  // },
  {
    title: 'Profile',
    icon: <User2 className="h-5 w-5" />,
    link: '/profile',
  },
];

const bottomNavData = [
  {
    title: 'Help',
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    title: 'Logout',
    icon: <LogOut className="h-5 w-5" />,
  },
];

const SideNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`left-2 top-1/2 z-10 hidden h-[95vh] -translate-y-1/2 flex-col items-center justify-between rounded-3xl rounded-tr-[2.5rem] bg-black px-3 py-8 text-white transition-all duration-300 md:fixed md:flex
      ${isHovered ? 'w-[10rem]' : 'w-[5rem]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/">
        <Image
          src="/create-logo.svg"
          width={60}
          height={60}
          alt="Logo"
          className="cursor-pointer"
        />
      </Link>
      <div className="-mt-48 flex flex-col gap-10">
        {mainNavData.map((item) => (
          <div
            className={`relative flex w-full cursor-pointer items-center gap-4 opacity-80 hover:opacity-100
            ${
              router.pathname.slice(0, item.link.length) === item.link &&
              'brightness-200 before:absolute before:inset-0 before:rounded-3xl before:bg-white before:opacity-10'
            }
            `}
            key={item.title}
            onClick={() => router.push(item.link)}
          >
            {item.icon}
            <p className={`text-medium ${isHovered ? 'block' : 'hidden'}`}>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {bottomNavData.map((item) => (
          <div
            className="relative flex w-full cursor-pointer items-center gap-4 opacity-80 hover:opacity-100"
            key={item.title}
          >
            {item.icon}
            <p className={`text-medium ${isHovered ? 'block' : 'hidden'}`}>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
