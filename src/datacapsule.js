class CapsuleRecord {
    constructor(data) {
        // Signature?
        this.previousRecord;
        this.previousHash;
        this.dataHash;
        this.data = data;

        this.headerHash;
        return this.headerHash;
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

        // Pull hash for prev record
        // Confirm hash for prev record
        var lastRec = this.recentRecord;
        var lastHash = compute;
        if (lastHash !== lastRec.headerHash) {
            return "Record manipulation detected, write rejected."
        }

        // Create new CapsuleRecord
        var newRec = new CapsuleRecord(data);

        // Generate data hashes
        

        // Add prev record data for Capsule record
        newRec.previousHash = lastHash;
        newRec.previousRecord = lastRec;

        // Generate header hash

        // Append and update DataCapsule
        this.recentRecord = newRec;

        // Return hash of record
        return newRec.headerHash;
    }
}
