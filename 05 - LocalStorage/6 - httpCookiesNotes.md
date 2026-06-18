# HttpOnly Cookies

## Introduction

One of the biggest problems with storing authentication tokens in the browser is that JavaScript can often read them.

If an attacker successfully executes JavaScript through an XSS attack, they may be able to steal authentication tokens and impersonate users.

To reduce this risk, browsers provide a special cookie attribute called:

```text
HttpOnly
```

HttpOnly is one of the most important security features in modern authentication systems.

---

# What Is HttpOnly?

HttpOnly is a cookie attribute that prevents JavaScript from accessing a cookie.

Without HttpOnly:

```text
JavaScript

↓

Can Read Cookie
```

With HttpOnly:

```text
JavaScript

↓

Cannot Read Cookie
```

The cookie still exists.

The browser still sends it.

The server can still read it.

Only JavaScript is blocked.

---

# Mental Model

Normal Cookie:

```text
Cookie

↓

Browser

↓

JavaScript

↓

Can Read
```

HttpOnly Cookie:

```text
Cookie

↓

Browser

↓

JavaScript

↓

Blocked
```

---

# Why Was HttpOnly Invented?

Before HttpOnly existed:

```text
XSS

↓

document.cookie

↓

Steal Authentication Cookie

↓

Account Takeover
```

Attackers could easily steal session identifiers and authentication tokens.

HttpOnly was introduced to make this much harder.

---

# What Problem Does HttpOnly Solve?

Problem:

```text
Authentication Cookie

↓

JavaScript Accessible

↓

XSS Attack

↓

Cookie Theft
```

Solution:

```text
Authentication Cookie

↓

HttpOnly

↓

JavaScript Blocked

↓

Cookie Protected
```

---

# What Attack Does HttpOnly Reduce?

HttpOnly primarily reduces:

```text
XSS-Based Cookie Theft
```

Specifically:

```text
Injected JavaScript

↓

Attempt To Read Cookie

↓

Blocked
```

---

# Browser Behavior

Even though JavaScript cannot read the cookie:

```text
Browser

↓

Still Stores Cookie

↓

Still Sends Cookie

↓

Server Receives Cookie
```

Authentication continues working normally.

---

# Authentication Flow With HttpOnly

```text
Login

↓

Generate JWT

↓

Set-Cookie

↓

HttpOnly

↓

Browser Stores Cookie

↓

Future Request

↓

Cookie Automatically Sent

↓

Server Verifies JWT

↓

Authenticated
```

---

# Common Misconceptions

## ❌ HttpOnly Encrypts Cookies

False.

It only blocks JavaScript access.

---

## ❌ HttpOnly Hides Cookies From The Server

False.

Servers still receive the cookie.

---

## ❌ HttpOnly Stops All XSS

False.

It only reduces token theft.

---

## ❌ HttpOnly Makes Authentication Perfectly Secure

False.

It is one layer of defense.

---

# Key Takeaways

- HttpOnly is a cookie attribute.
- It prevents JavaScript from reading cookies.
- It was created to reduce XSS-based cookie theft.
- Browsers still send HttpOnly cookies automatically.
- Servers can still access HttpOnly cookies.
- HttpOnly is one of the most important authentication security features.

---

# One-Line Summary

HttpOnly is a cookie security attribute that prevents JavaScript from accessing authentication cookies, significantly reducing the risk of token theft through XSS attacks.
