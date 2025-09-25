import { OnchainData, FortuneGenerationParams } from './types';

// Predefined fortune templates with placeholders
const FORTUNE_TEMPLATES = [
  "The blockchain whispers of prosperity ahead. Block #{blockNumber} reveals your path to {outcome}.",
  "In the depths of transaction #{txCount}, your fortune crystallizes: {prediction}.",
  "The oracle sees through block hash {hashPrefix}... {wisdom} awaits you.",
  "Gas price of {gasPrice} gwei signals {interpretation}. Your destiny unfolds.",
  "From the ethereum of block {blockNumber}, a vision emerges: {prophecy}.",
  "The network's heartbeat at {timestamp} pulses with your future: {fortune}.",
  "Transaction volume speaks volumes: {txCount} paths lead to {destination}.",
  "The blockchain's memory holds your key: {insight} in the coming cycles.",
  "Block {blockNumber}'s energy resonates with {element}. {guidance} is yours.",
  "The decentralized oracle reveals: {revelation} through network consensus."
];

const OUTCOMES = [
  "financial abundance", "technological breakthrough", "network growth", 
  "digital prosperity", "blockchain mastery", "crypto enlightenment",
  "decentralized success", "smart contract wisdom", "token appreciation",
  "yield farming rewards"
];

const PREDICTIONS = [
  "your investments will flourish like a bull market",
  "new opportunities will emerge from the mempool",
  "your portfolio will find perfect balance",
  "innovation will reward your patience",
  "the market will smile upon your choices",
  "your digital assets will compound wisely"
];

const WISDOM = [
  "Great rewards await the patient hodler",
  "The wise trader reads between the blocks",
  "Fortune favors the decentralized mind",
  "Your network effect grows stronger",
  "The protocol rewards your dedication",
  "Consensus builds around your vision"
];

const INTERPRETATIONS = [
  "bullish momentum building", "market consolidation ahead", 
  "volatility brings opportunity", "steady growth approaching",
  "breakthrough imminent", "accumulation phase active"
];

const PROPHECIES = [
  "your next transaction will be legendary",
  "a new protocol will change your path",
  "your staking rewards will multiply",
  "the next block holds your answer",
  "your DeFi strategy will pay dividends",
  "a governance vote will favor you"
];

const INSIGHTS = [
  "timing is everything in the blockchain",
  "your private keys guard great potential",
  "the network sees your true value",
  "your contribution matters to consensus",
  "the ledger remembers your wisdom",
  "your transactions create ripple effects"
];

const ELEMENTS = [
  "proof-of-stake energy", "mining power", "validator strength",
  "liquidity flow", "smart contract logic", "consensus harmony"
];

const GUIDANCE = [
  "Trust the process, verify the outcome",
  "HODL strong, trade wisely",
  "Build for the long term",
  "Diversify across protocols",
  "Stay curious, stay learning",
  "The network rewards patience"
];

const REVELATIONS = [
  "your blockchain journey has just begun",
  "the next bull run includes you",
  "your technical analysis skills will improve",
  "a new DeFi opportunity approaches",
  "your NFT collection will gain value",
  "the metaverse awaits your presence"
];

function getRandomElement<T>(array: T[], seed: number): T {
  const index = Math.floor(seed * array.length);
  return array[index % array.length];
}

function generateSeedFromData(data: OnchainData, userSeed?: string): number {
  // Create a deterministic seed from blockchain data and user input
  const combined = `${data.blockNumber}-${data.blockHash}-${data.timestamp}-${userSeed || ''}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}

export function generateFortune(params: FortuneGenerationParams): string {
  const { blockData, userAddress } = params;
  const seed = generateSeedFromData(blockData, userAddress);
  
  // Select template and fill placeholders
  const template = getRandomElement(FORTUNE_TEMPLATES, seed);
  
  // Generate different seeds for different placeholders
  const seeds = {
    outcome: (seed * 1.1) % 1,
    prediction: (seed * 1.2) % 1,
    wisdom: (seed * 1.3) % 1,
    interpretation: (seed * 1.4) % 1,
    prophecy: (seed * 1.5) % 1,
    fortune: (seed * 1.6) % 1,
    destination: (seed * 1.7) % 1,
    insight: (seed * 1.8) % 1,
    element: (seed * 1.9) % 1,
    guidance: (seed * 2.0) % 1,
    revelation: (seed * 2.1) % 1,
  };
  
  let fortune = template
    .replace('{blockNumber}', blockData.blockNumber.toString())
    .replace('{txCount}', blockData.transactionCount.toString())
    .replace('{hashPrefix}', blockData.blockHash.substring(0, 8))
    .replace('{gasPrice}', (parseInt(blockData.gasPrice) / 1e9).toFixed(1))
    .replace('{timestamp}', new Date(blockData.timestamp * 1000).toLocaleTimeString())
    .replace('{outcome}', getRandomElement(OUTCOMES, seeds.outcome))
    .replace('{prediction}', getRandomElement(PREDICTIONS, seeds.prediction))
    .replace('{wisdom}', getRandomElement(WISDOM, seeds.wisdom))
    .replace('{interpretation}', getRandomElement(INTERPRETATIONS, seeds.interpretation))
    .replace('{prophecy}', getRandomElement(PROPHECIES, seeds.prophecy))
    .replace('{fortune}', getRandomElement(PREDICTIONS, seeds.fortune))
    .replace('{destination}', getRandomElement(OUTCOMES, seeds.destination))
    .replace('{insight}', getRandomElement(INSIGHTS, seeds.insight))
    .replace('{element}', getRandomElement(ELEMENTS, seeds.element))
    .replace('{guidance}', getRandomElement(GUIDANCE, seeds.guidance))
    .replace('{revelation}', getRandomElement(REVELATIONS, seeds.revelation));
  
  return fortune;
}

export function getFortuneRarity(blockData: OnchainData): 'common' | 'rare' | 'legendary' {
  const lastDigit = blockData.blockNumber % 10;
  const txCountMod = blockData.transactionCount % 100;
  
  // Legendary: 1% chance (block ends in 7 and tx count is divisible by 77)
  if (lastDigit === 7 && txCountMod % 77 === 0) {
    return 'legendary';
  }
  
  // Rare: 10% chance (block ends in 3 or 7)
  if (lastDigit === 3 || lastDigit === 7) {
    return 'rare';
  }
  
  return 'common';
}
