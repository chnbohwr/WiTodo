# serverless full stack project

### General

#### Setting Environment Variables
add AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY,RDS_URL to environment variable
```shell
export AWS_REGION="us-ease-1"
export AWS_ACCESS_KEY_ID="XXXXXXXX"
export AWS_SECRET_ACCESS_KEY="XXXXXOOOOO"
export RDS_URL="postgres://username:pass@host.com:5432/database"
```

---

### Backend

#### Install Dependencies
```shell
$ cd WiToDo/serverSrc
$ npm install
```

#### Offline Test 
- start at : http://localhost:3000

```shell
$ cd WiToDo/serverSrc
$ npm rum offline
```

#### Deploy APIs to Lambda
```shell
$ cd WiToDo/serverSrc
$ npm rum deploy
```

---

### Frontend

#### Install Dependencies
```shell
$ cd WiToDo/webSrc
$ npm install  # or use yarn
```

#### run localhost
- start at : http://localhost:8000
- frontend default call offline api, need to run backend offline first
```shell
$ npm start
```

#### Deploy to AWS S3
```shell
$ npm run deploy
```