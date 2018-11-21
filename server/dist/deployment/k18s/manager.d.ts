/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Container, ContainerManager } from "../containers";
import { Disk } from "../disks";
import { Core_v1Api, Extensions_v1beta1Api } from "@kubernetes/client-node";
export declare class K18sContainerManager implements ContainerManager {
    k8sApi: Core_v1Api;
    k8sBetaApi: Extensions_v1beta1Api;
    k8sName: string;
    appName: string;
    releaseName: string;
    constructor();
    /**
     * Find a free node in the GCP cluster where we're going to deploy. Currently picks at random:
     * TODO: watch out for picking full nodes
     * TODO: can we use K8S node affinity somehow for this instead?
     */
    findAvailableNode(): Promise<string>;
    deploy(fingerprint: string, rewrappedKey: string, encryptedDisk: Disk): Promise<Container>;
    private requestUpdateIngress;
    private requestCreateService;
    private requestCreateDeployment;
    private createContainer;
    private createVolumeMount;
    /**
     * Create a reference to an existing GCE disk.
     * @param volumeName the name of the volume
     * @param encryptedDisk the existing disk already created by GCE
     */
    private createGCEVolume;
    /**
     * Creates a new Kubernetes 'PersistentVolume' object.
     * @param k8sApi kubernetes API
     * @param encryptedDisk the GCE disk to use
     */
    private requestNewPersistentVolume;
    private makePersistentVolumeSpec;
    find(fingerprint: string): Promise<Container | null>;
}
