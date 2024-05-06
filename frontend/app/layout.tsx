import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { EdgeStoreProvider } from "./lib/edgestore";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const dosis = Dosis({
  subsets: ["latin"],
  weight: "600"
}  );

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  cache: new InMemoryCache()
});

export const metadata: Metadata = {
  title: "HaalSamachar",
  description: "Just the place you need to vent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={dosis.className}>
        {/* <ApolloProvider client={client}> */}
      <EdgeStoreProvider>
        {children}
        </EdgeStoreProvider>  
        {/* </ApolloProvider> */}
        <Footer />
        </body>
        
    </html>
  );
}
