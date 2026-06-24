# Part 3 — What Redis Actually Is

## Introduction

Redis is much more than a caching tool.

Although Redis is commonly used for caching, it is actually a powerful in-memory database that can be used for:

```text
Caching

Session Storage

Rate Limiting

Pub/Sub

Queues

Leaderboards

Real-Time Applications
```

Understanding what Redis truly is helps explain why it is used in so many backend systems.

---

# Redis Overview

Redis stands for:

```text
REmote DIctionary Server
```

Redis started as an in-memory key-value store but evolved into a complete data structure database.

---

## Redis Can Be Used For

```text
Caching

Session Management

Rate Limiting

Pub/Sub Messaging

Background Jobs

Queues

Real-Time Notifications

Leaderboards
```

---

# Is Redis A Database?

## Short Answer

```text
Yes
```

Redis is a database.

---

## What Makes Something A Database?

A database should be able to:

```text
Store Data

Retrieve Data

Manage Data
```

Redis satisfies all of these requirements.

---

## Difference From Traditional Databases

### PostgreSQL

Optimized For:

```text
Relationships

Transactions

Permanent Storage

Complex Queries
```

---

### Redis

Optimized For:

```text
Speed

Memory Access

Temporary Data

Fast Reads/Writes
```

---

# In-Memory Database

Traditional databases store most data on:

```text
Disk
```

Examples:

```text
PostgreSQL

MySQL

MongoDB
```

---

Redis stores data primarily in:

```text
RAM
```

---

## Benefits

```text
Very Low Latency

Extremely Fast Reads

Extremely Fast Writes
```

---

## Tradeoffs

```text
More Expensive Memory

Limited Capacity

Potential Data Loss Without Persistence
```

---

# Key-Value Store

The core Redis model is:

```text
Key

↓

Value
```

---

## Example

```text
name

↓

Anish
```

---

## Redis Command

```bash
SET name "Anish"
```

---

Retrieve:

```bash
GET name
```

Output:

```text
Anish
```

---

## JavaScript Analogy

```js
{
  name: "Anish";
}
```

Redis behaves similarly but is shared across applications and servers.

---

# NoSQL Database

Redis belongs to the:

```text
NoSQL
```

database category.

---

## What Does NoSQL Mean?

```text
Not Relational
```

Redis does not use:

```text
Tables

Rows

Foreign Keys

Joins
```

like PostgreSQL.

---

Instead it uses:

```text
Keys

Values

Data Structures
```

---

## Mental Model

```text
PostgreSQL

↓

Spreadsheet

----------------

Redis

↓

Dictionary
```

---

# Data Structures Store

Redis is not limited to strings.

It supports multiple built-in data structures.

---

## Redis Data Structures

```text
Strings

Lists

Hashes

Sets

Sorted Sets

Streams

Bitmaps

HyperLogLogs
```

---

# Example: Hash

Store User Data

```bash
HSET user:1 name "Anish" age 20
```

---

Retrieve User Data

```bash
HGETALL user:1
```

Output:

```text
name  Anish
age   20
```

---

# Why Data Structures Matter

Different problems need different structures.

---

## Example Applications

### Followers

```text
Set
```

---

### Notifications

```text
List
```

---

### Leaderboards

```text
Sorted Set
```

---

### Chat Messages

```text
Stream
```

---

Redis provides optimized implementations for these use cases.

---

# Single Threaded Architecture

Redis processes commands using a single main execution thread.

---

## Traditional Approach

```text
Request

↓

Thread

↓

Response
```

Many threads handle requests simultaneously.

---

## Redis Approach

```text
Request

↓

Event Loop

↓

Execute

↓

Response
```

---

## Why Is This Fast?

Redis operations are:

```text
Memory Based

Very Short

Very Fast
```

---

Redis avoids:

```text
Thread Switching

Locking

Synchronization Overhead
```

which improves performance.

---

# Event Loop Model

Redis uses an event loop similar to Node.js.

---

## Flow

```text
Request 1

Request 2

Request 3

↓

Event Loop

↓

Execute One By One

↓

Responses
```

---

Because each operation is extremely fast, Redis can handle a very large number of requests.

---

# Why Is Redis So Popular?

Redis solves many backend problems using a single technology.

---

## Caching

```text
Database

↓

Redis

↓

Faster Reads
```

---

## Sessions

```text
Session ID

↓

Redis

↓

User Data
```

---

## Rate Limiting

```text
IP Address

↓

Counter

↓

Redis
```

---

## Pub/Sub

```text
Publisher

↓

Redis

↓

Subscribers
```

---

## Queues

```text
Jobs

↓

Redis

↓

Workers
```

---

## Leaderboards

```text
Scores

↓

Sorted Sets
```

---

## Real-Time Systems

```text
Notifications

Chats

Presence Tracking
```

---

# Redis In Modern Backend Systems

A common architecture:

```text
Client

↓

Backend

↓

Redis

↓

PostgreSQL
```

---

Responsibilities:

```text
Redis

↓

Speed Layer

----------------

PostgreSQL

↓

Source Of Truth
```

---

# Redis CLI Commands (Quick Notes)

## Start Redis Server

```bash
redis-server
```

---

## Open Redis CLI

```bash
redis-cli
```

---

## Set Value

```bash
SET name "Anish"
```

---

## Get Value

```bash
GET name
```

---

## Delete Value

```bash
DEL name
```

---

## Check Key Exists

```bash
EXISTS name
```

---

## View Keys (Development Only)

```bash
KEYS *
```

---

# Key Takeaways

- Redis is an in-memory database.
- Redis is not just a cache.
- Redis is a NoSQL database.
- Redis uses a key-value model.
- Redis supports multiple data structures.
- Redis is optimized for speed.
- Redis uses a single-threaded event loop architecture.
- Redis powers caching, sessions, rate limiting, Pub/Sub, queues, and real-time applications.
- Redis often works alongside PostgreSQL rather than replacing it.

---

# Questions You Should Be Able To Answer

### Is Redis a database?

```text
Yes. Redis stores, retrieves, and manages data, making it a database.
```

---

### Is Redis only a cache?

```text
No. Redis supports caching, sessions, rate limiting, Pub/Sub, queues, leaderboards, and many other use cases.
```

---

### Why is Redis so popular?

```text
Because it is extremely fast, supports multiple data structures, and solves many backend infrastructure problems with a single technology.
```

---

# One-Line Summary

Redis is an in-memory NoSQL database and data structure store that provides extremely fast access to data and powers caching, sessions, rate limiting, messaging, queues, and many other backend system patterns.
