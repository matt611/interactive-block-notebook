## API gateway

- traffic logging
- rate limitting
- authentication
- authorization
- ssl tremination
- load balancing
- hash writes to a single server based on notebook id

## Write Service

- Use Lamport clock to make sure changes are applied in order
- write change messages to DB
- push change messages to edit queue

## Edit Queue

- Kafka?

## Assembler Worker

- pop messages of queue
- apply changes to current latest snapshot
- check snapshot change vector and messege order index to make sure changes are applied in order and idempotent
- save new snapshot to db
- push new snapshot to viral cache?
- save new snapshot change vector to db
- update note book metadata as needed
- hold onto out of order messages
- look in edit message store for missing messages
- what happens when we lose changes?
  - snapshot current progress
  - Flag the document as corrupt
  - don't allow any more changes
  - alert user
  - revert to last good snapshot

## Compaction Worker

- periodically compact snapshots
  - daily
  - monthly?
  - yearly?
- move old snapshots to S3?

## Cache

- LRU, read through Cache

## Read Service

- fetch lastest snapshot from db
