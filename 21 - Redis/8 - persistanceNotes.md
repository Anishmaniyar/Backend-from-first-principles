# Part 8 — Persistence

## Introduction

Redis stores data primarily in:

```text
RAM
```

RAM is extremely fast but:

```text
Volatile
```

Meaning:

```text
Power Off

↓

Data Lost
```

To prevent losing important data, Redis provides:

```text
Persistence
```

Persistence allows Redis to save data from memory to disk so it can recover after crashes or restarts.

---

# What Is Persistence?

Persistence is the process of:

```text
Saving Data

From RAM

↓

Disk
```

This creates a durable copy of the in-memory dataset.

---

# Why Is Persistence Needed?

Without persistence:

```text
Application

↓

Redis (RAM)

↓

Server Crash

↓

All Data Lost
```

---

With persistence:

```text
Application

↓

Redis (RAM)

↓

Save To Disk

↓

Server Crash

↓

Restart

↓

Load Saved Data

↓

Continue
```

---

# In-Memory vs Persistent Data

## In-Memory Data

Characteristics:

```text
Very Fast

Temporary

Stored In RAM

Lost After Crash
```

---

## Persistent Data

Characteristics:

```text
Stored On Disk

Survives Restarts

Can Be Recovered
```

---

# Redis Persistence Mechanisms

Redis supports two primary persistence methods:

```text
Persistence

↓

RDB

↓

AOF
```

Each provides a different balance between performance and durability.

---

# RDB (Redis Database Snapshot)

## Concept

RDB periodically creates a complete snapshot of the Redis dataset.

Think:

```text
Take A Photograph

Of Current Memory
```

---

## Flow

```text
Redis Memory

↓

Snapshot

↓

dump.rdb

↓

Disk
```

---

## Recovery

When Redis restarts:

```text
Redis Starts

↓

Read dump.rdb

↓

Restore Memory

↓

Ready
```

---

## Advantages

```text
Fast Recovery

Compact Backup Files

Low Runtime Overhead
```

---

## Disadvantages

```text
Possible Data Loss

Between Snapshots
```

If Redis crashes before the next snapshot, recent changes are lost.

---

# AOF (Append Only File)

## Concept

Instead of taking snapshots, Redis records every write operation.

Think:

```text
Activity Log

Of Every Change
```

---

## Example

Commands:

```bash
SET user:1 "Anish"

SET age 20

DEL age
```

Stored Inside:

```text
appendonly.aof
```

---

## Recovery

On restart:

```text
Redis Reads AOF

↓

Replays Commands

↓

Restores Memory

↓

Ready
```

---

## Advantages

```text
Minimal Data Loss

Better Durability
```

---

## Disadvantages

```text
Larger Files

Slightly Slower Recovery
```

---

# RDB vs AOF

| Feature        | RDB          | AOF                   |
| -------------- | ------------ | --------------------- |
| Method         | Snapshot     | Command Log           |
| Saves          | Periodically | Every Write Operation |
| Recovery Speed | Faster       | Slightly Slower       |
| Data Loss      | Possible     | Minimal               |
| File Size      | Smaller      | Larger                |
| Best For       | Backups      | High Durability       |

---

# Recovery Process

When Redis starts:

```text
Redis Starts

↓

Persistence File Exists?

↓

Yes

↓

Load Data

↓

Memory Restored

↓

Accept Requests
```

Without persistence:

```text
Redis Starts

↓

Empty Memory

↓

No Previous Data
```

---

# Durability

Durability means:

```text
Data

Survives

Unexpected Failures
```

Examples:

```text
Power Failure

Server Restart

Redis Crash
```

Persistence increases Redis durability.

---

# Does Redis Always Persist Data?

No.

Redis can run in different modes:

```text
Memory Only

or

Memory + Persistence
```

The configuration depends on the application's requirements.

---

# Real-World Use Cases

## Cache

```text
Redis Crash

↓

Cache Lost

↓

Regenerate Cache
```

Persistence is often unnecessary.

---

## OTP Storage

```text
OTP Expires Quickly

↓

No Need For Persistence
```

---

## Session Storage

```text
Redis Crash

↓

Users Logged Out
```

Persistence is often desirable.

---

## Shopping Cart

```text
Redis Crash

↓

Cart Lost
```

Persistence is usually recommended.

---

# Redis Architecture With Persistence

```text
Application

↓

Redis Client

↓

Redis Server

↓

RAM

↓

Persistence

↓

Disk
```

---

# JavaScript Note

Persistence is configured on the Redis server, **not** in application code.

Example:

```javascript
await client.set("user:1", "Anish");
```

The application only sends commands.

Redis itself decides whether to:

```text
Create RDB Snapshots

or

Write To AOF
```

based on its server configuration.

---

# When Should Persistence Be Used?

| Use Case        | Persistence                      |
| --------------- | -------------------------------- |
| Cache           | Usually No                       |
| OTP             | No                               |
| Rate Limiting   | No                               |
| Session Storage | Often Yes                        |
| Shopping Cart   | Usually Yes                      |
| Leaderboards    | Depends On Business Requirements |

---

# Key Takeaways

- Redis stores data in RAM.
- RAM is volatile and loses data after a restart.
- Persistence saves Redis data to disk.
- Redis supports two persistence mechanisms: RDB and AOF.
- RDB creates periodic snapshots.
- AOF records every write command.
- RDB provides faster recovery with possible data loss.
- AOF provides better durability with larger files.
- Persistence allows Redis to recover after crashes.
- Whether persistence is enabled depends on the application's requirements.

---

# Questions You Should Be Able To Answer

### What happens if Redis crashes?

```text
Without persistence, all in-memory data is lost. With persistence, Redis restores data from RDB snapshots or the AOF log.
```

---

### Does Redis lose data?

```text
Yes, without persistence. With RDB, only changes after the last snapshot may be lost. With AOF, data loss is typically minimal.
```

---

### How does Redis recover data?

```text
On startup, Redis reads its persistence files (RDB or AOF) and rebuilds the in-memory dataset before serving requests.
```

---

### What is durability?

```text
The ability of data to survive crashes, power failures, and server restarts.
```

---

### Which persistence method should I choose?

```text
Use RDB for fast backups and recovery.

Use AOF when minimizing data loss is more important.

Many production systems enable both.
```

---

# One-Line Summary

Redis stores data in memory for speed, while persistence (RDB and AOF) allows it to save that data to disk and recover it after crashes, balancing performance with durability.
