# Part 2 — Cache Fundamentals

## Introduction

A cache is a fast, temporary storage layer that stores frequently accessed copies of data.

Instead of repeatedly querying the database for the same information, applications first check the cache.

If the data exists, it is returned immediately without accessing the database.

---

# What Is A Cache?

A cache is:

```text
Fast Temporary Storage

↓

Stores Frequently Accessed Data

↓

Reduces Database Queries
```

It stores a **copy** of data, not the original data.

---

# Cached Data

Cached data is data copied from the database into the cache.

Example:

```text
Database

↓

Product #101

↓

iPhone 16
```

Cached in Redis as:

```text
product:101

↓

iPhone 16
```

The database remains the source of truth, while Redis stores a temporary copy.

---

# Cache Layer

Redis acts as a layer between the application and the database.

Without Cache:

```text
Client

↓

Backend

↓

Database

↓

Response
```

---

With Cache:

```text
Client

↓

Backend

↓

Redis (Cache)

↓

Database (If Needed)

↓

Response
```

The application always checks Redis before querying the database.

---

# Cache Storage

Cache storage is where cached data is stored.

For Redis:

```text
Redis

↓

RAM

↓

Cached Data
```

The cache stores temporary copies of frequently requested information.

---

# In-Memory Cache

Redis stores cache inside:

```text
RAM
```

instead of:

```text
Disk
```

Because RAM provides:

```text
Lower Latency

Faster Reads

Higher Throughput
```

This makes Redis an **In-Memory Cache**.

---

# Temporary Storage

Cache is **temporary**, not permanent.

Database:

```text
Permanent Storage
```

Redis Cache:

```text
Temporary Storage
```

Cached data may disappear because:

- TTL expires
- Cache is manually cleared
- Redis restarts (without persistence)
- Cache is invalidated

---

# Fast Reads

Reading from Redis is significantly faster than querying the database.

Without Cache:

```text
Client

↓

Database

↓

Response
```

---

With Cache:

```text
Client

↓

Redis

↓

Response
```

This reduces latency and improves application performance.

---

# Request Flow

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

The database is only queried when the cache does not contain the requested data.

---

# What Data Should Be Cached?

Good Candidates:

- Product Details
- Blog Posts
- Categories
- Homepage Data
- Trending Products
- Public API Responses
- Weather Data
- Search Results

Characteristics:

```text
Frequently Read

Rarely Updated
```

---

# What Should NOT Be Cached?

Examples:

- Bank Balance
- Live Stock Prices
- Payment Status
- Live GPS Location
- Real-Time Trading Data

Characteristics:

```text
Frequently Updated

Requires Fresh Data
```

Caching this data can result in outdated information.

---

# Why Is Redis Used As A Cache?

Redis is widely used because it provides:

- In-Memory Storage
- Extremely Fast Reads
- Simple Key-Value Access
- Automatic Expiration (TTL)
- High Throughput
- Easy Integration with Backend Frameworks

Example:

```javascript
const product = await client.get("product:101");
```

---

# Database vs Cache

| Database                 | Cache                           |
| ------------------------ | ------------------------------- |
| Permanent Storage        | Temporary Storage               |
| Source Of Truth          | Copy Of Data                    |
| Disk Based               | Memory Based                    |
| Slower                   | Faster                          |
| Stores All Business Data | Stores Frequently Accessed Data |

---

# Key Takeaways

- A cache stores temporary copies of frequently accessed data.
- Cached data is copied from the database.
- Redis acts as a cache layer between the application and the database.
- Redis stores cache in RAM for extremely fast access.
- Cache improves read performance by reducing database queries.
- The database remains the source of truth.
- Cache should contain frequently read and infrequently changing data.
- Redis is commonly used because of its speed, TTL support, and scalability.

---

# Questions You Should Be Able To Answer

### What is a cache?

```text
A fast temporary storage layer that stores frequently accessed copies of data to reduce database queries.
```

---

### What data should be cached?

```text
Frequently read and infrequently changing data such as products, blog posts, categories, and public API responses.
```

---

### Why is Redis used as a cache?

```text
Because Redis stores data in RAM, provides extremely fast reads, supports TTL, scales to handle high request rates, and integrates easily with backend applications.
```

---

# One-Line Summary

A cache is a fast, temporary copy of frequently accessed database data. Redis acts as a cache layer between the application and the database, serving repeated requests from memory to reduce database load and improve application performance.
