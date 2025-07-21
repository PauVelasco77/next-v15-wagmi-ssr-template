# Next.js 15 + Wagmi SSR + MetaMask Example

A complete example demonstrating how to integrate MetaMask wallet connection with Next.js 15, Wagmi v2, and shadcn/ui components with full Server-Side Rendering (SSR) support.

## Features

- ✅ **MetaMask Integration** - Connect and disconnect wallet with injected providers
- ✅ **Multiple Wallets** - Support for MetaMask and other injected wallets
- ✅ **Network Switching** - Switch between Ethereum Mainnet and Sepolia testnet
- ✅ **Account Information** - Display wallet address, ENS names, and ETH balance
- ✅ **SSR Support** - Full server-side rendering compatibility with proper hydration
- ✅ **TypeScript** - Fully typed with proper TypeScript integration
- ✅ **Modern UI** - Beautiful components using shadcn/ui and Tailwind CSS
- ✅ **Error Handling** - Robust error handling for wallet operations

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Wagmi v2** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **TanStack Query** - Data synchronization for React
- **shadcn/ui** - Beautiful and accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety and developer experience

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension installed
- Ethereum testnet funds (for testing on Sepolia)

### Installation

1. Clone and install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **Connect Wallet**: Click on "MetaMask" or "Injected" to connect your wallet
2. **View Account Info**: Once connected, see your address, ENS name, and balance
3. **Switch Networks**: Use the network switcher to change between Mainnet and Sepolia
4. **Disconnect**: Click "Disconnect" to disconnect your wallet

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Web3Provider
│   ├── page.tsx            # Main demo page
│   └── globals.css         # Global styles
├── components/
│   ├── wallet-connect-button.tsx  # Wallet connection component
│   ├── wallet-info.tsx           # Account information display
│   ├── network-switcher.tsx      # Network switching component
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── wagmi.ts              # Wagmi configuration
│   └── utils.ts              # Utility functions
└── providers/
    └── web3-provider.tsx     # Web3 context provider
```

## Key Components

### Wagmi Configuration (`src/lib/wagmi.ts`)

```typescript
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

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

Wraps the application with Wagmi and TanStack Query providers for SSR compatibility.

### Wallet Connection (`src/components/wallet-connect-button.tsx`)

Handles wallet connection/disconnection with loading states and error handling.

### Account Information (`src/components/wallet-info.tsx`)

Displays connected wallet details including address, ENS name, balance, and network.

### Network Switcher (`src/components/network-switcher.tsx`)

Allows users to switch between supported Ethereum networks.

## SSR Considerations

This example properly handles SSR with:

- **Hydration-safe providers** - Web3Provider is client-side only
- **Conditional rendering** - Components check connection state before rendering wallet-specific content
- **Loading states** - Proper loading indicators during async operations
- **Error boundaries** - Graceful error handling for wallet operations

## Customization

### Adding New Networks

Edit `src/lib/wagmi.ts` and `src/components/network-switcher.tsx`:

```typescript
import { polygon, arbitrum } from "wagmi/chains";

// Add to chains array and transports
const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  // ...
});
```

### Adding New Connectors

Add additional wallet connectors in `src/lib/wagmi.ts`:

```typescript
import { walletConnect, coinbaseWallet } from "wagmi/connectors";

const config = createConfig({
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: "your-project-id" }),
    coinbaseWallet({ appName: "Your App" }),
  ],
  // ...
});
```

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**: Ensure all wallet-dependent components are wrapped in client-side checks
2. **MetaMask Not Detected**: Make sure MetaMask extension is installed and enabled
3. **Network Errors**: Check that you're connected to a supported network
4. **Balance Not Loading**: Verify you're connected to the correct network with funds

### Development Tips

- Use browser developer tools to inspect wallet connection state
- Check console for detailed error messages
- Test with different networks and account states
- Use React DevTools to inspect component state

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Resources

- [Wagmi Documentation](https://wagmi.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Viem Documentation](https://viem.sh/)
- [MetaMask Developer Documentation](https://docs.metamask.io/)
