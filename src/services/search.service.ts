import esClient from "../utils/elasticsearch";

class SearchService {
  constructor(private readonly _esCleint = esClient) { };

  async search(params: { index: string, query: string }) {
    const { index, query } = params;

    const response = await this._esCleint.search({
      index, query: {
        match: {
          categoryName: query
        }
      }
    });

    return { response }
  }
}

export default new SearchService();