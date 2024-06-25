import subtopics from "../subtopics.json";
import indexingService from "./services/indexing.service";
import logger from "./utils/logger";

async function main() {
  try {
    await indexingService.bulkIndexDocuments({ index: "categories", documents: subtopics })
  } catch (error) {
    logger.error(`error bulk inserting docs to elasticsearch - ${error}`)
  }
}

main();