import { Client } from "@elastic/elasticsearch";
import fs from "fs";
import path from "path";
import config from "../../config";
import logger from "../logger";

const esClient = new Client({
    node: "https://127.0.0.1:9200",
    auth: {
        username: "elastic",
        password: config.ELASTIC_PASSWORD
    },
    tls: {
        ca: fs.readFileSync(path.resolve(__dirname, "../../../http_ca.crt"))
    }
});

export const connectToESClient = async () => {
    const info = await esClient.info();
    if (!info.cluster_uuid) {
        logger.error("ElasticSearch Cluster not connected");
        process.exit();
    }
    logger.info(`ElasticSearch cluster - ${info.cluster_uuid}`);
}

export default esClient;