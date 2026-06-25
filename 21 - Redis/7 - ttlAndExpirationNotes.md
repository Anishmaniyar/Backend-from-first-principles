# Part 7 — Expiration & TTL

## Introduction

Not all data should exist forever.

Many types of data are temporary and should be removed automatically after a certain period.

Redis provides this functionality using:

```text
TTL (Time To Live)
```

TTL allows Redis to automatically delete keys after a specified duration.

---

# What Is TTL?

TTL stands for:

```text
Time To Live
```

It defines:

```text
How Long

A Key

Should Exist
```

Before Redis automatically removes it.

---

## TTL Flow

```text
Key Created

↓

Expiration Time Set

↓

Countdown Starts

↓

Time Reaches Zero

↓

Redis Deletes Key
```

---

# Why Does Redis Need TTL?

Many applications generate temporary data.

Examples:

```text
OTP

Login Session

Password Reset Token

Email Verification Token

Cache Entries
```

Once this data is no longer needed, Redis removes it automatically.

---

# EXPIRE Command

## Purpose

Sets an expiration time for an existing key.

---

## Syntax

```bash
EXPIRE <key> <seconds>
```

---

## Example

```bash
SET otp:123 "456789"

EXPIRE otp:123 300
```

Meaning:

```text
Store OTP

↓

Keep For 300 Seconds

↓

Delete Automatically
```

---

## JavaScript

```javascript
await client.set("otp:123", "456789");

await client.expire("otp:123", 300);
```

---

# TTL Command

## Purpose

Checks how much time remains before a key expires.

---

## Syntax

```bash
TTL <key>
```

---

## Example

```bash
TTL otp:123
```

Output:

```text
287
```

Meaning:

```text
287 Seconds Remaining
```

---

## JavaScript

```javascript
const ttl = await client.ttl("otp:123");

console.log(ttl);
```

---

# Automatic Expiration

Once an expiration time is set:

```text
Redis

↓

Starts Countdown

↓

Automatically Deletes Key

↓

No Manual Cleanup Required
```

You do not need to write cleanup code yourself.

---

# Time-Based Deletion

TTL is essentially:

```text
Delete This Key

↓

After X Seconds
```

Example:

```bash
SET session:abc123 "user"

EXPIRE session:abc123 1800
```

Meaning:

```text
Session Valid

↓

30 Minutes

↓

Deleted Automatically
```

---

# Temporary Data

Redis is commonly used for storing temporary data.

Examples:

| Data                     | Typical TTL                  |
| ------------------------ | ---------------------------- |
| OTP                      | 5 Minutes                    |
| Login Session            | 30 Minutes / 24 Hours        |
| Password Reset Token     | 15 Minutes                   |
| Email Verification Token | 24 Hours                     |
| Cache                    | Few Minutes to Several Hours |

---

# Cache Expiration

Suppose homepage data is cached.

```text
Homepage Data

↓

Redis
```

Without expiration:

```text
Old Cache

↓

Served Forever
```

---

With TTL:

```bash
SET homepage "...data..."

EXPIRE homepage 600
```

Flow:

```text
Store Cache

↓

10 Minutes

↓

Delete Cache

↓

Next Request Generates Fresh Data
```

---

# Common Use Cases

## OTP Storage

```bash
SET otp:+919876543210 "456789"

EXPIRE otp:+919876543210 300
```

---

## Session Storage

```bash
SET session:abc123 "{ userId: 1 }"

EXPIRE session:abc123 1800
```

---

## Password Reset Token

```bash
SET reset:token123 "user1"

EXPIRE reset:token123 900
```

---

## Cache Entry

```bash
SET product:1 "{...}"

EXPIRE product:1 3600
```

---

# Setting Value And Expiration Together

Instead of:

```bash
SET otp:123 "456789"

EXPIRE otp:123 300
```

Redis also supports:

```bash
SET otp:123 "456789" EX 300
```

---

## JavaScript

```javascript
await client.set("otp:123", "456789", {
  EX: 300,
});
```

This stores the value and sets its expiration atomically.

---

# TTL Return Values

Running:

```bash
TTL <key>
```

can return:

| Value | Meaning                             |
| ----- | ----------------------------------- |
| `> 0` | Seconds remaining before expiration |
| `-1`  | Key exists but has no expiration    |
| `-2`  | Key does not exist                  |

---

# Expiration Lifecycle

```text
Create Key

↓

Set TTL

↓

Countdown Starts

↓

Key Expires

↓

Redis Removes Key
```

---

# Commands Learned

| Command                    | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| `EXPIRE key seconds`       | Set expiration time                        |
| `TTL key`                  | Check remaining lifetime                   |
| `SET key value EX seconds` | Store value with expiration in one command |

---

# Key Takeaways

- TTL stands for Time To Live.
- TTL determines how long a key should exist.
- Redis automatically deletes expired keys.
- Temporary data should always have an expiration.
- `EXPIRE` sets a timeout for an existing key.
- `TTL` returns the remaining lifetime of a key.
- `SET ... EX` stores a value and expiration together.
- TTL is commonly used for OTPs, sessions, password reset tokens, and cache entries.
- Automatic expiration improves memory usage and security.

---

# Questions You Should Be Able To Answer

### What is TTL?

```text
The amount of time a Redis key can exist before it is automatically deleted.
```

---

### Why do keys expire?

```text
To automatically remove temporary data, reduce memory usage, improve security, and keep cached data fresh.
```

---

### What happens after expiration?

```text
Redis automatically removes the key from memory. Future GET operations will not find the key.
```

---

### Why use SET with EX?

```text
It stores the value and sets its expiration in a single atomic operation.
```

---

# One-Line Summary

Redis TTL enables automatic expiration of temporary data, making it ideal for OTPs, sessions, password reset tokens, and cache entries without requiring manual cleanup.
