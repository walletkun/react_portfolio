import { LRUCache } from "lru-cache";

const options = {
    max: 50, // Max number items to store
    ttl: 1000 * 60 * 60, // Cache TTL (10 minutes) TTL means Time To Live
};


const cache = new LRUCache(options);
export default cache;