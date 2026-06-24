# Part 1 — Why Redis Exists

## Introduction

Redis was created to solve performance problems that occur when applications repeatedly query databases for the same data.

As applications grow:

```text
More Users

↓

More Requests

↓

More Database Queries

↓

Higher Load

↓

Slower Responses
```

Redis helps reduce this load by storing frequently accessed data in memory.

---

# Database Bottlenecks

A bottleneck is the slowest component in a system that limits overall performance.

Example:

```text
Client

↓

Backend

↓

Database

↓

Response
```

As traffic increases, the database often becomes the bottleneck.

---

# Repeated Database Queries

Many applications repeatedly request the same data.

Example:

```text
Homepage

↓

Top Products

Trending Posts

Popular Videos
```

Every user requests the same information.

Without Redis:

```text
User 1

↓

Database

↓

Response

----------------

User 2

↓

Database

↓

Response

----------------

User 3

↓

Database

↓

Response
```

The database performs the same work repeatedly.

---

# Performance Problems

As traffic grows:

```text
More Users

↓

More Queries

↓

Database Overload

↓

Higher Latency

↓

Slow APIs
```

Common symptoms:

```text
Slow Responses

High Database CPU Usage

Timeouts

Poor User Experience
```

---

# Read-Heavy Applications

Most applications perform:

```text
Reads

and

Writes
```

Reads:

```text
Get User

Get Profile

Get Product

Get Posts
```

Writes:

```text
Create User

Update Product

Delete Post
```

Most real-world applications are:

```text
Read Heavy
```

Meaning:

```text
Reads >> Writes
```

Examples:

```text
Instagram

YouTube

Netflix

E-Commerce Websites
```

The same data is read many times.

---

# Latency

Latency is the time required to complete a request.

Example:

```text
Request

↓

Response

↓

50 ms
```

Latency:

```text
50 ms
```

Lower latency means:

```text
Faster User Experience
```

Redis helps reduce latency by serving data directly from memory.

---

# Throughput

Throughput measures:

```text
How Many Requests

Can Be Processed

Per Second
```

Example:

```text
100 Requests / Second

vs

100,000 Requests / Second
```

Reducing database load increases system throughput.

---

# Memory vs Disk Storage

Traditional databases store data on:

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

Redis stores data in:

```text
RAM
```

---

Comparison:

```text
RAM

↓

Very Fast

----------------

Disk

↓

Slower
```

Because memory access is significantly faster than disk access.

---

# In-Memory Databases

Redis is an:

```text
In-Memory Database
```

Meaning:

```text
Data

↓

Stored In RAM
```

instead of:

```text
Data

↓

Stored On Disk
```

This allows Redis to perform operations extremely quickly.

---

# Caching Concept

Instead of:

```text
Request

↓

Database

↓

Response
```

for every request.

Use:

```text
Request

↓

Redis

↓

Data Found?

↓

YES

↓

Response
```

No database query is needed.

---

If data is not found:

```text
Request

↓

Redis

↓

Cache Miss

↓

Database

↓

Store In Redis

↓

Response
```

This process is called:

```text
Caching
```

---

# Why Not Use PostgreSQL For Everything?

PostgreSQL is excellent for:

```text
Permanent Storage

Transactions

Relationships

Complex Queries
```

---

Redis is excellent for:

```text
Caching

Sessions

Counters

Rate Limiting

Temporary Data

Fast Reads
```

---

Think of them as:

```text
PostgreSQL

↓

Source Of Truth

----------------

Redis

↓

Fast Access Layer
```

---

# What Problem Does Redis Solve?

Redis solves:

```text
Repeated Access

To Frequently Used Data
```

without forcing every request to hit the database.

---

# Application Flow Without Redis

```text
Client

↓

Backend

↓

Database

↓

Response
```

Every request touches the database.

---

# Application Flow With Redis

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

Database

↓

Store In Redis

↓

Response
```

---

# Key Takeaways

- Redis was created to reduce database load.
- Databases often become bottlenecks as applications scale.
- Many applications are read-heavy.
- Repeated database queries waste resources.
- Redis stores data in memory for extremely fast access.
- Redis reduces latency and increases throughput.
- Redis is commonly used as a caching layer.
- PostgreSQL and Redis solve different problems.
- PostgreSQL is the source of truth.
- Redis is the fast-access layer.

---

# Questions You Should Be Able To Answer

### Why was Redis created?

```text
To reduce database load and serve frequently accessed data faster.
```

---

### What problem does Redis solve?

```text
Repeated database queries, high latency, and database bottlenecks.
```

---

### Why not use PostgreSQL for everything?

```text
Because databases are slower than memory and should not repeatedly serve the same frequently requested data.
```

---

### Why do applications become slow?

```text
More Users

↓

More Queries

↓

Database Bottleneck

↓

Higher Latency

↓

Slower Responses
```

---

# One-Line Summary

Redis exists to keep frequently accessed data in memory, reducing database load, lowering latency, and improving application performance.
