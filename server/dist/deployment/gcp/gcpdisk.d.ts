import { Disk, DiskManager } from "../disks";
export declare const DEFAULT_GCP_DISK_SIZE = "10";
/**
 * Allows the provisioning of encrypted disk storage in a
 * cloud provider.
 */
export declare class GCPDiskManager implements DiskManager {
    create(fingerprint: string, wrappedKey: string, rewrappedKey: string): Promise<Disk>;
    delete(disk: Disk): Promise<void>;
    find(fingerprint: string): Promise<Disk | null>;
}
