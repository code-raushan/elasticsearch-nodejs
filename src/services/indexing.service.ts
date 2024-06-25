import { BadRequestError } from "../errors/bad-request.error";
import esClient from "../utils/elasticsearch";
import logger from "../utils/logger";

interface BulkResponseErrorItem {
  status: number;
  error: {
    type: string;
    reason: string;
    index: string;
    index_uuid: string;
    shard: string;
    [key: string]: any;
  };
}

class IndexingService {
  constructor(private readonly _esCleint = esClient) { };

  async indexDocument(params: { index: string, id: string, document: unknown }) {
    const { index, id, document } = params;
    try {
      const response = await this._esCleint.index({
        index,
        id,
        document
      });
      logger.info(`Succesfully indexed the document - ${response} `);
    } catch (error) {
      logger.error(`Error indexing the document - ${error}`);
      throw new BadRequestError("Failed to index the document");
    }
  }

  async bulkIndexDocuments(params: { index: string, documents: unknown }) {
    const { index, documents } = params;

    if (!Array.isArray(documents)) throw new BadRequestError("documents are not in json format(not valid arrays)")

    const body = documents.flatMap(doc => [{ index: { _index: index } }, doc]);

    try {
      const bulkResponse = await this._esCleint.bulk({ refresh: true, body });


      if (bulkResponse.errors) {
        const erroredDocuments: BulkResponseErrorItem[] = [];
        bulkResponse.items.forEach((action: any, i: number) => {
          const operation = Object.keys(action)[0];
          if (action[operation].error) {
            erroredDocuments.push({
              status: action[operation].status,
              error: action[operation].error,
            });
          }
        });
        console.error('Bulk insert errors:', erroredDocuments);
      } else {
        console.log('All documents inserted successfully');
      }
    } catch (error) {
      logger.error(`failed to index bulk documents - ${error}`);
      throw new BadRequestError("failed to index bulk")
    }
  }
}

export default new IndexingService();