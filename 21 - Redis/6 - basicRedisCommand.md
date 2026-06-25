# Part 6 — Basic Redis Commands

## Introduction

Redis is a command-based database.

Applications communicate with the Redis server by sending commands to create, retrieve, update, or delete data.

Example:

```text
Application

↓

Redis Client

↓

Redis Server

↓

Command Execution

↓

Response
```

Learning these commands is the first step toward interacting with Redis.

---

# Starting Redis

## Start Redis Server

```bash
redis-server
```

---

## Open Redis CLI

```bash
redis-cli
```

Prompt:

```text
127.0.0.1:6379>
```

All Redis commands are executed from this CLI (or through a Redis client library in your application).

---

# SET Command

## Purpose

Creates a new key or updates an existing key.

---

## Syntax

```bash
SET <key> <value>
```

---

## Example

```bash
SET name "Anish"
```

Response:

```text
OK
```

Redis stores:

```text
name

↓

Anish
```

---

## Updating Existing Data

```bash
SET name "Anish Maniyar"
```

Redis replaces the previous value.

Updated Data:

```text
name

↓

Anish Maniyar
```

---

# GET Command

## Purpose

Retrieves the value associated with a key.

---

## Syntax

```bash
GET <key>
```

---

## Example

```bash
GET name
```

Output:

```text
"Anish Maniyar"
```

---

## Key Does Not Exist

```bash
GET country
```

Output:

```text
(nil)
```

Meaning:

```text
Key Not Found
```

---

# DEL Command

## Purpose

Deletes one or more keys.

---

## Syntax

```bash
DEL <key>
```

---

## Example

```bash
DEL name
```

Output:

```text
(integer) 1
```

Meaning:

```text
One Key Deleted
```

---

## Key Does Not Exist

```bash
DEL country
```

Output:

```text
(integer) 0
```

Meaning:

```text
Nothing Was Deleted
```

---

# EXISTS Command

## Purpose

Checks whether a key exists.

---

## Syntax

```bash
EXISTS <key>
```

---

## Example

```bash
EXISTS name
```

Output:

```text
(integer) 1
```

Meaning:

```text
Key Exists
```

---

## Key Does Not Exist

```bash
EXISTS country
```

Output:

```text
(integer) 0
```

Meaning:

```text
Key Does Not Exist
```

---

# KEYS Command

## Purpose

Lists keys stored in Redis.

---

## Syntax

```bash
KEYS *
```

The wildcard:

```text
*
```

means:

```text
All Keys
```

---

## Example

Suppose Redis contains:

```text
user:1

user:2

product:1

session:123
```

Run:

```bash
KEYS *
```

Output:

```text
1) user:1
2) user:2
3) product:1
4) session:123
```

---

## Search By Prefix

Example:

```bash
KEYS user:*
```

Output:

```text
1) user:1
2) user:2
```

---

Another Example:

```bash
KEYS product:*
```

Output:

```text
1) product:1
```

---

## Production Note

Avoid using:

```bash
KEYS *
```

in production because it scans every key in Redis.

Instead, use:

```bash
SCAN
```

which performs incremental iteration and is safe for large datasets.

---

# Practice Exercise

## Step 1 — Store Users

```bash
SET user:1 "Anish"

SET user:2 "John"
```

---

## Step 2 — Fetch User

```bash
GET user:1
```

Output:

```text
"Anish"
```

---

## Step 3 — Check User Exists

```bash
EXISTS user:1
```

Output:

```text
(integer) 1
```

---

## Step 4 — View Keys

```bash
KEYS *
```

Output:

```text
user:1

user:2
```

---

## Step 5 — Delete User

```bash
DEL user:2
```

---

## Step 6 — Verify Deletion

```bash
GET user:2
```

Output:

```text
(nil)
```

---

# Request Flow

## SET Command

```text
SET user:1 "Anish"

↓

Redis Server

↓

Store Data In Memory

↓

Return OK
```

---

## GET Command

```text
GET user:1

↓

Redis Server

↓

Lookup Key

↓

Return Value
```

---

## DEL Command

```text
DEL user:1

↓

Redis Server

↓

Delete Key

↓

Return Success
```

---

## EXISTS Command

```text
EXISTS user:1

↓

Redis Server

↓

Check Memory

↓

Return 1 or 0
```

---

## KEYS Command

```text
KEYS user:*

↓

Redis Server

↓

Find Matching Keys

↓

Return List
```

---

# Commands Learned

| Command         | Purpose                     |
| --------------- | --------------------------- |
| `SET key value` | Create or update a key      |
| `GET key`       | Retrieve a value            |
| `DEL key`       | Delete a key                |
| `EXISTS key`    | Check if a key exists       |
| `KEYS *`        | List all keys               |
| `KEYS prefix:*` | List keys matching a prefix |

---

# Key Takeaways

- Redis is command-driven.
- `SET` creates or updates data.
- `GET` retrieves stored values.
- `DEL` removes keys from Redis.
- `EXISTS` checks whether a key is present.
- `KEYS` lists stored keys.
- Prefix-based searches help organize Redis data.
- `KEYS *` is useful for learning and debugging but should not be used in production.
- `SCAN` is the recommended alternative for production environments.

---

# Questions You Should Be Able To Answer

### What does SET do?

```text
Creates a new key or updates an existing key.
```

---

### What does GET do?

```text
Retrieves the value associated with a key.
```

---

### What does DEL do?

```text
Deletes one or more keys.
```

---

### What does EXISTS do?

```text
Checks whether a key exists.
```

---

### What does KEYS do?

```text
Lists keys stored in Redis. It is useful during development but should be avoided in production because it scans the entire keyspace.
```

---

### Why is SCAN preferred over KEYS in production?

```text
Because SCAN iterates through keys incrementally without blocking the Redis server, making it suitable for large datasets.
```

---

# One-Line Summary

Redis commands provide the interface for interacting with the Redis server—creating, reading, updating, deleting, and inspecting data stored as key-value pairs.
