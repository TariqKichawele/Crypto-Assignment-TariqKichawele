import { Header } from "@/components/header";
import { CryptoGrid } from "@/components/crypto-grid";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-7xl mx-auto mb-12 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
            Cryptocurrency Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time prices and market data for the top 5 cryptocurrencies
          </p>
        </div>
        <CryptoGrid />
      </main>
      <Footer />
    </div>
  );
}