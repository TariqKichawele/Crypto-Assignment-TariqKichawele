export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-card/40 py-6 mt-12">
      <div className="container max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          Powered by CoinGecko API. Prices update every minute.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CryptoTrack. All rights reserved.
        </p>
      </div>
    </footer>
  );
}