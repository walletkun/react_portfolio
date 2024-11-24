'use client';


import { PortfolioProvider } from "./portfolioContext";


export function Providers ({children}){
    return (
        <PortfolioProvider>
            {children}
        </PortfolioProvider>
    );
}