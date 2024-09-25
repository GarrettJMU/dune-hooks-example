import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type {AppProps} from 'next/app';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {WagmiProvider} from 'wagmi';
import {RainbowKitProvider} from '@rainbow-me/rainbowkit';
// import {DuneProvider} from '../providers';
import {DuneProvider} from '@duneanalytics/hooks'
import {config} from '../wagmi';

const client = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <DuneProvider duneApiKey="">
                    <RainbowKitProvider>
                        <Component {...pageProps} />
                    </RainbowKitProvider>
                </DuneProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default MyApp;
