# Part 5 — Cache Hit

## Introduction

A **Cache Hit** occurs when the requested data is already available in Redis.

Instead of querying the database, the application retrieves the data directly from the cache.

This results in much faster response times and reduces database load.

---

# What Is A Cache Hit?

A Cache Hit occurs when:

```text
Request

↓

Redis

↓

Data Exists

↓

Return Response
```

Since the data is already stored in Redis, the database is not accessed.

---

# Cache Hit Flow

```text
Client

↓

Backend

↓

Redis

↓

Data Found

↓

Response
```

Notice:

```text
Database

↓

Not Used
```

---

# Why Is It Called A Cache Hit?

The backend asks Redis:

```text
Do You Have This Data?
```

If Redis finds the requested key:

```text
YES

↓

Cache Hit
```

The requested data is returned immediately.

---

# Why Is A Cache Hit Fast?

Redis stores data in:

```text
RAM
```

Instead of:

```text
Disk
```

Redis performs a simple memory lookup:

```text
Receive Key

↓

Search Memory

↓

Return Value
```

Unlike a database query, Redis does **not** need to:

- Parse SQL
- Create Query Plans
- Read Indexes
- Access Disk

This makes Cache Hits extremely fast.

---

# Memory Lookup

Suppose Redis stores:

```text
product:101

↓

{
  name: "iPhone 16",
  price: 79999
}
```

Application requests:

```text
GET product:101
```

Redis performs:

```text
Lookup Key

↓

Key Found

↓

Return Value
```

Everything happens entirely in memory.

---

# Response Time

Example:

Database:

```text
Request

↓

Database Query

↓

40–100 ms

↓

Response
```

---

Redis Cache Hit:

```text
Request

↓

Redis

↓

1–2 ms

↓

Response
```

Reading from memory is significantly faster than querying a database.

---

# Internal Working

When a request arrives:

```text
Client

↓

Backend

↓

Redis Receives Key

↓

Search Memory

↓

Key Found

↓

Return Data

↓

Backend Sends Response
```

The database is never contacted.

---

# Real-World Example

Suppose millions of users open the same Amazon product page.

Instead of:

```text
Every User

↓

Database Query
```

Redis serves the product information:

```text
User

↓

Redis

↓

Response
```

This greatly reduces database load while improving response time.

---

# Benefits Of Cache Hit

- Extremely fast response time
- Reduced database queries
- Lower CPU usage
- Lower memory usage
- Lower disk I/O
- Better user experience
- Improved scalability
- Reduced infrastructure cost

---

# When Does A Cache Hit Occur?

A Cache Hit occurs only when:

```text
Requested Data

↓

Already Exists

↓

Redis
```

Otherwise:

```text
Cache Miss
```

and the application queries the database.

---

# Cache Hit vs Database Read

| Cache Hit             | Database Read           |
| --------------------- | ----------------------- |
| Reads from Redis      | Reads from PostgreSQL   |
| Uses RAM              | May access Disk         |
| Very Low Latency      | Higher Latency          |
| No SQL Parsing        | SQL Parsing Required    |
| No Query Planning     | Query Planning Required |
| Database Not Accessed | Database Accessed       |

---

# Key Takeaways

- A Cache Hit means the requested data already exists in Redis.
- Redis returns the data directly from memory.
- The database is not queried.
- Memory lookups are much faster than database queries.
- Cache Hits reduce database load and improve application performance.
- A high Cache Hit Rate indicates an efficient caching system.

---

# Questions You Should Be Able To Answer

### What is a Cache Hit?

```text
A Cache Hit occurs when the requested data already exists in Redis and can be returned without querying the database.
```

---

### Why is it fast?

```text
Because Redis performs an in-memory key lookup instead of executing a full database query.
```

---

### What happens internally?

```text
Request

↓

Backend

↓

Redis Receives Key

↓

Search Memory

↓

Key Found

↓

Return Value

↓

Response

(Database Is Not Accessed)
```

---

# One-Line Summary

A Cache Hit occurs when Redis already contains the requested data, allowing the application to return the response directly from memory without accessing the database, resulting in extremely fast response times and reduced database load.
