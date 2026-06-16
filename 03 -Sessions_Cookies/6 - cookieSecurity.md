# Cookie Security

## Introduction

Cookies are stored in the browser and are automatically sent with future requests.

Since cookies often contain important information (such as Session IDs), they must be protected against common web attacks.

Modern browsers provide several security attributes for cookies:

- `HttpOnly`
- `Secure`
- `SameSite`

These attributes help reduce the risk of cookie theft and misuse.

> **Important:** These attributes improve security but do not make cookies inherently secure.

---

# HttpOnly

## What is HttpOnly?

`HttpOnly` is a cookie attribute that prevents JavaScript running in the browser from accessing the cookie.

Example:

```text
JavaScript

↓

document.cookie

↓

Blocked
```

The browser still stores the cookie and still sends it automatically with future requests.

The only restriction is that JavaScript cannot read or modify it through `document.cookie`.

---

## Why Was HttpOnly Invented?

One major web attack is **Cross-Site Scripting (XSS)**.

In an XSS attack, malicious JavaScript executes inside a user's browser.

Without HttpOnly:

```text
Attacker JavaScript

↓

document.cookie

↓

Reads Session Cookie

↓

Sends Cookie To Attacker

↓

Session Hijacking
```

With HttpOnly:

```text
Attacker JavaScript

↓

document.cookie

↓

Access Blocked

↓

Cookie Cannot Be Read
```

This significantly reduces the risk of session cookie theft through JavaScript.

---

## HttpOnly Does NOT

- Encrypt cookies
- Stop the browser from sending cookies
- Prevent all XSS attacks
- Make cookies impossible to steal through every attack vector

It only prevents JavaScript from directly reading the cookie.

---

## Mental Model

```
Browser

↓

Cookie

↓

JavaScript

↓

Can Read?

↓

❌ No (HttpOnly)
```

---

# Secure

## What is Secure?

`Secure` is a cookie attribute that instructs the browser to send the cookie **only over HTTPS connections**.

Conceptually:

```
HTTPS

↓

Cookie Sent

------------------

HTTP

↓

Cookie Not Sent
```

---

## Why Was Secure Added?

HTTP traffic is not encrypted.

If sensitive cookies travel over plain HTTP, attackers on the network may be able to intercept them.

Without Secure:

```
Browser

↓

HTTP

↓

Cookie Travels

↓

Possible Interception
```

With Secure:

```
Browser

↓

HTTP

↓

Cookie Not Sent
```

The cookie is transmitted only when using HTTPS.

---

## Secure Does NOT

- Encrypt cookies
- Encrypt HTTP traffic
- Replace HTTPS

HTTPS provides encryption.

`Secure` simply tells the browser:

> Never send this cookie over an insecure HTTP connection.

---

## Mental Model

```
HTTP

↓

❌ Don't Send Cookie

--------------------

HTTPS

↓

✅ Send Cookie
```

---

# SameSite

## What is SameSite?

`SameSite` is a cookie attribute that controls when browsers should send cookies during cross-site requests.

It was introduced primarily to reduce **Cross-Site Request Forgery (CSRF)** attacks.

---

# Why Was SameSite Invented?

Browsers automatically send cookies.

Suppose a user is logged into:

```
bank.com
```

The browser has:

```
session=abc123xyz
```

Now the user visits:

```
evil.com
```

Without restrictions:

```
evil.com

↓

Triggers Request

↓

bank.com

↓

Browser Automatically Sends Cookie

↓

bank.com Thinks User Is Authenticated
```

This creates the possibility of CSRF attacks.

---

# SameSite Modes

## SameSite=Strict

Strictest behavior.

```
Same Website

↓

✅ Send Cookie

--------------------

Different Website

↓

❌ Do Not Send Cookie
```

Provides the strongest protection.

---

## SameSite=Lax

Allows cookies in many normal browsing situations while blocking many cross-site requests.

Conceptually:

```
Normal Navigation

↓

✅ Usually Allowed

--------------------

Many Cross-Site Requests

↓

❌ Blocked
```

Balances security and usability.

---

## SameSite=None

Allows cookies to be sent in cross-site requests.

```
Cross-Site Request

↓

✅ Cookie Sent
```

Typically requires:

```
Secure
```

and is commonly used for:

- Third-party authentication
- External integrations
- Embedded services

---

# SameSite Does NOT

- Stop every CSRF attack
- Replace server-side security
- Eliminate all browser attacks

It is one important defense mechanism among many.

---

# XSS vs CSRF

## XSS (Cross-Site Scripting)

Attacker executes malicious JavaScript inside your website.

Example:

```
Malicious Script

↓

document.cookie

↓

Attempt Cookie Theft
```

`HttpOnly` helps reduce this risk.

---

## CSRF (Cross-Site Request Forgery)

Another website tricks a user's browser into sending authenticated requests.

Example:

```
evil.com

↓

Triggers Request

↓

Browser Sends Cookie

↓

bank.com

↓

Action Executed
```

`SameSite` helps reduce this risk.

---

# Putting Everything Together

Example:

```http
Set-Cookie:
session=abc123xyz;
HttpOnly;
Secure;
SameSite=Lax
```

Meaning:

```
HttpOnly

↓

JavaScript Cannot Read Cookie

--------------------

Secure

↓

Only HTTPS

--------------------

SameSite=Lax

↓

Cross-Site Restrictions Apply
```

---

# Complete Authentication Flow

```
User

↓

Login

↓

Server Authenticates

↓

Generate Session ID

↓

Store Session

↓

Set-Cookie

HttpOnly

Secure

SameSite=Lax

↓

Browser Stores Cookie

↓

Future HTTPS Request

↓

Browser Automatically Sends Cookie

↓

Server Reads Session ID

↓

Lookup Session

↓

Authenticated
```

---

# Comparison Table

| Attribute | Purpose                            | Primary Protection         |
| --------- | ---------------------------------- | -------------------------- |
| HttpOnly  | Prevent JavaScript access          | XSS cookie theft           |
| Secure    | Only send over HTTPS               | Insecure HTTP transmission |
| SameSite  | Restrict cross-site cookie sending | CSRF attacks               |

---

# Common Misconceptions

## ❌ HttpOnly encrypts cookies

False.

It only blocks JavaScript access.

---

## ❌ Secure encrypts cookies

False.

HTTPS provides encryption.

Secure only prevents cookies from being sent over HTTP.

---

## ❌ SameSite prevents every attack

False.

It primarily reduces CSRF risks.

---

## ❌ HttpOnly prevents cookies from being sent

False.

The browser still automatically sends them.

---

## ❌ Secure replaces HTTPS

False.

HTTPS must still be configured separately.

---

# Key Takeaways

- Cookies often contain important authentication information such as Session IDs.
- `HttpOnly` prevents JavaScript from reading cookies.
- `Secure` restricts cookies to HTTPS connections.
- `SameSite` restricts when cookies are sent in cross-site requests.
- `HttpOnly` helps reduce XSS-based cookie theft.
- `Secure` helps prevent cookies from being transmitted over insecure HTTP.
- `SameSite` helps reduce CSRF attacks.
- These attributes improve security but do not replace secure backend design.
- Authentication logic and sensitive data should always remain under server control.

---

# Easy Memory Trick

```
HttpOnly

↓

JavaScript

❌ Cannot Read

--------------------

Secure

↓

HTTP

❌ Don't Send

HTTPS

✅ Send

--------------------

SameSite

↓

Cross-Site Restrictions

↓

Helps Reduce CSRF
```

---

# One-Line Summary

`HttpOnly`, `Secure`, and `SameSite` are cookie security attributes that protect session cookies from common web attacks by restricting JavaScript access, limiting transmission to HTTPS, and controlling cross-site cookie behavior.
