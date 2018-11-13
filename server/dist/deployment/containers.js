/**
 * Current status of a container, such as running, pending, failed.
 */
export var DeploymentStatus;
(function (DeploymentStatus) {
    /**
     * There is no container configured for this reference, possibly deleted.
     */
    DeploymentStatus[DeploymentStatus["NONEXISTENT"] = 0] = "NONEXISTENT";
    /**
     * Container is running (and attached), and ready to receive requests.
     */
    DeploymentStatus[DeploymentStatus["ATTACHED"] = 1] = "ATTACHED";
    /**
     * The Container is running, but it's disk is detached (or locked).
     */
    DeploymentStatus[DeploymentStatus["DETACHED"] = 2] = "DETACHED";
    /**
     * Container in the process of becoming ready, such as after a reboot, or deploymeny.
     */
    DeploymentStatus[DeploymentStatus["PENDING"] = 3] = "PENDING";
    /**
     * Container currently in a failure state, such as insufficient cluster resources, or disks
     * not available.
     */
    DeploymentStatus[DeploymentStatus["FAILURE"] = 4] = "FAILURE";
})(DeploymentStatus || (DeploymentStatus = {}));
//# sourceMappingURL=containers.js.map