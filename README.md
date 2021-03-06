# CRUD User

_Crud system with Deno application_

Modules use:

[abc@v1.0.0-rc2](https://deno.land/x/abc) - For router(Similar Express)

[dotenvc@v1.0.0-rc2](https://deno.land/x/dotenv) - Variables globals in root file

[mongo@v0.6.0](https://deno.land/x/mongo) - MongoDB connection

[typescript@3.9](https://www.typescriptlang.org/) -  Language typed


## Endpoint Router
```
  get /allusers
  post /create
  get /user/:id
  put /user/:id
  delete /user/:id
```

# Format data

## GetById and DeleteById

```
params: mongo ID (_id)
```

## Post

```
{
    "name": "Diego",
    "middleName": "Telles",
    "profession": "Developer"
}

Has validation for Header type, if content-type is application/json
Has validation if body data this empty

```
## Update 
```
{
    "name": "Diego",
    "middleName": "Telles",
    "profession": "Developer"
}

Has validation for Header type, if content-type is application/json
Has validation if body data this empty
```

## .ENV
```
DATABASE_NAME=<DATABASE_NAME>
DATABASE_HOST=<URI_MONGO>
```

# Start server
```

deno run --allow-write --allow-read --allow-plugin --allow-net --allow-env --unstable ./server.ts

```

# Tags

```
--allow-write write permission
--allow-read read permission
--allow-plugin access to the plugin created by the mongo
--allow-net network access permission
--allow-env permission to access .env in the root folder
--unstable for running unstable packages

```