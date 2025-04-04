import { NextResponse } from 'next/server';

// Keep a cache of historical data
let historicalDataCache: { [key: string]: { time: number; price: number; priceInr: number }[] } = {};
const MAX_POINTS = 100; // Keep 100 points of data

// Initialize the cache with some starter data
function initializeCache(id: string, currentPrice: number, currentPriceInr: number) {
  const now = Date.now();
  const points = [];
  for (let i = MAX_POINTS; i > 0; i--) {
    points.push({
      time: now - (i * 1000), // One point per second
      price: currentPrice,
      priceInr: currentPriceInr
    });
  }
  return points;
}

async function fetchCryptoData() {
  try {
    const now = Date.now();

    // Mock data with realistic values and small random variations
    const mockData = [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        currentPrice: 65000 + (Math.random() * 1000 - 500),
        currentPriceInr: (65000 + (Math.random() * 1000 - 500)) * 83,
        percentChange24h: 2.5 + (Math.random() * 0.2 - 0.1),
        percentChange24hInr: 2.5 + (Math.random() * 0.2 - 0.1),
      },
      {
        id: "74",
        name: "Dogecoin",
        symbol: "DOGE",
        currentPrice: 0.15 + (Math.random() * 0.01 - 0.005),
        currentPriceInr: (0.15 + (Math.random() * 0.01 - 0.005)) * 83,
        percentChange24h: -1.2 + (Math.random() * 0.2 - 0.1),
        percentChange24hInr: -1.2 + (Math.random() * 0.2 - 0.1),
      },
      {
        id: "21174",
        name: "Pi Network",
        symbol: "PI",
        currentPrice: 0.007 + (Math.random() * 0.001 - 0.0005),
        currentPriceInr: (0.007 + (Math.random() * 0.001 - 0.0005)) * 83,
        percentChange24h: 0.8 + (Math.random() * 0.2 - 0.1),
        percentChange24hInr: 0.8 + (Math.random() * 0.2 - 0.1),
      }
    ];

    // Process and combine the data
    const processedData = mockData.map((crypto) => {
      // Initialize cache for this crypto if it doesn't exist
      if (!historicalDataCache[crypto.id]) {
        historicalDataCache[crypto.id] = initializeCache(crypto.id, crypto.currentPrice, crypto.currentPriceInr);
      }

      // Add new price point
      historicalDataCache[crypto.id].push({
        time: now,
        price: crypto.currentPrice,
        priceInr: crypto.currentPriceInr
      });

      // Keep only the last MAX_POINTS entries
      if (historicalDataCache[crypto.id].length > MAX_POINTS) {
        historicalDataCache[crypto.id] = historicalDataCache[crypto.id].slice(-MAX_POINTS);
      }
      
      return {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        currentPrice: crypto.currentPrice,
        currentPriceInr: crypto.currentPriceInr,
        percentChange24h: crypto.percentChange24h,
        percentChange24hInr: crypto.percentChange24hInr,
        priceHistory: [...historicalDataCache[crypto.id]]
      };
    });

    return processedData;
  } catch (error) {
    console.error('Error generating mock data:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const data = await fetchCryptoData();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    );
  }
} 