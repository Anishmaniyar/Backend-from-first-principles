# Part 6 — Cache Miss

## Introduction

A **Cache Miss** occurs when the requested data is **not available** in Redis.

Since Redis cannot return the data, the application retrieves it from the database, stores it in Redis, and then returns it to the client.

This ensures that future requests for the same data can be served directly from Redis.

---

# What Is A Cache Miss?

A Cache Miss occurs when:

```text
Request

↓

Redis

↓

Data Not Found

↓

Database
```

Redis does not contain the requested key, so the application falls back to the database.

---

# Cache Miss Flow

```text
Client

↓

Backend

↓

Redis

↓

Data Not Found

↓

Database

↓

Store In Redis

↓

Response
```

The first request is slower because the database must be queried.

---

# Database Lookup

When Redis cannot find the requested data:

```text
Redis

↓

Cache Miss

↓

Database Query
```

The backend requests the required information from the database.

Example:

```sql
SELECT * FROM products
WHERE id = 101;
```

The database returns the requested data.

---

# Cache Population

After retrieving data from the database, the backend stores it in Redis.

Flow:

```text
Database

↓

Backend

↓

Redis

↓

Store Data
```

This process is called:

```text
Cache Population
```

The cache is now populated for future requests.

---

# Future Requests

After cache population:

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

The database is no longer required for subsequent requests until the cache expires or is invalidated.

---

# Why Store The Result In Redis?

Without storing the result:

```text
Request 1

↓

Database

----------------

Request 2

↓

Database

----------------

Request 3

↓

Database
```

Every request would query the database.

---

With cache population:

```text
Request 1

↓

Database

↓

Store In Redis

----------------

Request 2

↓

Redis

----------------

Request 3

↓

Redis
```

Only the first request queries the database.

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

Key Not Found

↓

Query Database

↓

Database Returns Data

↓

Store In Redis

↓

Return Response
```

---

# Real-World Example

Suppose a user opens:

```text
Product #101
```

Redis:

```text
product:101

↓

Not Found
```

Database:

```text
Returns Product
```

Backend:

```text
Store Product In Redis
```

The next user requesting the same product experiences a **Cache Hit**.

---

# Cache Miss vs Cache Hit

| Cache Miss                | Cache Hit               |
| ------------------------- | ----------------------- |
| Data not found in Redis   | Data found in Redis     |
| Database is queried       | Database is skipped     |
| Slower response           | Faster response         |
| Cache gets populated      | Cache already populated |
| Usually the first request | Usually later requests  |

---

# Why Not Store Everything In Redis?

Applications may have millions of records.

Example:

```text
50 Million Products
```

Storing everything in Redis would:

- Consume excessive memory
- Increase infrastructure cost
- Cache data that may never be requested

Instead, data is cached **only when requested**.

This approach is called:

```text
Lazy Loading

or

Cache Aside Pattern
```

---

# Key Takeaways

- A Cache Miss occurs when Redis does not contain the requested data.
- The application queries the database after a Cache Miss.
- Retrieved data is stored in Redis for future requests.
- This process is called Cache Population.
- Only the first request is slow; later requests become Cache Hits.
- Cache Misses are normal and expected for new or expired data.
- Lazy loading prevents unnecessary memory usage.

---

# Questions You Should Be Able To Answer

### What is a Cache Miss?

```text
A Cache Miss occurs when the requested data is not present in Redis, forcing the application to retrieve it from the database.
```

---

### Why store the result afterward?

```text
To populate the cache so that future requests for the same data can be served directly from Redis as Cache Hits, reducing database load and improving response time.
```

---

# One-Line Summary

A Cache Miss occurs when Redis doesn't contain the requested data. The application retrieves the data from the database, stores it in Redis (cache population), and returns it to the client so that future requests become fast Cache Hits.
