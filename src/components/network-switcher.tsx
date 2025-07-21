"use client";

import { useSwitchChain, useChainId } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network } from "lucide-react";

const SUPPORTED_CHAINS = [mainnet, sepolia];

export const NetworkSwitcher = () => {
  const { switchChain, isPending } = useSwitchChain();
  const chainId = useChainId();

  const currentChain = SUPPORTED_CHAINS.find((chain) => chain.id === chainId);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Network className="h-4 w-4" />
        <span className="text-sm font-medium">Current Network:</span>
        <Badge variant={currentChain ? "default" : "destructive"}>
          {currentChain?.name || `Unknown (${chainId})`}
        </Badge>
      </div>

      <div className="flex gap-2">
        {SUPPORTED_CHAINS.map((chain) => (
          <Button
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            disabled={isPending || chainId === chain.id}
            variant={chainId === chain.id ? "default" : "outline"}
            size="sm"
          >
            {chain.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
