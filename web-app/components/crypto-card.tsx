"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cryptocurrency } from "@/lib/api";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const priceChangeIsPositive = crypto.price_change_percentage_24h >= 0;
  const sparklineData = crypto.sparkline_in_7d?.price.map((price, index) => ({
    value: price,
    index,
  })) || [];

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <img
            src={crypto.image}
            alt={crypto.name}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <h3 className="font-bold text-lg tracking-tight">{crypto.name}</h3>
            <p className="text-muted-foreground text-xs uppercase">{crypto.symbol}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-mono text-lg font-bold">{formatCurrency(crypto.current_price)}</p>
          <div className={`flex items-center text-xs ${priceChangeIsPositive ? "text-green-500" : "text-red-500"}`}>
            {priceChangeIsPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
            <span>{formatPercentage(crypto.price_change_percentage_24h)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="h-16 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={priceChangeIsPositive ? "#10b981" : "#ef4444"}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4 text-xs">
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-mono font-medium">{formatCurrency(crypto.market_cap)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Volume (24h)</p>
            <p className="font-mono font-medium">{formatCurrency(crypto.total_volume)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}