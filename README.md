# setup
0. `git clone '<url>'`
1. npm install
2. create .env file from .env-example
3. set all env variables
4. npm start

Pre VScode je vhodne nastavit si twig extension + do 
user settings pridat pre twig emmet support.
```
"emmet.includeLanguages": {   
  "twig": "html"
},
```


## snippets

routes/
```js
const express = require('express');
const router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.send("HELLO!");
});

module.exports = router;
```

pages/
```twig
{% extends "../../base.twig" %}

{% block content %}
  HTML here
{% endblock %}
```