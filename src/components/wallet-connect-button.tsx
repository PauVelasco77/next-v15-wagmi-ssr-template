"use client";

import { useState } from "react";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import type { Connector } from "wagmi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Loader2 } from "lucide-react";

export const WalletConnectButton = () => {
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [connectingConnector, setConnectingConnector] = useState<string | null>(
    null,
  );

  const handleConnect = (connector: Connector) => {
    setConnectingConnector(connector.id);
    connect(
      { connector },
      {
        onSettled: () => setConnectingConnector(null),
      },
    );
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-sm">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </Badge>
        <Button onClick={() => disconnect()} variant="outline" size="sm">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => handleConnect(connector)}
          disabled={isPending || connectingConnector === connector.id}
          className="w-full justify-start"
          variant="outline"
        >
          {connectingConnector === connector.id ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Wallet />
          )}
          {connector.name}
        </Button>
      ))}
    </div>
  );
};
