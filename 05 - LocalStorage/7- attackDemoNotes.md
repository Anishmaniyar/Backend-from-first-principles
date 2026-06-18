# HttpOnly Cookie vs LocalStorage Attack Demo

## Goal

Demonstrate why HttpOnly cookies exist.

---

# Scenario 1 — JWT Stored In LocalStorage

Authentication flow:

```text
Login

↓

JWT

↓

LocalStorage
```

Attacker performs XSS:

```text
Injected JavaScript

↓

Read LocalStorage

↓

Extract JWT

↓

Send To Attacker
```

Result:

```text
JWT Stolen

↓

Attacker Authenticated

↓

Account Compromised
```

---

# Scenario 2 — JWT Stored In HttpOnly Cookie

Authentication flow:

```text
Login

↓

JWT

↓

HttpOnly Cookie
```

Attacker performs same XSS:

```text
Injected JavaScript

↓

Attempt Read Cookie

↓

Blocked
```

Result:

```text
JWT Not Exposed

↓

Attacker Cannot Directly Steal Token
```

---

# The Important Lesson

JWT security and token theft are different problems.

JWT Signature protects against:

```text
Token Modification

Forgery

Tampering
```

HttpOnly protects against:

```text
Token Theft

XSS-Based Cookie Reading
```

Both protections are needed.

---

# Key Takeaways

- LocalStorage can be read by JavaScript.
- HttpOnly cookies cannot be read by JavaScript.
- XSS can steal LocalStorage tokens.
- HttpOnly significantly reduces token theft risk.
- JWT signatures do not prevent theft.
- HttpOnly exists primarily to reduce XSS-related authentication attacks.

---

# One-Line Summary

The comparison between LocalStorage and HttpOnly cookies demonstrates that while JWT signatures protect against token modification, HttpOnly cookies help protect against token theft by preventing JavaScript from reading authentication tokens.
