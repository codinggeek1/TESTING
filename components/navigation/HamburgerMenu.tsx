import {
  FileBarChart2,
  Folder,
  FolderClosed,
  HelpCircle,
  LogOut,
  User2,
  WalletCards,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  setHamburger: (value: boolean) => void;
  hamburger: boolean;
}

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
  {
    title: 'Docs',
    icon: <Folder className="h-5 w-5" />,
    link: 'https://docs.creatorconsole.com/',
  },
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

const HamburgerMenu: FC<Props> = ({ setHamburger, hamburger }) => {
  const router = useRouter();

  const handleRoute = (route: string) => {
    setHamburger(false);
    if (route === 'https://docs.creatorconsole.com/') {
      window.open(route, '_blank');
      return;
    }
    router.push(route);
  };

  return (
    <div
      className={`fixed z-40 h-full w-4/5 transform bg-white p-4 transition-all duration-500 ease-in-out sm:w-3/5 ${
        hamburger ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Image src="/create-black-logo.svg" width={60} height={60} alt="Create Logo" />
          <Image src="/creator-console-text.svg" width={60} height={60} alt="Create Logo" />
        </div>
        <XCircle className="h-6 w-6 text-black" onClick={() => setHamburger(false)} />
      </div>
      <div className="mb-6 mt-12 flex w-3/4 flex-col gap-6 pl-2">
        {mainNavData.map((item) => (
          <div
            key={item.title}
            className={`flex cursor-pointer items-center gap-3 ${
              router.pathname.slice(0, item.link.length) === item.link
                ? 'text-secondary'
                : 'text-gray-800'
            }`}
            onClick={() => handleRoute(item.link)}
          >
            {item.icon}
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="flex w-3/4 flex-col gap-6 border-y border-black py-6 pl-2">
        {bottomNavData.map((item) => (
          <div
            key={item.title}
            className="flex cursor-pointer items-center gap-3 text-gray-800"
            onClick={() => handleRoute(item.title)}
          >
            {item.icon}
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenu;
