# Why JWT Exists

## Introduction

Before understanding JWT structure, it is important to understand **why JWT was created in the first place**.

JWT was not invented because sessions are bad.

JWT was invented to solve a different set of architectural problems related to scalability, distributed systems, and stateless authentication.

---

# The Core Problem

HTTP is a stateless protocol.

This means:

```text
Request 1

↓

Server

↓

Response

----------------

Request 2

↓

Server

↓

Response
```
