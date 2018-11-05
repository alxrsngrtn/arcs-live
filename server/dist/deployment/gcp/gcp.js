import { K18sContainerManager } from "../k18s/manager";
import { GCPDiskManager } from "./gcpdisk";
/**
 * Implementation of Cloud interface for GCP.
 */
export class GCPCloud {
    containers() {
        return new K18sContainerManager();
    }
    disks() {
        return new GCPDiskManager();
    }
}
//# sourceMappingURL=gcp.js.map