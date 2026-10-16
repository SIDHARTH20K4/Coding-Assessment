// Simple client: calls our API endpoint and prints the result to the console
// (requires Node 18+ for built-in fetch)
const API_URL = `http://localhost:${process.env.PORT || 3000}/api/SidharthApiTest`;

async function main() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    // Treat HTTP errors or success:false as failures
    if (!response.ok || !result.success) {
      throw new Error(result.details || result.error || "Request failed");
    }

    // Print the fetched contract data
    console.log("Smart contract data fetched successfully:\n");
    console.log(`Network:      ${result.network}`);
    console.log(`Contract:     ${result.contract}`);
    console.log(`Name:         ${result.data.name}`);
    console.log(`Symbol:       ${result.data.symbol}`);
    console.log(`Decimals:     ${result.data.decimals}`);
    console.log(`Total Supply: ${result.data.totalSupply} ${result.data.symbol}`);
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    process.exit(1); // non-zero exit code signals failure
  }
}

main();