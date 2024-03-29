# DataCapsuleJS
[![GitHub issues](https://img.shields.io/github/issues/GlobalDataPlane/DataCapsuleJS)](https://github.com/GlobalDataPlane/DataCapsuleJS/issues)
[![GitHub license](https://img.shields.io/github/license/GlobalDataPlane/DataCapsuleJS)](https://github.com/GlobalDataPlane/DataCapsuleJS/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/GlobalDataPlane/DataCapsuleJS.svg)](https://github.com/GlobalDataPlane/DataCapsuleJS/tags)
[![GitHub release](https://img.shields.io/github/release/GlobalDataPlane/DataCapsuleJS.svg)](https://github.com/GlobalDataPlane/DataCapsuleJS/releases)

[Contributing](https://github.com/GlobalDataPlane/DataCapsuleJS/blob/master/CONTRIBUTING.md) |
[Security](https://github.com/GlobalDataPlane/DataCapsuleJS/blob/master/SECURITY.md)

A basic JavaScript implementation of DataCapsules.

## What it Implements

This library allows for the creation of a basic DataCapsule.  It has two functions, readLast and write.  It is designed for the [ProtoBlocks](https://github.com/ProtoBlocks/ProtoBlocks) project.

## DataCapsule Creation

A DataCapsule requires five inputs, `ownerKey`, `protocol`, `version`, `encodingScheme`, and an `instanceID`.  A SHA-256 hash is taken over these inputs to create the DataCapsule's name.  The capsule also stores the most recent record in `recentRecord`.

## DataCapsule Record Format

Each record in the DataCapsule has six fields, `previousRecord`, `previousHash`, `dataHash`, `data`, `headerHash`, and `signature`.  `previousRecord` refers to the last record in the chain.  `previousHash` is the `headerHash` of the previous record.  `data` is the serialized data contained in the record, and `dataHash` is its hash.  `headerHash` is the hash of the stored `previousHash` and `dataHash`.  Finally, `signature` is a signature over `headerHash`.  
