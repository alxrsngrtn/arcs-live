import { GCPCloud } from "./gcp/gcp";
/**
 * Offers implementations for various cloud providers, currently limited
 * to GCP.
 */
export class CloudManager {
    static forGCP() {
        return new GCPCloud();
    }
}
//# sourceMappingURL=cloud.js.map