# serverless full stack project

# Installing
```
$ cd WiToDo/serverSrc
$ npm install
```

# Offline Test
```
$ cd WiToDo/serverSrc
$ npm rum offline
```

# Deploy APIs to Lambda
add AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to environment variable
```
$ cd WiToDo/serverSrc
$ npm rum deploy
```

# Connect to RDS
add RDS_URL to environment variable
```shell
export RDS_URL="postgres://username:pass@host.com:5432/database"
```