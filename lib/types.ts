export interface User {
  farcasterId: string;
  lastFortuneTimestamp?: number;
}

export interface Fortune {
  id: string;
  userId: string;
  fortuneText: string;
  onchainDataSource: string;
  onchainDataValue: string;
  timestamp: number;
  blockNumber?: number;
  transactionHash?: string;
}

export interface OnchainData {
  blockNumber: number;
  blockHash: string;
  timestamp: number;
  gasPrice: string;
  difficulty?: string;
  transactionCount: number;
}

export interface FortuneGenerationParams {
  userAddress?: string;
  blockData: OnchainData;
  randomSeed: number;
}
