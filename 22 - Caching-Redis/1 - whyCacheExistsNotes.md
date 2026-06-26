# Part 1 — Why Caching Exists

## Introduction

Databases are designed to store and manage data permanently.

However, querying the database for the same data repeatedly is expensive and slows down applications as traffic increases.

Caching solves this problem by storing frequently accessed data in a much faster storage layer (memory), reducing database load and improving application performance.

---

# Why Isn't The Database Enough?

Every user request does **not** necessarily require fresh data from the database.

Example:

```text
1000 Users

↓

Open Same Product

↓

1000 Database Queries
```

Even though the product information hasn't changed.

This results in unnecessary database work.

---

# Database Bottlenecks

A bottleneck is the component that limits the overall performance of a system.

Example:

```text
10,000 Users

↓

Backend

↓

Database

↓

Response
```

As user traffic increases, every request reaches the database, making it the slowest component in the request flow.

---

# Slow Database Queries

Even modern databases must perform several operations before returning data.

Typical flow:

```text
Receive Query

↓

Parse SQL

↓

Query Planning

↓

Read Index

↓

Locate Data

↓

Return Result
```

These operations take significantly longer than reading data directly from memory.

---

# Read-Heavy Applications

Many applications receive far more read requests than write requests.

Examples:

- Amazon (View Products)
- YouTube (Watch Videos)
- Instagram (View Posts)
- GitHub (Read Repositories)
- News Websites

These applications are called:

```text
Read-Heavy Applications
```

Because users mostly retrieve existing data instead of creating new data.

---

# Performance Problems

Without caching:

```text
Every Request

↓

Database

↓

Response
```

As traffic increases:

- More database queries
- Higher CPU usage
- More disk I/O
- Increased latency
- Slower response times

Eventually, the database becomes a bottleneck.

---

# User Experience

Slow applications create poor user experiences.

Example:

```text
User Clicks Product

↓

Wait...

↓

Database Query

↓

Response
```

Long response times lead to frustrated users and lower engagement.

Caching helps applications respond much faster.

---

# Cost Of Database Queries

Every database query consumes resources.

Including:

```text
CPU

Memory

Disk I/O

Network Bandwidth
```

Millions of identical queries increase infrastructure costs.

Caching reduces unnecessary database operations, lowering operational costs.

---

# What Is Caching?

Caching is the process of storing frequently accessed data in a faster storage layer.

Definition:

```text
Frequently Accessed Data

↓

Store In Memory

↓

Serve Future Requests Quickly
```

Instead of repeatedly querying the database.

---

# Cache vs Database

## Database

Purpose:

```text
Permanent Storage
```

Stores:

- Users
- Orders
- Payments
- Products
- Business Data

---

## Cache

Purpose:

```text
Fast Temporary Storage
```

Stores:

- Frequently accessed data
- Copies of database records
- Temporary information

Redis is usually **not** the source of truth.

Instead:

```text
PostgreSQL

↓

Source Of Truth

↓

Redis

↓

Fast Copy
```

---

# Memory vs Database Access

## Database Access

```text
Request

↓

Parse Query

↓

Locate Data

↓

Return Result
```

---

## Redis Access

```text
GET Key

↓

Memory Lookup

↓

Return Value
```

Memory lookups require fewer operations and therefore provide much lower latency.

---

# Without Caching

```text
Client

↓

Backend

↓

Database

↓

Response
```

Every request reaches the database.

---

# With Caching

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

Only cache misses require database access.

---

# Real-World Example

Amazon Product Page:

Without Cache:

```text
Millions Of Users

↓

Millions Of Database Queries
```

---

With Cache:

```text
Database

↓

Redis Cache

↓

Millions Of Users
```

The database processes fewer requests while Redis serves most users directly.

---

# Key Takeaways

- Databases are optimized for permanent data storage.
- Repeated database queries waste resources.
- High traffic can turn the database into a bottleneck.
- Read-heavy applications benefit significantly from caching.
- Caching stores frequently accessed data in memory.
- Redis is commonly used as a caching layer.
- Caching improves response time and user experience.
- Caching reduces CPU usage, disk I/O, and infrastructure costs.
- Redis is typically a fast copy of data, while the database remains the source of truth.

---

# Questions You Should Be Able To Answer

### Why isn't the database enough?

```text
Because repeatedly querying the database for the same data increases latency, resource usage, and eventually creates a performance bottleneck.
```

---

### Why do applications become slow?

```text
As traffic increases, more requests reach the database, increasing CPU usage, disk I/O, memory usage, and response times.
```

---

### Why was caching invented?

```text
To store frequently accessed data in memory, reducing database load, improving response times, lowering infrastructure costs, and providing a better user experience.
```

---

# One-Line Summary

Caching exists to avoid repeatedly querying the database for the same data by storing frequently accessed information in memory, allowing applications to respond faster while reducing database load and improving scalability.
