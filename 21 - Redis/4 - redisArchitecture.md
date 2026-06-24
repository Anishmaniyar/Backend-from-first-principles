# Redis Architecture

## Introduction

Redis is built around a simple but highly optimized architecture that allows it to process thousands of requests per second while remaining extremely fast.

At a high level:

```text
Application

↓

Redis Client

↓

Connection

↓

Redis Server

↓

Event Loop

↓

Command Execution

↓

Memory

↓

Response
```

Understanding this flow is essential before learning caching, sessions, rate limiting, and Pub/Sub.

---

# Redis Server

The Redis Server is the actual Redis process running on a machine.

When Redis starts:

```bash
redis-server
```

it launches a server that listens for incoming commands.

Default Port:

```text
6379
```

Responsibilities:

```text
Accept Connections

Receive Commands

Execute Commands

Access Memory

Return Responses
```

---

# Redis Client

A Redis Client is a library that applications use to communicate with Redis.

Examples:

### Node.js

```js
import { createClient } from "redis";

const client = createClient();
```

---

### Python

```python
import redis
```

---

### Redis CLI

```bash
redis-cli
```

---

Responsibilities:

```text
Send Commands

Receive Responses

Maintain Connection
```

---

# Redis Client vs Browser Client

Do not confuse:

```text
Browser Client
```

with:

```text
Redis Client
```

---

Browser Client:

```text
User

↓

Express API
```

---

Redis Client:

```text
Express API

↓

Redis Server
```

The Redis Client is simply a communication library.

---

# Redis Connection

Before commands can be sent:

```text
Application

↓

Connect To Redis
```

Example:

```js
await client.connect();
```

This creates a:

```text
TCP Connection
```

between the application and Redis.

---

Think:

```text
Express

═══════════════

Redis Server
```

A communication channel remains open.

---

# Request Lifecycle

Every Redis request follows the same lifecycle.

Example:

```bash
GET user:1
```

Flow:

```text
Application

↓

Redis Client

↓

Connection

↓

Redis Server

↓

Command Execution

↓

Memory Lookup

↓

Response

↓

Application
```

---

# Example Request

Express Code:

```js
const user = await client.get("user:1");
```

---

Redis Receives:

```text
GET user:1
```

---

Redis Processes:

```text
Find Key

↓

Retrieve Value

↓

Return Response
```

---

Response:

```text
Anish
```

---

# Command Execution

Redis receives commands, interprets them, and performs actions on memory.

This process is called:

```text
Command Execution
```

---

Example:

```bash
SET name "Anish"
```

---

Internally:

```text
Receive Command

↓

Parse Command

↓

Identify Operation

↓

Store Data

↓

Return Response
```

---

Response:

```text
OK
```

---

# GET Command Execution

Command:

```bash
GET name
```

---

Internally:

```text
Receive Command

↓

Identify GET

↓

Find Key

↓

Read Memory

↓

Return Value
```

---

Response:

```text
Anish
```

---

# Memory Storage

Redis stores data primarily in:

```text
RAM
```

---

Example:

```bash
SET user:1 "Anish"
```

Conceptually:

```js
{
  "user:1": "Anish"
}
```

Stored in memory.

---

Benefits:

```text
Very Fast Reads

Very Fast Writes

Low Latency
```

---

# Event Loop

Redis uses:

```text
Single Thread

+

Event Loop
```

similar to Node.js.

---

Responsibilities:

```text
Receive Requests

Queue Requests

Execute Commands

Return Responses
```

---

# Queue Processing

Suppose Redis receives:

```text
GET user:1

SET count 5

GET count

DEL user:1
```

---

Redis places them into a queue:

```text
Request Queue

↓

GET user:1

SET count 5

GET count

DEL user:1
```

---

The Event Loop processes them:

```text
Take Request

↓

Execute

↓

Take Next Request

↓

Execute

↓

Repeat
```

---

# Why Redis Uses A Single Thread

Redis intentionally uses a single main execution thread.

Benefits:

```text
No Locks

No Synchronization

No Race Conditions

No Thread Contention
```

This keeps Redis simple and extremely fast.

---

# Why Single Thread Does Not Become Slow

Redis operations are:

```text
Memory Based

Small

Fast
```

Example:

```bash
GET name
```

may take only microseconds.

Because operations are so fast, Redis can process a huge number of requests quickly.

---

# How Redis Handles Thousands Of Requests

Redis succeeds because:

```text
Data Is In RAM

↓

Operations Are Tiny

↓

Commands Execute Quickly

↓

Requests Process Rapidly
```

---

Instead of:

```text
Waiting On Disk
```

Redis accesses:

```text
Memory Directly
```

---

This allows Redis to handle:

```text
Tens Of Thousands

or

Hundreds Of Thousands

Requests Per Second
```

depending on workload.

---

# Persistence Layer

Redis stores data in memory.

Question:

```text
What Happens If Redis Crashes?
```

Without persistence:

```text
Memory Lost

↓

Data Lost
```

---

To prevent this Redis supports:

```text
Persistence
```

---

Persistence means:

```text
Memory

↓

Save To Disk
```

---

# RDB Snapshots

Redis periodically creates:

```text
Snapshots
```

Flow:

```text
Memory

↓

Snapshot

↓

Disk
```

---

Think:

```text
Game Save Point
```

---

# AOF (Append Only File)

Redis can also record commands.

Example:

```bash
SET name "Anish"

SET age 20

DEL age
```

---

Stored As:

```text
SET name "Anish"

SET age 20

DEL age
```

---

After restart:

```text
Replay Commands

↓

Restore Data
```

---

# Complete Redis Architecture

```text
Application

↓

Redis Client

↓

TCP Connection

↓

Redis Server

↓

Event Loop

↓

Command Execution

↓

Memory

↓

Persistence (Optional)

↓

Response
```

---

# Key Takeaways

- Redis runs as a server process.
- Applications communicate through Redis Clients.
- Redis Clients maintain TCP connections.
- Every request follows a request lifecycle.
- Commands are parsed and executed by Redis.
- Data is stored primarily in RAM.
- Redis uses a single-threaded event loop.
- Redis avoids locking and synchronization overhead.
- Redis achieves high performance through memory access.
- Persistence allows Redis to recover data after restarts.

---

# Questions You Should Be Able To Answer

### How does Redis process requests?

```text
Client → Connection → Redis Server → Event Loop → Command Execution → Memory → Response
```

---

### Why is Redis single-threaded?

```text
To avoid locks, synchronization overhead, and race conditions while keeping operations extremely fast.
```

---

### How does Redis handle thousands of requests?

```text
Because commands operate directly on memory and complete in microseconds, allowing a single thread to process requests very quickly.
```

---

# One-Line Summary

Redis processes commands through a single-threaded event loop that executes operations directly against in-memory data structures, enabling extremely fast and efficient request handling.
