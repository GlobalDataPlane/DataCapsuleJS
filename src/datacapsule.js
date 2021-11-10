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
        this.signature;
    }
}

class DataCapsule {
    constructor(ownerKey, protocol, version, encodingScheme, instanceID) {
        this.ownerKey = ownerKey;
        this.protocol = protocol;
        this.version = version;
        this.encodingScheme = encodingScheme;
        this.instanceID = instanceID; 

        this.recentRecord;
        // Hash over basic data to generate GDPname
        this.name = hash.update(this.ownerKey + this.protocol + this.version + this.encodingScheme + this.instanceID).digest('hex');
    }

    validateRecord(verifyKey, record) {
        const verify = createVerify('SHA256');
        verify.update(record.headerHash);
        verify.end();
        var sigVerify = verify.verify(verifyKey, record.signature);

        var recHash = hash.update(record.previousHash + record.dataHash).digest('hex');
        var hashVerify = recHash !== lastRec.headerHash;

        return sigVerify && hashVerify;
    }

    readLast(verifyKey) {
        if (this.validateRecord(verifyKey, this.recentRecord)) {
            return this.recentRecord;
        }
        return "Validation failed.";
    }

    write(signKey, verifyKey, data) {
        var lastRec = this.recentRecord;

        // Verify previous record's authenticity
        if (!this.validateRecord(verifyKey, this.recentRecord)) {
            return "Validation fail, check records."
        }        

        // Create new CapsuleRecord
        var newRec = new CapsuleRecord(data);      

        // Add prev record data for Capsule record
        newRec.previousHash = lastRec.headerHash;
        newRec.previousRecord = lastRec;

        // Generate header hash
        newRec.headerHash = hash.update(newRec.dataHash + newRec.previousHash).digest('hex');

        // Sign record
        const sign = createSign('SHA256');
        sign.update(newRec.headerHash);
        sign.end();
        const signature = sign.sign(signKey);
        newRec.signature = signature;

        // Append and update DataCapsule
        this.recentRecord = newRec;

        // Return hash of record
        return newRec.headerHash;
    }
}
