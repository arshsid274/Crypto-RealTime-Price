"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState, useCallback } from 'react'

interface CryptoData {
  id: string
  name: string
  symbol: string
  currentPrice: number
  currentPriceInr: number
  priceHistory: { time: number; price: number; priceInr: number }[]
  percentChange24h: number
  percentChange24hInr: number
}

const cryptoCurrencies = [
  {
    id: "1",  // Bitcoin's ID in CoinMarketCap
    name: "Bitcoin",
    symbol: "BTC",
    color: "#F7931A"
  },
  {
    id: "74", // Dogecoin's ID in CoinMarketCap
    name: "Dogecoin",
    symbol: "DOGE",
    color: "#BA9F33"
  },
  {
    id: "21174", // Pi Network's ID in CoinMarketCap
    name: "Pi Network",
    symbol: "PI",
    color: "#7B1FA2"
  }
]

export function FeaturedPrompts() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showInr, setShowInr] = useState(false)

  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await fetch('/api/crypto-prices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setCryptoData(data);
        setLoading(false);
      } else {
        console.error('Invalid data format:', data);
        setError('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setError('Failed to fetch crypto data');
    }
  }, []);

  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 1000);
    return () => clearInterval(intervalId);
  }, [fetchCryptoData]);

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return '0.00'
    if (price < 0.01) return price.toFixed(6)
    if (price < 1) return price.toFixed(4)
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  if (error) {
    return (
      <div className="py-16 px-6 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Live Crypto Prices</h2>
          <Button
            onClick={() => setShowInr(!showInr)}
            variant="outline"
          >
            Show in {showInr ? 'USD' : 'INR'}
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cryptoCurrencies.map((crypto) => {
            const data = cryptoData.find(d => d.id === crypto.id)
            const sortedHistory = data?.priceHistory?.sort((a, b) => a.time - b.time) || []
            
            return (
              <Card key={crypto.id} className="group relative overflow-hidden transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{crypto.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {data ? (
                          <div className="space-y-1">
                            <div className="text-xl font-bold">
                              {showInr ? '₹' : '$'}{formatPrice(showInr ? data.currentPriceInr : data.currentPrice)}
                            </div>
                            <div className={`text-sm ${((showInr ? data.percentChange24hInr : data.percentChange24h) || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {((showInr ? data.percentChange24hInr : data.percentChange24h) || 0) >= 0 ? '↑' : '↓'} {Math.abs((showInr ? data.percentChange24hInr : data.percentChange24h) || 0).toFixed(2)}%
                            </div>
                          </div>
                        ) : 'Loading...'}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{crypto.symbol}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="h-[200px]">
                  {!loading && data && sortedHistory.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sortedHistory}>
                        <Line
                          type="monotone"
                          dataKey={showInr ? 'priceInr' : 'price'}
                          stroke={crypto.color}
                          dot={false}
                          strokeWidth={2}
                          isAnimationActive={false}
                        />
                        <XAxis
                          dataKey="time"
                          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                          domain={['dataMin', 'dataMax']}
                          type="number"
                          scale="time"
                        />
                        <YAxis 
                          domain={['auto', 'auto']}
                          width={80}
                          tickFormatter={(value) => `${showInr ? '₹' : '$'}${formatPrice(value)}`}
                        />
                        <Tooltip
                          formatter={(value: number) => [`${showInr ? '₹' : '$'}${formatPrice(value)}`, 'Price']}
                          labelFormatter={(label) => new Date(label).toLocaleString()}
                          contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      {loading ? 'Loading chart...' : 'No data available'}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Live Updates</span>
                  <Button>View Details</Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

