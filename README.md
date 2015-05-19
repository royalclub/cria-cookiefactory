# Introduction
This is the repository for the CRIA-CookieFactory assignment of the course CRIA (S2-2015) at the HAN.

# Deployment Server
There is a server which automatically fetches the latest commits from the repository and updates the production environment. The server is located on "server3.tezzt.nl".

## How to connect
You can connect to the server using the PuTTY client. Make sure you use port 22 for SSH. Username and password have been shared previously within the group!
You can place the username in the hostname so that the client automatically detects it and you do not have to type in the username all the time. This can be done by appending the username
to the hostname, followed by an "@", followed by the actual hostname "server3.tezzt.nl".

## Webhook
In order for the server to detect changes to the repository, there's an custom webhook server which was developed by Theo Theunissen. This server is located in the folder `deployment/server/`.
The webhook runs on the port configured in the `server/config/config.js`, 'deployment' variable.

### Manual triggering
You can trigger the webhook by sending the following POST request (Postman or DHC) to `http://server3.tezzt.nl:7061/webhook`:
```
    {"repository": { "url": "https://github.com/HB-2012/cria-cookiefactory" } }
```

Make sure you set Content-Type to application/json.
Example: http://www.neozftw.nl/files/img/Screen-19-05-2015_121018.png


### What does the webhook do?
The webhook starts the pullingAndRunning.sh batch script, in which all tests are ran. The pullingAndRunning.sh batch file can be found in `deployment/server/` also.

### Where are logs written to?
Detailed log files for unit tests, e2e tests and the static analyzer can be found in their own folders. The general log file (which is also emailed), is called pullingAndRunning.sh.log, and is found in the same folder as the original batch file.