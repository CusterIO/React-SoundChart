## Application security, both in code and when configuring application server
The third party module: "secure-compare" check that the web hook POST really comes from GitHub. By comparing the header('x-hub-signature') with the hashed secret key. 

The third party module: "helmet" helps secure Express apps by setting various HTTP headers.

Created an OAuth App for GitHub. The flow to authorize users for the rApp app is: 1. Users clicks on login button and gets redirected to request their GitHub identity. 2.Users are redirected back to rApp appliction (my application) by GitHub. 3. The app accesses the API with the user's access token. 
Because of limited development time, this solution is only used to generate a session cookie, the application still access the resporitory by using my hardcoded personal access token when get/post/edit/delete comment and issues.

General security: You cant access any features of the application if you dont have an session cookie.

The app changes "<>" signs when posting information, though i dont have a database in this application.

Secret keys and variables are stored in .env file and cant be accessed.

### Reversed proxy
Nginx is used as the reversed proxy server. It listen to port 443 (https) and reads the self signed certificates that allows us running https. It has been configured to listen at port 80 (http) and redirect them to 443. (Nginx default file).

The nginx also delivers files from the public folder like javascript, css, html, img and such. This is done to take of the workload from the express server. While running the nginx on https it allows us to run the express server on http because all incoming traffic goes through the nginx before reaching the localhost where the application is located. In other words a client cant make request directly to the node application. 
### Process manager
The node application is running through PM2. It manages the applications states, so you can start, stop, restart and delete processes. In the assignment PM2 is used to automatically restart the express server if it crashes/stop working.
### TLS certificates
It grants permissions to use encrypted communication via Public Key Infrastructure, and also authenticates the identity of the certificate’s holder. There are three kinds of certificates, DV, OV and EV. They offer varying levels of authentication but the same form of industry-standard encryption

In this assignment self-signed certificates are being used by the nginx proxy to enable https. Located in config/sslcerts/cert.pem and config/sslcerts/cert.pem.
### Environment variables
The third party module: "dotenv" is used in this assignment to load environment variables from a .env file into process.env. This is done by the command bin/dev in development while pm2 and production are also added when running in production mode.

Storing configuration in the environment separate from code is based on "the tweleve-factor app methodology". 

It should only include environment-specific values such as database passwords or API keys. Your production database should have a different password than your development database.
## What differs in the application when running it in development from running it in production?
The node.js application runs more effective by the command NODE_ENV=production. In production you need to run in https, either by using a proxyserver or make the app itself create a https server. You also need secured session cookies.

NODE_ENV also remove stack traces in error pages.  

Allot of the environment variables also changes, including changing the redirecit from authent. and details like the webhooks delivery adress. 
## Extra Modules
### https://snyk.io
I used snyk to run a security test on my dependencies. This was the result:
![Snyk Test](rh222ki-examination-3/snyktest.PNG)
### "body-parser": "^1.18.2"
Add support for handling application/json and other data for express.
### "dotenv": "^5.0.1",
Used for my environment variables. 
### "express": "^4.16.2",
The server.
### "express-handlebars": "^3.0.0"
Templates for my CRUD pages on the server.
### "express-session": "^1.15.6"
Middleware for express that handles cookies/sessions.
### "helmet": "^3.12.0"
Hellps secure express with various http headers.
### "octonode": "^0.9.1",
octonode is a library for nodejs to access the github v3 api. Made it easier to write the api's. 
### "path": "^0.12.7",
The path module provides utilities for working with file and directory paths.
### "secure-compare": "^3.0.1",
Constant-time comparison algorithm to prevent timing attacks for Node.js
### "simple-oauth2": "^1.5.2",
OAuth2 lets users grant the access to the desired resources to third party applications, giving them the possibility to enable and disable those accesses whenever they want.

I used it in my application because of its logical design pattern. It all made sense the moment i saw the structure of the code.
### "socket.io": "^2.0.4"
Socket.IO enables real-time bidirectional event-based communication. Socket.IO is not a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds some metadata to each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed. 

Delivers the webhook payload to my rApp "real time" application. 
### "vue": "^2.5.15"
Vue is a progressive framework for building user interfaces. I use it for my SPA application to build up tables containing the resporitory issues and comments from my examination respority at github.
### https://pushjs.org
Push is an awesome module that delivers notifications. I made my own solution to it for my SPA app involving adding push.min.js to my public/js folder then linking push to the webhook delivery. 
### fs-extra
Reads the sslcerts files in the database so an https server can be created.

## Extra Features

### GitHub OAuth Application
Used to login to my application. There is allot of potential here that i didnt have time to use, i simply use it as a method to access my application feutres/functions.

### Notification
I implented delivery notification for my SPA app, that notifies the user when the respority has been updated. Im using the module push.

### Full CRUD functionality
My app serves full CRUD functionality with several features. Like post and edit issue, check your issue/comment history. Post comments, delete comments... it has a much cleaner and functional output than my SPA app.

### Analytic App
I cant take credit for this app. Ive copied the code to try it out and just did some changes to make it fit my express server and application. Still a fun app that can be launched from the menu after login.
