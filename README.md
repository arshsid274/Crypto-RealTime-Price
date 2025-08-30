# Crypto Price Tracking 

A modern Next.js application for chfeaturing real-time cryptocurrency price tracking with interactive charts.

## 🚀 Features

- **Cryto Price**: Browse
- **Real-time Crypto Tracking**: Live cryptocurrency price monitoring with interactive charts
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with shadcn/ui components
- **Dark/Light Theme**: Theme switching support
- **TypeScript**: Full type safety throughout the application

## 📊 Real-time Data Visualization

The application includes a sophisticated real-time crypto price tracking system:

- **Live Price Updates**: Prices update every 2 seconds
- **Interactive Charts**: Built with Recharts for smooth data visualization
- **Historical Data**: Maintains 100 data points for trend analysis
- **Multi-currency Support**: USD and INR price tracking
- **Responsive Charts**: Optimized for all screen sizes

### Supported Cryptocurrencies
- Bitcoin (BTC)
- Dogecoin (DOGE)
- Pi Network (PI)

## 🛠 Tech Stack

- **Framework**: Next.js 15.2.4
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts 2.15.0
- **Icons**: Lucide React
- **Theme**: next-themes

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm package manager

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketplace-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
marketplace-main/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── crypto-prices/ # Real-time crypto data endpoint
│   ├── browse/            # Browse prompts page
│   ├── crypto/            # Real-time crypto charts page
│   ├── governance/        # Governance page
│   ├── profile/           # User profile page
│   ├── sell/              # Sell prompts page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── crypto-chart.tsx  # Real-time crypto chart component
│   ├── hero.tsx          # Landing page hero
│   ├── navigation.tsx    # Main navigation
│   └── footer.tsx        # Footer component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🎯 Key Pages

- **Home** (`/`): Landing page with hero section and featured prompts
- **Browse** (`/browse`): Browse available AI prompts
- **Sell** (`/sell`): Create and sell your AI prompts
- **Crypto** (`/crypto`): Real-time cryptocurrency price charts
- **Profile** (`/profile`): User profile management
- **Governance** (`/governance`): Platform governance features

## 📈 Real-time Chart Features

The crypto chart component (`/crypto`) provides:

- **Live Updates**: Automatic data refresh every 2 seconds
- **Price History**: Visual representation of price movements
- **Percentage Changes**: 24-hour change indicators
- **Dual Currency**: Both USD and INR pricing
- **Interactive Tooltips**: Hover for detailed information
- **Responsive Design**: Adapts to all screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

The project uses Tailwind CSS for styling and shadcn/ui for components. You can customize:

- **Colors**: Modify `tailwind.config.js`
- **Components**: Edit files in `components/ui/`
- **Themes**: Configure in `components/theme-provider.tsx`

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Responsive navigation
- Adaptive chart sizing
- Touch-friendly interactions

## 🔒 Security Features

- TypeScript for type safety
- Input validation with Zod
- Secure API endpoints
- CORS protection

## 🚀 Deployment

The application can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.
