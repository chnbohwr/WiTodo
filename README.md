# serverless full stack project

# Installing
```
$ cd WiToDo/serverSrc
$ npm install
```

# Setting Environment Variables
add AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY,RDS_URL to environment variable

# Offline Test
```
$ cd WiToDo/serverSrc
$ npm rum offline
```

# Deploy APIs to Lambda
```
$ cd WiToDo/serverSrc
$ npm rum deploy
```

# Connect to RDS
```shell
export RDS_URL="postgres://username:pass@host.com:5432/database"
```