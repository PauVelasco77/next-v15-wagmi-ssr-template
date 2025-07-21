import { WalletConnectButton } from "@/components/wallet-connect-button";
import { WalletInfo } from "@/components/wallet-info";
import { NetworkSwitcher } from "@/components/network-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Next.js 15 + Wagmi SSR Example
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A complete example of integrating MetaMask wallet connection with
            Next.js 15, Wagmi v2, and shadcn/ui components with full SSR
            support.
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary">Next.js 15</Badge>
            <Badge variant="secondary">Wagmi v2</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="secondary">SSR Ready</Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Wallet Connection */}
          <Card>
            <CardHeader>
              <CardTitle>Wallet Connection</CardTitle>
              <CardDescription>
                Connect your MetaMask or other injected wallet to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WalletConnectButton />
            </CardContent>
          </Card>

          {/* Network Switcher */}
          <Card>
            <CardHeader>
              <CardTitle>Network Switching</CardTitle>
              <CardDescription>
                Switch between supported Ethereum networks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NetworkSwitcher />
            </CardContent>
          </Card>
        </div>

        {/* Wallet Information */}
        <div className="mb-8">
          <WalletInfo />
        </div>

        {/* Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Features Demonstrated</CardTitle>
            <CardDescription>
              This example showcases the following Web3 integration features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400">
                  ✓ Wallet Connection
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Connect and disconnect MetaMask and other injected wallets
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400">
                  ✓ Account Information
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Display wallet address, ENS name, and ETH balance
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400">
                  ✓ Network Switching
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Switch between Mainnet and Sepolia testnet
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400">
                  ✓ SSR Support
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Full server-side rendering compatibility with hydration
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400">
                  ✓ TypeScript
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Fully typed with proper TypeScript integration
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400">
                  ✓ Modern UI
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Beautiful components using shadcn/ui and Tailwind CSS
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <Github className="h-4 w-4" />
            Built with Next.js 15, Wagmi, and shadcn/ui
            <ExternalLink className="h-4 w-4" />
          </p>
        </div>
      </div>
    </div>
  );
}
