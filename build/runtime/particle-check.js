export class Check {
    constructor(handle, acceptedTags) {
        this.handle = handle;
        this.acceptedTags = acceptedTags;
    }
    static fromASTNode(handle, astNode) {
        return new Check(handle, astNode.trustTags);
    }
    toManifestString() {
        return `check ${this.handle.name} is ${this.acceptedTags.join(' or is ')}`;
    }
    toShortString() {
        return this.acceptedTags.join('|');
    }
}
//# sourceMappingURL=particle-check.js.map