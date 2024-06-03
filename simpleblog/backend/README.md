# SimpleBlog Backend

## Introduction
This is simply the REST API that was created with the intention of enabling the frontend perform the basic CRUD operations which form the core functionality of this application. And to that effect, everything was done to keep this implementation very simple. To that effect, here are some of the key things to note:
- This API does not require authentication in order to perform any function. This was done so that I could focus on implementing only the core functionality of the blog

- A lot of effort was expended to keep the documentation short and simple.

- I aimed to not create any feature or endpoint that would be deemed redundant or even outright useless by the API user or tester. A good example of this is the fact that there is only a single PATCH endpoint for updating the contents of the blog post. I didn't create a seperate PUT endpoint for the same purpose as I personally believe that doing so would be rather redundant and probably even unhelpful.

- So many other tiny changes that I won't be able to highlight in this brief doc. Please feel free to dig in to the code anytime in order to find out how to use the API for your purposes. _Good Luck 👍🏾_

## Requirements
Owing to the fact that this API was never deployed to a remote server, you'll have to setup an environment on your local system in order to test it. Before doing so, you want to make sure that you have the following installed and setup on your system:

- MongoDB version 7.0.4 or greater. To learn how to install it on your O.S of choice, visit any of the following links:
  + [Ubuntu](https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-ubuntu/)
  + [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
  + [Mac OS](https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-os-x/)

- Node.js version 18 upwards. visit:
  + [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) (_I recommend that you install Node.js using NVM as shown in the second part of this tutorial_)
  + [Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
  + [Mac OS](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)

## Instructions
Now that you have the required software installed, let's setup the project and test it on your local computer. _Some of the instructions I provide below will only work on linux systems. If you're using a Windows or a Mac and any of these commands do not work on your system, then please feel free to neglect the commands and use the equivalent command for your O.S_

- clone the `miniprojects` repo to your local machine:
  ```
  $ git clone https://github.com/PC-Ngumoha/miniprojects.git
  ```

- Navigate to the simpleblog backend
  ```
  $ cd miniprojects/simpleblog/backend/
  ```

- Start the dev server
  ```
  $ npm run dev
  ```

- Open the browser and navigate to the following URL:
  ```
  http://localhost:3000/api/docs
  ```
  At this URL, you'll be able to test the operation of the API directly from the SwaggerUI documentation provided. I did my best to make the documentation as easy to use as possible. But if you feel that more can be done, then please do so. _The code is now in your hands_

**Good Luck 👍🏾**