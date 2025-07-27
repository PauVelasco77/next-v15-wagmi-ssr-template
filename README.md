# Next.js 15 + Wagmi SSR Template

A production-ready template for building Web3 applications with Next.js 15, Wagmi v2, and full Server-Side Rendering (SSR) support. This template provides everything you need to get started with Ethereum wallet integration, including MetaMask support, network switching, and modern UI components.

## 🚀 Quick Start

```bash
# Clone the template
npx create-next-app@latest my-web3-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes

# Navigate to your project
cd my-web3-app

# Install wagmi dependencies
npm install wagmi viem @tanstack/react-query

# Copy the template files
# (See "Template Structure" section below)
```

## ✨ Template Features

### 🔗 **Wallet Integration**
- **MetaMask Support** - Full MetaMask wallet connection and management
- **Multiple Wallets** - Support for injected wallets and other providers
- **Connection States** - Proper loading states and error handling
- **Auto-reconnection** - Persistent wallet connections across sessions

### 🌐 **Network Management**
- **Multi-chain Support** - Ethereum Mainnet and Sepolia testnet
- **Network Switching** - Easy switching between supported networks
- **Chain Validation** - Automatic network detection and validation
- **Custom Networks** - Easy to add additional networks

### 📊 **Account Information**
- **Wallet Details** - Display address, ENS names, and balances
- **Real-time Updates** - Live balance and network updates
- **ENS Integration** - Ethereum Name Service support
- **Transaction History** - Ready for transaction tracking

### 🎨 **Modern UI/UX**
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Dark/Light Mode** - Theme switching with system preference
- **Responsive Design** - Mobile-first responsive layout
- **Loading States** - Smooth loading indicators and transitions
- **Error Handling** - User-friendly error messages and recovery

### ⚡ **Performance & SSR**
- **Server-Side Rendering** - Full SSR support with proper hydration
- **TypeScript** - Complete type safety throughout the application
- **Optimized Builds** - Production-ready with Next.js optimizations
- **SEO Friendly** - Proper meta tags and structured data

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js 15** | React framework with App Router | 15.4.2 |
| **Wagmi v2** | React hooks for Ethereum | Latest |
| **Viem** | TypeScript interface for Ethereum | Latest |
| **TanStack Query** | Data synchronization | Latest |
| **shadcn/ui** | UI component library | Latest |
| **Tailwind CSS** | Utility-first CSS framework | 4.x |
| **TypeScript** | Type safety and DX | 5.x |

## 📁 Template Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main demo page
│   └── globals.css             # Global styles
├── components/
│   ├── wallet-connect-button.tsx  # Wallet connection UI
│   ├── wallet-info.tsx           # Account information display
│   ├── network-switcher.tsx      # Network switching component
│   ├── theme-toggle.tsx          # Dark/light mode toggle
│   ├── theme-provider.tsx        # Theme context provider
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── wagmi.ts                  # Wagmi configuration
│   └── utils.ts                  # Utility functions
└── providers/
    └── web3-provider.tsx         # Web3 context provider
```

## 🔧 Configuration

### Wagmi Setup (`src/lib/wagmi.ts`)

```typescript
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // Enable SSR support
});
```

### Web3 Provider (`src/providers/web3-provider.tsx`)

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```

## 🎯 Usage Examples

### Connect Wallet
```typescript
import { useConnect, useAccount } from 'wagmi';

const { connect, connectors } = useConnect();
const { isConnected, address } = useAccount();

// Connect to MetaMask
const handleConnect = () => {
  const metaMaskConnector = connectors.find(c => c.id === 'metaMask');
  if (metaMaskConnector) {
    connect({ connector: metaMaskConnector });
  }
};
```

### Display Account Info
```typescript
import { useAccount, useBalance, useEnsName } from 'wagmi';

const { address, isConnected } = useAccount();
const { data: ensName } = useEnsName({ address });
const { data: balance } = useBalance({ address });

if (isConnected && address) {
  return (
    <div>
      <p>Address: {address}</p>
      <p>ENS: {ensName}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
    </div>
  );
}
```

### Switch Networks
```typescript
import { useSwitchChain, useChainId } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

const { switchChain } = useSwitchChain();
const chainId = useChainId();

const switchToSepolia = () => {
  switchChain({ chainId: sepolia.id });
};
```

## 🔄 Customization

### Adding New Networks

1. **Update Wagmi Config** (`src/lib/wagmi.ts`):
```typescript
import { polygon, arbitrum } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
  // ...
});
```

2. **Update Network Switcher** (`src/components/network-switcher.tsx`):
```typescript
const SUPPORTED_CHAINS = [mainnet, sepolia, polygon, arbitrum];
```

### Adding New Wallet Connectors

```typescript
import { walletConnect, coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: 'your-project-id' }),
    coinbaseWallet({ appName: 'Your App' }),
  ],
  // ...
});
```

### Custom Hooks

Create custom hooks for common Web3 operations:

```typescript
// src/hooks/use-wallet.ts
import { useAccount, useBalance, useEnsName } from 'wagmi';

export const useWallet = () => {
  const { address, isConnected, chainId } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });

  return {
    address,
    isConnected,
    chainId,
    ensName,
    balance,
  };
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**:
- Connect your GitHub repository
- Vercel will automatically detect Next.js
- Environment variables are handled automatically

### Other Platforms

The template works with any platform that supports Next.js:
- **Netlify** - Automatic deployment from Git
- **Railway** - Easy container deployment
- **AWS Amplify** - Full-stack deployment
- **Docker** - Containerized deployment

## 🔍 SSR Best Practices

### Hydration Safety
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const WalletComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return isConnected ? <ConnectedView /> : <ConnectButton />;
};
```

### Error Boundaries
```typescript
import { ErrorBoundary } from 'react-error-boundary';

export const Web3App = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Web3Provider>
        <YourApp />
      </Web3Provider>
    </ErrorBoundary>
  );
};
```

## 🧪 Testing

### Unit Tests
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### E2E Tests
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Test Examples
```typescript
// __tests__/wallet-connect.test.tsx
import { render, screen } from '@testing-library/react';
import { WalletConnectButton } from '@/components/wallet-connect-button';

describe('WalletConnectButton', () => {
  it('shows connect button when not connected', () => {
    render(<WalletConnectButton />);
    expect(screen.getByText(/connect/i)).toBeInTheDocument();
  });
});
```

## 📚 Learning Resources

- **[Wagmi Documentation](https://wagmi.sh/)** - Complete API reference
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework guides
- **[Viem Documentation](https://viem.sh/)** - Ethereum interface
- **[shadcn/ui Documentation](https://ui.shadcn.com/)** - UI components
- **[MetaMask Developer Docs](https://docs.metamask.io/)** - Wallet integration

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This template is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Wagmi Team](https://wagmi.sh/)** - For the amazing React hooks
- **[Viem Team](https://viem.sh/)** - For the TypeScript Ethereum interface
- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful UI components
- **[Next.js Team](https://nextjs.org/)** - For the incredible React framework

---

**Ready to build the future of Web3?** 🚀

This template provides everything you need to create production-ready Web3 applications with modern tooling, type safety, and excellent developer experience.
