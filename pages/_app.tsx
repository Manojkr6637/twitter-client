import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {  Quicksand } from "next/font/google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({ subsets: ["latin"] });
import {Toaster} from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={quickSand.className}>
      <QueryClientProvider client={queryClient}>
       <GoogleOAuthProvider clientId="891060304559-vhjg3tn4647tnsb4tcco302r3nslgvn4.apps.googleusercontent.com">
   
      <Component {...pageProps} />;
      <Toaster />
      <ReactQueryDevtools/>
      </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
    
  ); 
}
