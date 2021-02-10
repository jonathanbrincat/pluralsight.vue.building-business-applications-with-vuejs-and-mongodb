# Pluralsight - Building Business Applications with Vue.js and MongoDB

**by Mark Scott | Released 17 Jul 2018**

## Server

**_Asides from stylistic preferences this source remains unmodified and faithful to the original_**

---

## Project setup

### Ensure the local Mongo demon is up and running and your database is accessible first before launching the application.

```
mongod
```

### Launch the Express server and watch the source files for any changes

```
npm start
```

Notes:

- Mongo has a habit of persisting in the background or might of been launched by an unrelated process already and hogging the default port. To forcibly stop any instances of the Mongo demon running in the background. It's not elegant but it's effective.

```
sudo killall mongod
```
