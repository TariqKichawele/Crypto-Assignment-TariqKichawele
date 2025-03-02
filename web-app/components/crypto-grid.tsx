"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptocurrencies } from "@/lib/api";
import { CryptoCard } from "@/components/crypto-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export function CryptoGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["cryptocurrencies"],
    queryFn: fetchCryptocurrencies,
  });

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Data refreshed",
        description: "Cryptocurrency prices have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error refreshing data",
        description: "Failed to update cryptocurrency prices.",
        variant: "destructive",
      });
    }
  };

  // Take only the top 5 cryptocurrencies from the data
  const topFiveCryptos = data?.slice(0, 5);

  const filteredCryptos = topFiveCryptos?.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Error loading data</h2>
        <p className="text-muted-foreground mb-4">
          Failed to fetch cryptocurrency data. Please try again later.
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 mx-auto">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50 border-primary/20 focus-visible:ring-primary/50"
          />
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={isFetching}
          className="w-full sm:w-auto bg-primary/80 hover:bg-primary border-primary/50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Refreshing..." : "Refresh Prices"}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-2 border-primary/20 bg-card/40 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-16 w-full mb-4" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredCryptos && filteredCryptos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCryptos.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">No cryptocurrencies found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or refreshing the data.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}