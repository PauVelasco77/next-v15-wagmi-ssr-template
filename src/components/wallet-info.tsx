"use client";

import { useAccount, useBalance, useEnsName } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, AlertCircle } from "lucide-react";

export const WalletInfo = () => {
  const { address, isConnected, chainId } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance, isError, isLoading } = useBalance({ address });

  if (!isConnected || !address) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No wallet connected. Please connect your wallet to view account
          information.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Information
        </CardTitle>
        <CardDescription>Connected wallet details and balance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Address
          </label>
          <p className="font-mono text-sm break-all">{address}</p>
          {ensName && (
            <Badge variant="secondary" className="mt-1">
              {ensName}
            </Badge>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Chain ID
          </label>
          <p className="text-sm">{chainId}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Balance
          </label>
          {isLoading && <p className="text-sm">Loading...</p>}
          {isError && (
            <p className="text-sm text-destructive">Error loading balance</p>
          )}
          {balance && (
            <p className="text-sm">
              {Number(balance.formatted).toFixed(4)} {balance.symbol}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
