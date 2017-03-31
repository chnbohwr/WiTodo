# serverless full stack project

### General

#### Setting Environment Variables
- add AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and RDS_URL to environment variable
```shell
export AWS_REGION="us-ease-1"
export AWS_ACCESS_KEY_ID="XXXXXXXX"
export AWS_SECRET_ACCESS_KEY="XXXXXOOOOO"
export RDS_URL="postgres://username:pass@host.com:5432/database"
export JWT_SECRET="XXXXXXXXXXXXXXXOO"
```

---

### Use CLI Create DB
```shell
$ aws rds create-db-instance \
  --db-instance-identifier dbname \
  --engine postgres \
  --engine-version x.x.x \
  --master-username xxx \
  --master-user-password xxxxx \
  --db-instance-class xxxxx \
  --no-multi-az \
  --no-publicly-accessible \
  --backup-retention-period 7 \
  --db-subnet-group-name default \
  --vpc-security-group-ids sg-xxxx \
  --allocated-storage 5
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
$ npm run offline
```

#### Deploy APIs to Lambda
```shell
$ cd WiToDo/serverSrc
$ npm run deploy
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