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
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });
        var testCapsule = new dc.DataCapsule(privateKey, "TestProt", "v1", "TestScheme", "12");
        beforeEach( () => {
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 2048,
            // });
            
            // // var capsuleString = JSON.stringify(testCapsule);
            // // var restoredCapsule = JSON.parse(capsuleString);
            // // restoredCapsule.signature = Buffer(restoredCapsule.signature.data);
            // dc.dcWrite(testCapsule, privateKey, publicKey, "hello this is a test");
            // // console.log(testCapsule);
            // console.log(dc.dcReadLast(testCapsule, publicKey).data);
            console.log( "beforeEach executes before every test" );
        });

        it( "Checking capsule basics", () => {
            assert.equal(testCapsule.protocol, "TestProt" );
            assert.equal(testCapsule.version, "v1");
            assert.equal(testCapsule.encodingScheme, "TestScheme");
            assert.equal(testCapsule.instanceID, "12");
        } );
  
    //   it( "should return 0 when adding zeros", () => {
    //     assert.equal( calc.add( 0, 0 ), 0 );
    //   } );
    } );
  } );
  