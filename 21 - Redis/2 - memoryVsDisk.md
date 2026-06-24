# Part 2 — Memory vs Disk

## Introduction

To understand Redis, you must first understand the difference between:

```text
RAM (Memory)

and

Disk (Persistent Storage)
```

Redis is fast because it stores data in memory, while traditional databases primarily store data on disk.

---

# RAM (Memory)

## What Is RAM?

RAM (Random Access Memory) is temporary storage used by applications while they are running.

Examples:

```text
Chrome

VS Code

Node.js

Redis
```

All actively use RAM.

---

## Characteristics Of RAM

```text
Very Fast

Temporary

Expensive

Limited Capacity
```

---

## RAM Mental Model

Think:

```text
Notebook On Your Desk
```

Information is immediately available.

No searching required.

---

# Disk (Persistent Storage)

## What Is Disk Storage?

Disk storage refers to:

```text
SSD

NVMe

Hard Drive
```

where data is permanently stored.

---

## Characteristics Of Disk

```text
Persistent

Cheaper

Large Capacity

Slower Than RAM
```

---

## Disk Mental Model

Think:

```text
Bookshelf Across The Room
```

Information exists, but retrieving it takes more time.

---

# Memory Access vs Disk Access

## Memory Access

Flow:

```text
CPU

↓

RAM

↓

Data
```

Very short path.

---

## Disk Access

Flow:

```text
CPU

↓

Storage Controller

↓

SSD

↓

Retrieve Data

↓

Return Data
```

More steps are involved.

---

# Read Speed

Read operation means:

```text
Retrieve Data
```

Example:

```text
Get User Profile

Get Product

Get Session
```

---

## Redis Read

```text
Redis

↓

RAM

↓

Fast Retrieval
```

---

## PostgreSQL Read

```text
PostgreSQL

↓

Disk

↓

Slower Retrieval
```

---

# Write Speed

Write operation means:

```text
Store Data
```

Example:

```text
Create User

Update Product

Save Order
```

---

## Redis Write

```text
Write To RAM

↓

Very Fast
```

---

## PostgreSQL Write

```text
Write To Disk

↓

Slower But Durable
```

---

# Latency Comparison

## What Is Latency?

Latency is:

```text
Time Required

To Complete A Request
```

Example:

```text
Request

↓

Response

↓

20ms
```

---

## Redis Latency

```text
Microseconds

or

Sub-Millisecond
```

---

## PostgreSQL Latency

```text
Milliseconds
```

Usually slower than Redis.

---

# Why Is RAM Faster?

RAM is optimized for:

```text
Immediate Access
```

The CPU can access memory directly with minimal delay.

---

## Example

Think:

```text
RAM

↓

Notebook On Desk
```

You instantly read information.

No searching required.

---

# Why Is Disk Slower?

Disk storage prioritizes:

```text
Durability

Persistence

Reliability
```

instead of raw speed.

Data must be located, loaded, and returned.

---

## Example

Think:

```text
Disk

↓

Bookshelf
```

You must:

```text
Walk

Find Book

Open Book

Read
```

before accessing information.

---

# Why Isn't Everything Stored In RAM?

At first it seems logical:

```text
RAM Is Faster

↓

Store Everything In RAM
```

However there are several limitations.

---

## Problem 1 — Cost

RAM is significantly more expensive than storage.

Example:

```text
1 TB SSD

↓

Relatively Cheap

----------------

1 TB RAM

↓

Very Expensive
```

---

## Problem 2 — Capacity

Typical Systems:

```text
RAM

↓

16GB

32GB

64GB

----------------

Storage

↓

512GB

1TB

2TB+
```

Storage capacity is much larger.

---

## Problem 3 — Volatility

RAM is:

```text
Volatile
```

Meaning:

```text
Power Off

↓

Data Lost
```

---

Disk is:

```text
Persistent
```

Meaning:

```text
Power Off

↓

Data Remains
```

---

# Redis vs PostgreSQL

## Redis

Stores Data In:

```text
RAM
```

Best For:

```text
Caching

Sessions

Rate Limiting

Counters

Temporary Data
```

Advantages:

```text
Extremely Fast

Low Latency

High Throughput
```

Disadvantages:

```text
Limited Memory

Higher Cost

Potential Data Loss Without Persistence
```

---

## PostgreSQL

Stores Data On:

```text
Disk
```

Best For:

```text
Users

Orders

Payments

Transactions

Permanent Data
```

Advantages:

```text
Durable

Reliable

Large Storage Capacity
```

Disadvantages:

```text
Slower Than Memory
```

---

# Redis + PostgreSQL Together

Modern applications usually use both.

```text
Client

↓

Backend

↓

Redis

↓

Cache Hit?

↓

YES

↓

Response

----------------

NO

↓

PostgreSQL

↓

Store In Redis

↓

Response
```

---

# Real World Example

## Instagram Profile Request

Frequently Requested Data:

```text
Follower Count

Profile Data

Recent Statistics
```

Stored in:

```text
Redis
```

---

Permanent Data:

```text
User Records

Posts

Comments

Relationships
```

Stored in:

```text
PostgreSQL
```

---

# Key Takeaways

- RAM is fast but temporary.
- Disk is slower but persistent.
- Redis stores data in memory.
- PostgreSQL stores data on disk.
- Redis optimizes speed.
- PostgreSQL optimizes durability.
- Most production systems use both Redis and PostgreSQL.
- Redis reduces latency and database load.
- Disk storage remains the source of truth.
- Redis acts as a fast-access layer.

---

# Questions You Should Be Able To Answer

### Why is RAM faster?

```text
Because it is directly accessible by the CPU and optimized for extremely fast reads and writes.
```

---

### Why is disk slower?

```text
Because it prioritizes persistence and durability over speed.
```

---

### Why isn't everything stored in RAM?

```text
Because RAM is expensive, limited in size, and loses data when power is removed.
```

---

### Why does Redis use RAM?

```text
To provide extremely fast data access and reduce database load.
```

---

# One-Line Summary

Redis uses RAM to achieve extremely fast reads and writes, while databases like PostgreSQL use disk to provide durable and permanent storage.
