import Image from 'next/image';

const LoginNavbar = () => {
  return (
    <div className="flex items-center gap-2 lg:p-5">
      <Image src="/create-black-logo.svg" width={75} height={75} alt="Logo" />
      <Image
        src="/creator-console-text.svg"
        width={75}
        height={75}
        alt="Logo"
        className="hidden lg:block"
      />
    </div>
  );
};

export default LoginNavbar;
