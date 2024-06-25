import tutorials from "../tutorials.json";
import indexingService from "./services/indexing.service";
import logger from "./utils/logger";

async function main() {
  try {
    await indexingService.bulkIndexDocuments({ index: "tutorials", documents: tutorials })
  } catch (error) {
    logger.error(`error bulk inserting docs to elasticsearch - ${error}`)
  }
}

main();