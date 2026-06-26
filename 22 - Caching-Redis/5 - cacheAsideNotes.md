# Part 7 — Cache Aside Pattern (Lazy Loading)

## Introduction

The **Cache Aside Pattern** is the most widely used caching strategy in backend applications.

In this pattern, the application is responsible for managing the cache.

Instead of automatically loading data into Redis, the application first checks Redis.

If the data is not present, it retrieves the data from the database, stores it in Redis, and then returns the response.

Because data is cached **only when it is requested**, this approach is also called **Lazy Loading**.

---

# What Is Cache Aside?

Cache Aside means:

```text
Application

↓

Checks Cache

↓

If Found

↓

Return Data

----------------

If Not Found

↓

Query Database

↓

Store In Cache

↓

Return Data
```

The cache exists **alongside (aside)** the database.

The application decides when to read from or write to the cache.

---

# Why Is It Called Cache Aside?

The cache is not directly connected to the database.

Instead:

```text
Application

↓

Redis

↓

PostgreSQL
```

The application controls both systems.

Redis never automatically queries PostgreSQL.

PostgreSQL never automatically updates Redis.

Everything is managed by the application.

---

# Lazy Loading

Lazy Loading means:

```text
Load Data

Only When Needed
```

Instead of:

```text
Cache Everything
```

Example:

```text
50 Million Products
```

Most products may never be viewed.

Instead of caching all products:

```text
User Requests Product

↓

Load From Database

↓

Store In Redis

↓

Future Requests Use Redis
```

Only requested data is cached.

---

# Read Through Cache

Every read request follows the same process.

```text
Request

↓

Check Redis

↓

Cache Hit?

↓

YES

↓

Return Data

----------------

NO

↓

Query Database

↓

Store In Redis

↓

Return Data
```

Every request attempts to read from Redis before accessing the database.

---

# Cache Population

When Redis does not contain the requested data:

```text
Database

↓

Return Data

↓

Store In Redis
```

This process is called:

```text
Cache Population
```

The cache is populated after a Cache Miss.

---

# Complete Request Flow

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

Only the first request accesses the database.

Future requests become Cache Hits.

---

# Real-World Example

Suppose a user opens:

```text
GET /products/101
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

Next user:

```text
GET /products/101

↓

Redis

↓

Data Found

↓

Response
```

Database is skipped.

---

# Why Is Cache Aside So Popular?

Because it provides:

- Reduced database load
- Faster response times
- Efficient memory usage
- Automatic cache growth
- Better scalability
- Easy implementation
- Full control over caching logic

Applications cache **only the data that users actually request**.

---

# Advantages

- Simple to implement
- Prevents unnecessary caching
- Reduces memory usage
- Improves application performance
- Database remains the source of truth
- Works well for read-heavy applications

---

# Disadvantages

- First request is always slower (Cache Miss)
- Application must manage cache updates
- Risk of stale data if cache isn't invalidated correctly

---

# Cache Aside vs Cache Hit

| Cache Aside                                     | Cache Hit                         |
| ----------------------------------------------- | --------------------------------- |
| Caching strategy                                | Request outcome                   |
| Describes how the application manages the cache | Indicates data was found in Redis |
| Includes Cache Miss handling                    | Skips the database completely     |

---

# Key Takeaways

- Cache Aside is the most commonly used Redis caching strategy.
- The application is responsible for managing the cache.
- Redis is always checked before the database.
- If Redis misses, the application queries the database.
- Retrieved data is stored in Redis (Cache Population).
- Future requests become Cache Hits.
- Lazy Loading means data is cached only when requested.
- The database remains the source of truth.

---

# Questions You Should Be Able To Answer

### What is the Cache Aside Pattern?

```text
A caching strategy where the application first checks Redis. If the data is missing, it retrieves it from the database, stores it in Redis, and returns it to the client.
```

---

### Why is it called Cache Aside?

```text
Because Redis sits alongside the database, and the application—not Redis or the database—is responsible for managing the cache.
```

---

### What is Lazy Loading?

```text
A technique where data is loaded into the cache only when it is requested for the first time.
```

---

### Why is this pattern so popular?

```text
Because it reduces database load, improves response times, uses memory efficiently, and gives the application complete control over cache management.
```

---

# One-Line Summary

The Cache Aside Pattern (Lazy Loading) is a caching strategy where the application checks Redis first, falls back to the database on a Cache Miss, stores the retrieved data in Redis, and serves future requests directly from the cache.
