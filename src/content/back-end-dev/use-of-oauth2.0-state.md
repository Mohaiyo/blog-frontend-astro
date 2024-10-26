---
title: 'Oauth2.0 state的使用'
pubDate: 2024-10-26
description: '此参数有多种用途，例如将用户定向到 您应用中的正确资源、发送 Nonce 以及缓解Crose-site Request Forgery等。'
author: Wayne.Liang
image:
  cover: '../assets/back-end-dev/use-of-oauth2-state.png'
  alt: 'oauth state'
category: '后端开发'
tags: ['Oauth2.0', 'Python']
---

## Content

## 作用

此参数有多种用途，例如将用户定向到 您应用中的正确资源、发送 Nonce 以及缓解跨网站请求 。由于您的 redirect_uri 可以被猜到，因此使用 state 值可以更好地确保传入的连接是经过身份验证请求。如果您生成了随机字符串或者对Cookie的哈希值或者另一个用于捕获客户端状态的值，您可以验证此值，要确保请求和响应来自同一个浏览器，以防范此类攻击，例如 CSRF.

## OAuth2.0 服务器的流程示例

### 创建防伪状态令牌

您必须防止请求伪造攻击，来保护用户的安全。第一步是创建一个唯一的会话令牌来保存应用和用户客户端之间的状态。 稍后，您将此唯一会话令牌与 Google OAuth 登录服务返回的身份验证响应相匹配，以验证用户发出请求且不是恶意攻击者。这些令牌通常称为跨网站请求伪造 (CSRF) 令牌。

状态令牌的一个理想选择是使用高质量随机数生成器构造的大约 30 个字符的字符串。另一个是利用密钥对部分会话状态变量进行签名而生成的哈希值，该密钥在后端保持保密。

以下代码演示了如何生成唯一的会话令牌。

```python
# Create a state token to prevent request forgery.
# Store it in the session for later validation.
state = hashlib.sha256(os.urandom(1024)).hexdigest()
session['state'] = state
# Set the client ID, token state, and application name in the HTML while
# serving it.
response = make_response(
    render_template('index.html',
                    CLIENT_ID=CLIENT_ID,
                    STATE=state,
                    APPLICATION_NAME=APPLICATION_NAME))

```

### 发送身份验证请求

下一步是使用适当的 URI 参数构建 HTTPS GET 请求。请注意，此过程的所有步骤都使用 HTTPS（而非 HTTP）；HTTP 连接会被拒绝。您应使用 authorization_endpoint 元数据值从发现文档中检索基本 URI。以下讨论假定基本 URI 为 https://accounts.google.com/o/oauth2/v2/auth。

对于基本请求，请指定以下参数：

- client_id（从 API Console Credentials page获取）。
- response_type，在基本授权代码流程请求中应为 code。（如需了解详情，请访问 response_type。）
- scope，在基本请求中应为 openid email。（如需了解详情，请访问 scope。）
- redirect_uri 应该是将接收来自 Google 的响应的服务器上的 HTTP 端点。该值必须与您在 API Console Credentials page中配置的 OAuth 2.0 客户端的某个已授权重定向 URI 完全匹配。如果此值与已获授权的 URI 不匹配，请求将失败并显示 redirect_uri_mismatch 错误。
- state 应包含防伪造唯一会话令牌的值，以及在用户返回到您的应用时恢复上下文所需的任何其他信息，例如起始网址。（如需了解详情，请访问 state。）
- nonce 是由您的应用生成的随机值，可实现重放攻击防范（如果存在）。
- login_hint 可以是用户的电子邮件地址或 sub 字符串，相当于用户的 Google ID。如果您未提供 login_hint，而用户当前已登录，则同意屏幕包含将用户的电子邮件地址释放给您的应用的请求。（如需了解详情，请访问 login_hint。）使用 hd 参数，为与 Google Workspace 或 Cloud 组织关联的特定网域的用户优化 OpenID Connect 流程（如需了解详情，请访问 hd）。

下面是一个完整的 OpenID Connect 身份验证 URI 的示例，其中含有换行符和空格，以方便阅读：

```http
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code&
client_id=424911365001.apps.googleusercontent.com&
scope=openid%20email&
redirect_uri=https%3A//oauth2.example.com/code&
state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2-login-demo.example.com%2FmyHome&
login_hint=jsmith@example.com&
nonce=0394852-3190485-2490358&
hd=example.com
```

如果您的应用请求用户提供关于他们的任何新信息，或者您的应用请求访问用户之前未曾批准过的帐号访问权限，则必须征得用户同意。

### 确认反伪造状态令牌

响应会发送到您在请求中指定的 redirect_uri。所有响应都会在查询字符串中返回，如下所示：

```http
https://oauth2.example.com/code?state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foa2cb.example.com%2FmyHome&code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&scope=openid%20email%20https://www.googleapis.com/auth/userinfo.email
```

在服务器上，您必须确认从 Google 收到的 state 与您在第 1 步中创建的会话令牌匹配。这种往返验证有助于确保发出请求的是用户（而非恶意脚本）。

```python
# Ensure that the request is not a forgery and that the user sending
# this connect request is the expected user.
if request.args.get('state', '') != session['state']:
  # if state not equal with session state return 401
  response = make_response(json.dumps('Invalid state parameter.'), 401)
  response.headers['Content-Type'] = 'application/json'
  return response
```

### 用 code 交换访问令牌和 ID 令牌

响应中包含 code 参数，即您的服务器可以用它来换取访问令牌和 ID 令牌的一次性授权代码。您的服务器通过发送 HTTPS POST 请求来进行此交换。

### 从 ID 令牌获取用户信息

ID 令牌是 JWT（JSON 网络令牌），即经过加密签名的 Base64 编码 JSON 对象。通常，请务必先验证 ID 令牌，然后再使用它。不过，由于您通过无中间协议的 HTTPS 通道直接与 Google 通信，并使用您的客户端密钥向 Google 进行身份验证，因此您可以确信您收到的令牌确实来自 Google 并且是有效的。

### ID token payload

ID 令牌是包含一组名称/值对的 JSON 对象。下面是一个示例，其格式是为了便于阅读：

```json
{
  "iss": "https://accounts.google.com",
  "azp": "1234987819200.apps.googleusercontent.com",
  "aud": "1234987819200.apps.googleusercontent.com",
  "sub": "10769150350006150715113082367",
  "at_hash": "HK6E_P6Dh8Y93mRNtsDB1Q",
  "hd": "example.com",
  "email": "jsmith@example.com",
  "email_verified": "true",
  "iat": 1353601026,
  "exp": 1353604926,
  "nonce": "0394852-3190485-2490358"
}
```


### 对用户进行身份验证

从 ID 令牌获取用户信息后，您应该查询应用的用户数据库。如果数据库中已存在用户，且 Google API 响应满足了所有登录要求，您应该为该用户启动应用会话。