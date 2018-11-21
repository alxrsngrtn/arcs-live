import { ContainerManager } from "./containers";
import { DiskManager } from "./disks";
/**
 * Top level interface representing a Cloud service provider capable
 * of provisioning storage and node deployments.
 */
export interface Cloud {
    containers(): ContainerManager;
    disks(): DiskManager;
}
/**
 * Offers implementations for various cloud providers, currently limited
 * to GCP.
 */
export declare class CloudManager {
    static forGCP(): Cloud;
}
