import Compute from '@google-cloud/compute';
import { arcsKeyFor } from "../utils";
/**
 * Represents disk storage provisioned on a cloud provider.
 */
class GCPDisk {
    constructor(diskApi) {
        this.diskApi = diskApi;
    }
    isAttached() {
        return false;
    }
    mount(rewrappedKey) {
        return false;
    }
    id() {
        return this.diskApi.name;
    }
    type() {
        return 'gcePersistentDisk';
    }
}
/**
 * Allows the provisioning of encrypted disk storage in a
 * cloud provider.
 */
export class GCPDiskManager {
    async create(wrappedKey, rewrappedKey) {
        const arcskey = arcsKeyFor(wrappedKey);
        const config = {
            sizeGb: 10,
            name: arcskey,
            "diskEncryptionKey": {
                "rsaEncryptedKey": rewrappedKey
            },
            labels: {}
        };
        config[arcskey] = true;
        try {
            const compute = new Compute();
            const zone = compute.zone('us-central1-a');
            const [disk, operation, resp] = await zone.createDisk(arcskey, config);
            return Promise.resolve(new GCPDisk(disk));
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async find(fingerprint) {
        const compute = new Compute();
        const zone = compute.zone('us-central1-a');
        const [disks, nextQuery, apiResponse] = await zone.getDisks({ autoPaginate: false });
        for (const disk of disks) {
            const metadata = await disk.getMetadata().then(data => data[0]);
            if (metadata['labels'] && metadata['labels'][arcsKeyFor(fingerprint)] === true ||
                disk.name === arcsKeyFor(fingerprint)) {
                return Promise.resolve(new GCPDisk(disk));
            }
        }
        return Promise.resolve(null);
    }
}
//# sourceMappingURL=gcpdisk.js.map