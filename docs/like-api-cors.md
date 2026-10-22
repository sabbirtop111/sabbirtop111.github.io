# Like API CORS (required for the website card)

The portfolio is on GitHub Pages (`sabbirtop111.github.io`).
The Like API is on Vercel. Browsers hide the JSON unless the API sends CORS.

Add this header on `sabbir-paid-api2.vercel.app`:

```
Access-Control-Allow-Origin: *
```

Vercel `vercel.json` example:

```json
{
  "headers": [
    {
      "source": "/like",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "*" }
      ]
    }
  ]
}
```

Or in the API handler:

```js
res.setHeader("Access-Control-Allow-Origin", "*");
```

Info API already has this header — that is why the Info card works.
After CORS is on, the Like card maps:

- LikesGivenByAPI → Given now
- LikesbeforeCommand → Before
- LikesafterCommand → After
- status 1 or 2 → Status
- PlayerNickname / UID → name line
