# Coding Assessment: SidharthApiTest

A small Express server with one endpoint that reads public data from the USDC smart contract on Ethereum mainnet using ethers.js.

## What it does

- `GET /api/SidharthApiTest` connects to Ethereum through an RPC URL
- Reads `name`, `symbol`, `decimals` and `totalSupply` from the USDC contract
- Returns the result as JSON
- A client script calls the endpoint and prints the result to the console

Only read calls are used, so no wallet, private key or gas is needed.

## Setup

You need Node 18 or higher.

```bash
npm install
cp .env.example .env
```

Open `.env` and set your own RPC URL (Alchemy, Infura or any public RPC):

```bash
-RPC_URL=https://1rpc.io/eth
-PORT=3000
```

## Run

Start the server in one terminal:

```bash
node src/server/server.js
```

Run the client in another terminal:

```bash
node src/client/testSidharthApi.js
```

## Sample output

```bash
-Smart contract data fetched successfully:

-Network:      Ethereum Mainnet
-Contract:     0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
-Name:         USD Coin
-Symbol:       USDC
-Decimals:     6
-Total Supply: 48098449520.677223 USDC
```

## Notes

- The RPC URL is read from `.env`, so it is easy to swap providers. Some ISPs block public RPC hosts, in which case use a different provider or a VPN.
- If the contract call fails, the endpoint returns a 500 with a short error message instead of crashing.