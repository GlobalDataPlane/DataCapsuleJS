#!/usr/bin/node
var crypto = require('crypto');

class CapsuleRecord {
    constructor(data) {
        this.previousRecord;
        this.previousHash;
        this.dataHash = crypto.createHash('sha256').update(data).digest('hex');
        this.data = data;

        this.headerHash;
        this.signature;
    }
}

class DataCapsule {
    constructor(ownerKey, protocol, version, encodingScheme, instanceID) {
        this.protocol = protocol;
        this.version = version;
        this.encodingScheme = encodingScheme;
        this.instanceID = instanceID; 

        this.recentRecord;
        // Hash over basic data to generate GDPname
        this.name = crypto.createHash('sha256').update(this.ownerKey + this.protocol + this.version + this.encodingScheme + this.instanceID).digest('hex');
        
        // Initial record
        var newRec = new CapsuleRecord("");      
        newRec.previousHash = "";
        newRec.headerHash = crypto.createHash('sha256').update(newRec.previousHash + newRec.dataHash).digest('hex');
        const sign = crypto.createSign('sha256');
        sign.update(newRec.headerHash);
        sign.end();
        const signature = sign.sign(ownerKey, 'hex');
        newRec.signature = signature;
        this.recentRecord = newRec;

    }
}

function validateRecord(record, verifyKey) {
    const verify = crypto.createVerify('SHA256');
    verify.update(record.headerHash);
    verify.end();
    var sigVerify = verify.verify(verifyKey, record.signature, 'hex');

    var recHash = crypto.createHash('sha256').update(record.previousHash + record.dataHash).digest('hex');
    var hashVerify = (recHash === record.headerHash);
    return sigVerify && hashVerify;
}

function dcReadLast(dataCapsule, verifyKey) {
    if (validateRecord(dataCapsule.recentRecord, verifyKey)) {
        return dataCapsule.recentRecord;
    }
    return "Validation failed.";
}

function dcWrite(dataCapsule, signKey, verifyKey, data) {
    var lastRec = dataCapsule.recentRecord;
    
    // Verify previous record's authenticity
    if (!validateRecord(dataCapsule.recentRecord, verifyKey)) {
        return "Validation fail, check records."
    }        
    
    // Create new CapsuleRecord
    var newRec = new CapsuleRecord(data);      

    // Add prev record data for Capsule record
    newRec.previousHash = lastRec.headerHash;
    newRec.previousRecord = lastRec;
    // Generate header hash
    newRec.headerHash = crypto.createHash('sha256').update(newRec.previousHash + newRec.dataHash).digest('hex');

    // Sign record
    const sign = crypto.createSign('SHA256');
    sign.update(newRec.headerHash);
    sign.end();
    const signature = sign.sign(signKey, 'hex');
    newRec.signature = signature;

    // Append and update DataCapsule
    dataCapsule.recentRecord = newRec;

    // Return hash of record
    return newRec.headerHash;
}



const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});
var testCapsule = new DataCapsule(privateKey, "TestProt", "v1", "testscheme", "12");
// console.log(testCapsule);
// console.log(testCapsule.signature);
// var capsuleString = JSON.stringify(testCapsule);
// console.log(capsuleString);
// var restoredCapsule = JSON.parse(capsuleString);
// console.log(restoredCapsule);
// restoredCapsule.signature = Buffer(restoredCapsule.signature.data);
dcWrite(testCapsule, privateKey, publicKey, "hello this is a test");
// console.log(testCapsule);
console.log(dcReadLast(testCapsule, publicKey).data);
