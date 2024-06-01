import { BadRequestError } from "../errors/bad-request.error";
import esClient from "../utils/elasticsearch";
import logger from "../utils/logger";

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
}

export default new IndexingService();