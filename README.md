# Crypto-Assignment Documentation

## Project Overview
Crypto-Assignment is a dual-platform application that provides cryptocurrency data visualization and tracking. It consists of both a web application and a mobile application, ensuring seamless access to market trends across different devices.

---

## Project Setup Guide

### Web Application
#### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn package manager

#### Installation & Running
1. Clone the repository:
   ```sh
   git clone https://github.com/TariqKichawele/Crypto-Assignment-TariqKichawele.git
   cd Crypto-Assignment-TariqKichawele/web
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the web application in your browser:
   ```
   http://localhost:3000
   ```

### Mobile Application
#### Prerequisites
- Node.js (latest LTS version recommended)
- Expo CLI (for React Native development)
- Android Emulator or physical device

#### Installation & Running
1. Navigate to the mobile project directory:
   ```sh
   cd Crypto-Assignment-TariqKichawele/mobile
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Expo development server:
   ```sh
   npm start
   ```
4. Open the app on an emulator or device using Expo Go.

---

## API Integration Details

### Data Fetching
The application fetches cryptocurrency market data using a CoinGecko public API, the API calls are made using **React Query** to handle caching and synchronization efficiently.

#### Example API Call
```js
import { useQuery } from 'react-query';

const fetchCryptoData = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const { data, error, isLoading } = useQuery('cryptoData', fetchCryptoData);
```

### Data Updates
For updating user preferences or saved data, **React Query** is used to manage server-state efficiently, ensuring minimal API calls and keeping data fresh.

---

## State Management
### Why React Query?
- Efficient data fetching and caching.
- Automatic background synchronization.
- Simplified API call handling with loading and error states.
- Eliminates the need for manual state management, reducing complexity.

---

## Challenges & Solutions

### Challenge: Handling Large API Responses
**Problem:** The API returned a large dataset, leading to performance issues when rendering the data.

**Solution:** Implemented pagination and lazy loading using React Query to only fetch and display the necessary data.

---

### Challenge: State Management for Multiple Data Sources
**Problem:** Managing different types of data (market trends, user settings) efficiently without unnecessary re-fetching.

**Solution:** Used React Query for both client-side caching and server-state management, reducing API calls and improving performance.

---

### Challenge: Mobile & Web Synchronization
**Problem:** Ensuring consistency between the web and mobile versions was difficult due to API rate limits.

**Solution:** Implemented caching and data synchronization strategies with React Query to minimize redundant API calls across devices.

---

## Conclusion
This project successfully integrates cryptocurrency data visualization across web and mobile platforms while maintaining efficiency in API usage and state management. With React Query handling caching and synchronization, it provides an optimized user experience.

---

For any questions or contributions, feel free to create an issue on the GitHub repository!

