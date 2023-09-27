import LoginNavbar from '@/components/auth/LoginNavbar';
import VerificationProvider from '@/components/auth/VerificationProvider';
import Navbar from '@/components/navigation/Navbar';
import SideNavbar from '@/components/navigation/SideNavbar';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@arcana/auth';
import { ProvideAuth } from '@arcana/auth-react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '../styles/globals.css';

const queryClient = new QueryClient();

const provider = new AuthProvider('xar_test_a9fa9d6cb60431dabf1b08a7eff9aa74456790eb');

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli, sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '8eb4b75708da4f3c9ba120f9cfd92457',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// const provider = new AuthProvider('xar_test_a9fa9d6cb60431dabf1b08a7eff9aa74456790eb');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ProvideAuth provider={provider}>
            <RecoilRoot>
              <VerificationProvider Component={Component} pageProps={pageProps} />
              <Toaster />
            </RecoilRoot>
          </ProvideAuth>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
