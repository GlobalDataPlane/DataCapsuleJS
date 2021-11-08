class CapsuleRecord {
    constructor(data) {
        // Signature?
        this.headerHash;
        this.previousRecord;
        this.previousHash;
        this.dataHash;
        this.data = data;
    }
}

class DataCapsule {
    constructor(ownerKey, protocol, version, encodingScheme) {
        // Should we also have forward links?
        this.ownerKey = ownerKey;
        this.protocol = protocol;
        this.version = version;
        this.encodingScheme = encodingScheme;
        this.instanceID; // Nonce?

        // Hash over basic data to generate GDPname
        this.recentRecord;
        this.name;

        return this.name;
    }

    readLast() {
        return recentRecord;
    }

    write(key, data) {
        // Confirm key is valid
        // Create new CapsuleRecord
        // Generate data hashe
        // Pull hash for prev record
        // Confirm hash for prev record
        // Add prev record data for Capsule record
        // Generate header hash
        // Append and update DataCapsule
        // Return hash of record
        return;
    }
}
