#!/usr/bin/node
var crypto = require('crypto');
const hash = crypto.createHash('sha256');

class CapsuleRecord {
    constructor(data) {
        // Signature?
        this.previousRecord;
        this.previousHash;
        this.dataHash = hash.update(data).digest('hex');
        this.data = data;

        this.headerHash;
    }
}

class DataCapsule {
    constructor(ownerKey, protocol, version, encodingScheme) {
        this.ownerKey = ownerKey;
        this.protocol = protocol;
        this.version = version;
        this.encodingScheme = encodingScheme;
        this.instanceID; // Nonce?

        this.recentRecord;
        // Hash over basic data to generate GDPname
        this.name = hash.update(this.ownerKey + this.protocol + this.version + this.encodingScheme + this.instanceID).digest('hex');
    }

    readLast() {
        // TODO: Verify
        return recentRecord;
    }

    write(signKey, verifyKey, data) {
        // Confirm key is valid

        // Pull hash for prev record
        // Confirm hash for prev record
        var lastRec = this.recentRecord;
        var lastHash = hash.update(lastRec.previousHash + lastRec.dataHash).digest('hex');
        if (lastHash !== lastRec.headerHash) {
            return "Record manipulation detected, write rejected."
        }

        // Create new CapsuleRecord
        var newRec = new CapsuleRecord(data);      

        // Add prev record data for Capsule record
        newRec.previousHash = lastRec.headerHash;
        newRec.previousRecord = lastRec;

        // Generate header hash
        newRec.headerHash = hash.update(newRec.dataHash + newRec.previousHash).digest('hex');

        // Append and update DataCapsule
        this.recentRecord = newRec;

        // TODO: Sign

        // Return hash of record
        return newRec.headerHash;
    }
}
