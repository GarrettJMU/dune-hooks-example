"use client"
import {ConnectButton} from '@rainbow-me/rainbowkit';
import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useTokenBalances, useTransactions} from '@duneanalytics/hooks';
import React from 'react';
import {BalanceData} from '../types';
import { useAccount } from 'wagmi'


const Home: NextPage = () => {
    const account = useAccount()

    const {data} = useTokenBalances(account.address, {})
    const { data: transactionData, isLoading, error, nextPage, previousPage, currentPage } = useTransactions(account.address, {});
    console.log("transactionData", transactionData, currentPage, nextPage, previousPage)
    console.log("data", data)

    return (
        <div className={styles.container}>
            <Head>
                <title>RainbowKit App</title>
                <meta
                    content="Generated by @rainbow-me/create-rainbowkit"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://github.com/duneanalytics/hooks" target="_blank">Dune Hooks</a> + <a
                    href="">wagmi</a> +{' '}
                    <a href="">Rainbowkit</a>
                </h1>

                <ConnectButton showBalance={false}/>
                <BalanceTable balances={data?.balances || []}/>
                <TransactionTable data={transactionData} isLoading={isLoading} error={error} nextPage={nextPage} currentPage={currentPage} previousPage={previousPage}/>
            </main>

            <footer className={styles.footer}>
                <a href="https://dune.com" target="_blank">
                    Made with ❤️ by your frens at Dune
                </a>
            </footer>
        </div>
    );
};

export default Home;

interface BalanceTableProps {
    balances: BalanceData[];
}

const balanceTableStyles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
        marginTop: '20px',
    },
    headerCell: {
        borderBottom: '2px solid #4CAF50',
        textAlign: 'left' as const,
        padding: '8px',
        backgroundColor: '#f2f2f2',
        color: '#333',
    },
    row: {
        borderBottom: '1px solid #ddd',
    },
    cell: {
        padding: '8px',
        color: '#555',
    },
};


const BalanceTable: React.FC<BalanceTableProps> = ({balances}) => {
    console.log(balances)
    return (
        <div>
            <h2>Token Balances</h2>
        <table style={balanceTableStyles.table}>
            <thead>
            <tr>
                <th style={balanceTableStyles.headerCell}>Address</th>
                <th style={balanceTableStyles.headerCell}>Amount</th>
                <th style={balanceTableStyles.headerCell}>Chain</th>
            </tr>
            </thead>
            <tbody>
            {balances.map((balance, index) => (
                <tr key={index} style={balanceTableStyles.row}>
                    <td style={balanceTableStyles.cell}>{balance.address}</td>
                    <td style={balanceTableStyles.cell}>{balance.amount}</td>
                    <td style={balanceTableStyles.cell}>{balance.chain}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};


const TransactionTable: React.FC<{ data: any[], isLoading: boolean }> = ({data, isLoading, error, previousPage, nextPage, currentPage}) => {
    return (
        <div>
            <h2>Transactions</h2>
            <table style={balanceTableStyles.table}>
                <thead>
                <tr>
                    <th style={balanceTableStyles.headerCell}>Address</th>
                    <th style={balanceTableStyles.headerCell}>Hash</th>
                    <th style={balanceTableStyles.headerCell}>Chain</th>
                </tr>
                </thead>
                <tbody>
                {data?.transactions.map(tx => (
                    <tr key={tx.hash} style={balanceTableStyles.row}>
                        <td style={balanceTableStyles.cell}>{tx.to}</td>
                        <td style={balanceTableStyles.cell}>{tx.hash}</td>
                        <td style={balanceTableStyles.cell}>{tx.chain}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={previousPage} disabled={currentPage === 0}>
                Previous Page
            </button>
            <button onClick={nextPage} disabled={!data?.next_offset}>
                Next Page
            </button>
            <p>Page: {currentPage + 1 || 1}</p>
        </div>
    );
}

