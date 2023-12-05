import app from "./app.js";
import { authenticate, syncUp } from "./config/database/database.js";
import { envs } from "./config/enviroments/enviroments.js";

async function main() {
  try {
    await authenticate();
    await syncUp();
  } catch (error) {
    console.error(error+" (⊙_☉)");
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`Server running on port: ${envs.PORT} ᕕ(⌐■_■)ᕗ ♪♬ Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ`);
});
