import esClient from "../utils/elasticsearch";

class SearchService {
  constructor(private readonly _esCleint = esClient) { };

  async search(params: { index: string, query: string }) {
    const { index, query } = params;

    if (index === "subtopics") {
      const response = await this._esCleint.search({
        index, query: {
          bool: {
            should: [
              {
                match: {
                  subTopicName: query
                }
              },
              {
                match: {
                  subTopicDescription: query
                }
              }
            ]
          }

        }
      });

      return response.hits.hits
    }

    if (index === "topics") {
      const response = await this._esCleint.search({
        index, query: {
          bool: {
            should: [
              {
                match: {
                  topicName: query
                }
              },
              {
                match: {
                  topicDescription: query
                }
              }
            ]
          }

        }
      });

      return response.hits.hits
    }

    if (index === "tutorials") {
      const response = await this._esCleint.search({
        index, query: {
          bool: {
            should: [
              {
                match: {
                  tutorialName: query
                }
              },
              {
                match: {
                  tutorialDescription: query
                }
              }
            ]
          }

        }
      });

      return response.hits.hits
    }

    if (index === "categories") {
      const response = await this._esCleint.search({
        index, query: {
          bool: {
            should: [
              {
                match: {
                  tutorialName: query
                }
              },
              {
                match: {
                  tutorialDescription: query
                }
              }
            ]
          }

        }
      });

      return response.hits.hits
    }

  }
}

export default new SearchService();