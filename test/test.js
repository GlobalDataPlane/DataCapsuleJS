var assert = require('assert');
var dc = require('../src/datacapsule.js');
var crypto = require('crypto');

describe( "DataCapsule", () => {
    before( () => {
        console.log( "Starting tests." );   
    } );
  
    after( () => {
      console.log( "Tests complete." );
    } );
  
    describe( "Basic Tests", () => {
        beforeEach( () => {
            console.log( "Running basic test." );
          } );

        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });
        var testCapsule = new dc.DataCapsule(privateKey, "TestProt", "v1", "TestScheme", "12");


        it( "Checking capsule basics", () => {
            assert.equal(testCapsule.protocol, "TestProt" );
            assert.equal(testCapsule.version, "v1");
            assert.equal(testCapsule.encodingScheme, "TestScheme");
            assert.equal(testCapsule.instanceID, "12");
        } );

        it( "Check record append", () => {
            var lastHeaderHash = testCapsule.recentRecord.headerHash;
            dc.dcWrite(testCapsule, privateKey, publicKey, "Basic write test.");
            var expectedDataHash = crypto.createHash('sha256').update("Basic write test.").digest('hex');
            var expectedHeaderHash = crypto.createHash('sha256').update(lastHeaderHash + expectedDataHash).digest('hex');

            assert.equal(testCapsule.recentRecord.data, "Basic write test.");
            assert.equal(testCapsule.recentRecord.dataHash, expectedDataHash);
            assert.equal(testCapsule.recentRecord.previousHash, testCapsule.recentRecord.previousRecord.headerHash);
            assert.equal(testCapsule.recentRecord.headerHash, expectedHeaderHash);
            assert.notEqual(testCapsule.recentRecord.previousRecord, null);
            
            const verify = crypto.createVerify('SHA256');
            verify.update(testCapsule.recentRecord.headerHash);
            verify.end();
            assert.ok(verify.verify(publicKey, testCapsule.recentRecord.signature, 'hex'));
        });

        it( "Check record read", () => {
            var record = dc.dcReadLast(testCapsule, publicKey);
            assert.equal(record.data, "Basic write test.")
        });
    } );
} );
  