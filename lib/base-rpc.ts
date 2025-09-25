import { OnchainData } from './types';

const BASE_RPC_URL = 'https://mainnet.base.org';

export async function fetchLatestBlockData(): Promise<OnchainData> {
  try {
    // Fetch latest block
    const blockResponse = await fetch(BASE_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
        id: 1,
      }),
    });

    if (!blockResponse.ok) {
      throw new Error('Failed to fetch block data');
    }

    const blockData = await blockResponse.json();
    
    if (blockData.error) {
      throw new Error(blockData.error.message);
    }

    const block = blockData.result;
    
    // Fetch gas price
    const gasPriceResponse = await fetch(BASE_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 2,
      }),
    });

    const gasPriceData = await gasPriceResponse.json();
    
    return {
      blockNumber: parseInt(block.number, 16),
      blockHash: block.hash,
      timestamp: parseInt(block.timestamp, 16),
      gasPrice: gasPriceData.result || '0x0',
      transactionCount: block.transactions?.length || 0,
      difficulty: block.difficulty,
    };
  } catch (error) {
    console.error('Error fetching Base network data:', error);
    
    // Fallback to mock data for development
    return {
      blockNumber: Math.floor(Math.random() * 1000000) + 10000000,
      blockHash: '0x' + Math.random().toString(16).substring(2, 66),
      timestamp: Math.floor(Date.now() / 1000),
      gasPrice: '0x' + Math.floor(Math.random() * 50000000000).toString(16),
      transactionCount: Math.floor(Math.random() * 200) + 50,
    };
  }
}

export async function fetchBlockByNumber(blockNumber: number): Promise<OnchainData> {
  try {
    const response = await fetch(BASE_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [`0x${blockNumber.toString(16)}`, false],
        id: 1,
      }),
    });

    const data = await response.json();
    const block = data.result;
    
    return {
      blockNumber: parseInt(block.number, 16),
      blockHash: block.hash,
      timestamp: parseInt(block.timestamp, 16),
      gasPrice: '0x0', // Not available for historical blocks
      transactionCount: block.transactions?.length || 0,
      difficulty: block.difficulty,
    };
  } catch (error) {
    console.error('Error fetching historical block:', error);
    throw error;
  }
}
