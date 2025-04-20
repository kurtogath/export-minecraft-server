import { uploadToDrive } from "./drive";
import { zipWorld } from "./zip";

async function main() {
  console.log(">> Iniciando backup...");

    await zipWorld(); 

    await uploadToDrive();

  console.log(">> Backup completo");
}

main();
