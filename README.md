## TODO_APP

### Documentation to run this TODO_APP locally

## step -1
Install Node.js:
If you haven't already, you'll need to download and install Node.js on your machine. You can download the latest version from the official website: https://nodejs.org/

## step -2
Clone repository :
first clone this todo_app repository on local system by using
git clone https://github.com/SudhanshSingh/todo_app.git

## step -3
Install dependencies:
Once you have Node.js installed, navigate to the root directory of your Node.js project using a terminal or command prompt. In this directory, there should be a file named package.json that lists all of the dependencies required by your app. Run the command npm install to install these dependencies.

## step -4
Start the app:
After all the dependencies are installed successfully, you can start your app by running the command npm start in the terminal. This command will run the script defined in the "start" field of your package.json file.

## step -5
Access the app:
Once the app is started, you can access it in a web browser by going to http://localhost:8000 (or whatever port your app is running on).



### Documentation  to deploy  node app  to a cloud platform. 
 Here are the general steps to deploy a Node.js app to a cloud platform:

## step -1
Choose a cloud platform:
There are many cloud platforms to choose from, including Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), and Heroku. Choose a platform that best fits your needs and budget.

## step -2
Create an account:
Once you have chosen a platform, you'll need to create an account. Follow the platform's instructions for creating a new account.

## step -3
Install platform CLI:
Most cloud platforms provide a command-line interface (CLI) tool that you'll need to install on your local machine. This tool will allow you to manage your app on the cloud platform. Follow the platform's instructions for installing the CLI.

## step -4
Prepare your app for deployment:
Before you can deploy your app to the cloud platform, you'll need to make sure it's ready for deployment. This may involve configuring environment variables, setting up a database connection, or updating any necessary dependencies.

## step -5
Create a new app:
Use the platform's CLI tool to create a new app on the platform. This will typically involve specifying the type of app you're creating (in this case, a Node.js app) and giving the app a name.

## step -6
Deploy your app:
Once you have created the app, use the platform's CLI tool to deploy your Node.js app to the cloud platform. This will typically involve specifying the location of your app's source code and any necessary configuration options.

## step -7
Test your app:
Once your app is deployed, you'll want to test it to make sure it's working properly. Use the platform's tools to access your app's logs and performance metrics to identify any issues that need to be addressed.



### Key points
In this project  we will work on two features, 1.User 2.Task
  1) created it's model.
  2) builds it's APIs.
  3) tested these APIs.


  ## FEATURE I - User
### Models
- User Model
{
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}, // encrypted password
    gender: {type:String, required:true,enum:["Male","Female","Custom"]}, 
    profession:{type:String, required:true}
}

## User APIs 
### POST /register
### POST /login


  ## FEATURE 2 - Task
### Models
{
title:{type:String,required:true},
description :{type:String,required:true},
hasAlarm:{type:Boolean,default:true,required:true},
alarmDate:{type:Date,required:true},
dueDate:{type:Date,required:true},
status:{type:String,required:true,enum:["new","pending", "completed"]},
userId:{type:ObjectId,ref:"User",required:true},
isDeleted:{type:Boolean,default:false}
}

## Task APIs 

### POST /task
### get /task
### update /task
### delete /task

