import fs from "fs";
import path from "path";
import { getWin32Apps } from "./registry.js";
import { getStoreApps } from "./appx.js";
import { normalizeWin32, normalizeStore } from "./normalize.js";

const OUTPUT_PATH = path.resolve("output", "inventory.json");

async function run() {
  console.log("🔍 Collecting installed software...");

  const win32Raw = await getWin32Apps();
  const storeRaw = await getStoreApps();

  const inventory = {
    captured_at: new Date().toISOString(),
    os: "windows",
    software: [...normalizeWin32(win32Raw), ...normalizeStore(storeRaw)],
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(inventory, null, 2));
  console.log("✅ Inventory saved to output/inventory.json");
}

run().catch((err) => {
  console.error("❌ Error:", err);
});
