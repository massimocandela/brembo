# urlbuilder
A simple utility for building URLs in JavaScript

Example: 
```
import url from 'brembo';
```

```
url.build("https://massimocandela.com", {
    path: ["example", "api", "v1"] // This can be a simple string too
    params: {
        a: 1,
        b: 2
    },
    anchor: "here"
});
```

It will return the following string:

__`https://massimocandela.com/example/api/v1?a=1&b=2#here`__


