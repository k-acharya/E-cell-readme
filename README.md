
# E-cell Website API

A brief description of what this project does and who it's for

## Run Locally

Clone the project

```bash
  git clone https://github.com/Ecell-NITS/e-cell-website-22-api.git
```

Go to the project directory

```bash
  cd e-cell-website-22-api
```

Install dependencies


```bash
  pnpm i
```

Start the development server

```bash
  pnpm dev
```

## API Reference

`Home route`

```http
  GET /Home
```

**Description:** create account of the user

**Response:**

```bash
    Welcome to E-Cell website Backend API. Developed by E-Cell Tech Team.
```

`Signup route`

```http  
  POST /signup
```

**Description:** create account of the user

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `password` | `string` | **Required**. A password that you can remember |
| `bio` | `string` | **Required**. bio for account creation |
| `userimg` | `string` | **Required**. enter user img |

`Login route`

```http
  POST /signup
```

**Description:** login to user account

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. user name |
| `email` | `string` | **Required**. Email for account creation |
| `password` | `string` | **Required**. A password that you can remember |

`add route`

```http  
  POST /add
```

**Description:** Add new event

<!-- | Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `password` | `string` | **Required**. A password that you can remember | -->

`fetch route`

```http  
  GET /fetch
```

**Description:** Allows users to fetch all events stored in the system

<!-- | Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation | -->

`dashboard route`

```http  
  GET /dashboard
```

**Description:** Fetch details of the user

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `bio` | `string` | **Required**. bio for dashboard |
| `userimg` | `string` | **Required**. user image for dashboard |
| `facebook` | `string` | **Required**. facebook account link |
| `github` | `string` | **Required**. github account link |
| `linkedin` | `string` | **Required**. linkedin account link |
| `instagram` | `string` | **Required**. instagram account link |

`fetchProfile route`

```http  
  GET /fetchProfile
```

**Description:** Fetch details like name, bio, userimg, email_id of a user

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `bio` | `string` | **Required**. bio for dashboard |
| `userimg` | `string` | **Required**. user image for dashboard |

`editProfile route`

```http  
  PUT /editProfile
```

**Description:** Edit the profile of a user

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `bio` | `string` | **Required**. bio for dashboard |
| `userimg` | `string` | **Required**. user image for dashboard |

`forgotPwd route`

```http  
  POST /forgotPwd
```

**Description:** Take email and send otp to reset the password

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |

`verifyOtpResetPwd route`

```http  
  POST /verifyOtpResetPwd
```

**Description:** Verify the otp send to user

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `otp` | `string` | **Required**. one time password  |

`changingPwd route`

```http  
  PUT /changingPwd
```

**Description:** Allow users to reset/ change their password

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword` | `string` | **Required**. Old password |
| `newPassword` | `string` | **Required**. A new password that you can remember |
| `confirmPassword` | `string` | **Required**. Confirm new password that you reset |

`deleteAccount route`

```http  
  POST /deleteAccount
```

**Description:** Flag the account for deletion. Once flagged, the user cannot log in anymore.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. enter user id |
| `user` | `string` | **Required**. Required user name |

`publicProfile route`

```http  
  GET /publicProfile
```

**Description:** Fetches the public profile of a user using their unique identifier

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `bio` | `string` | **Required**. enter bio |
| `userimg` | `string` | **Required**. user image for dashboard |
| `facebook` | `string` | **Required**. facebook account link |
| `github` | `string` | **Required**. github account link |
| `linkedin` | `string` | **Required**. linkedin account link |
| `instagram` | `string` | **Required**. instagram account link |

`getUser route`

```http  
  POST /getUser
```

**Description:** Admin-only route to fetch all users.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `listOfUsers` | `string` | **Required**. Enter list of users  |

`getNewSletters route`

```http  
  POST /getNewSletters
```

**Description:** Admin-only route to get all newsletter subscriptions

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `password` | `string` | **Required**. A password that you can remember |

`createUser route`

```http  
  POST /createUser
```

**Description:** route to create new user

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `password` | `string` | **Required**. A password that you can remember |

`sendQuery route`

```http  
  POST /sendQuery
```

**Description:** route to contact us

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Full name |
| `email` | `string` | **Required**. Email for account creation |
| `message` | `string` | **Required**. Enter a message |

`getQueries route`

```http  
  GET /getQueries
```

**Description:** route for the query

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Id` | `string` | **Required**. Enter  id |

`getQueries:id route`

```http  
  GET /getQueries:id
```

**Description:** route for the query id

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Id` | `string` | **Required**. Enter  id |

`query-read:id route`

```http  
  GET /query-read:id
```

**Description:** route for the query-read 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Id` | `string` | **Required**. Enter id |

`deletequery route`

```http  
  DELETE /deletequery
```

**Description:** route for the deletequeryquery

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Id` | `string` | **Required**. Enter id |

`checkEmail route`

```http  
  POST /checkEmail
```

**Description:** route to check email

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |

`send-otp route`

```http  
  POST /send-otp
```

**Description:** route to send-otp

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |
| `otp` | `string` | **Required**. Enter one time password |

`verify-otp route`

```http  
  POST /verify-otp
```

**Description:** route to verify otp

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |

`getblogs route`

```http  
  GET /getblogs
```

**Description:** Get blogs details

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Enter title |
| `tag` | `string` | **Required**. Enter tag |
| `intro` | `string` | **Required**. Enter intro |
| `content` | `string` | **Required**. Enter content |
| `writerName` | `string` | **Required**. Enter name |
| `writerIntro` | `string` | **Required**. Enter writers intro |
| `writerPic` | `img` | **Required**. Give writers picture |
| `timeStamp` | `string` | **Required**. Enter time stamp |
| `topicPic` | `img` | **Required**. Enter topics picture |
| `writerEmail` | `string` | **Required**. Enter writers email |

`getblogs:Id route`

```http  
  GET /getblogs:Id
```

**Description:** Get blog Id

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blogId` | `string` | **Required**. Enter blog id |

`acceptedBlogs route`

```http  
  GET /acceptedBlogs
```

**Description:** Accepted blogs
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blogId` | `string` | **Required**. Enter blog id |
| `email` | `string` | **Required**. Enter email |

`publishBlog:Id route`

```http 
  POST /publishBlog:Id
```

**Description:** Get blogs details

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blogId` | `string` | **Required**. Enter blog id |
| `email` | `string` | **Required**. Enter email id |
| `writerName` | `string` | **Required**. Enter writers name |
| `subject` | `string` | **Required**. Enter subject name |
| `text` | `string` | **Required**. Enter text |

`deleteBlog:Id route`

```http 
  DELETE /deleteBlog:Id
```

**Description:** Delete blog

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blogId` | `string` | **Required**. Enter blog id |
| `email` | `string` | **Required**. Enter email id |
| `writerName` | `string` | **Required**. Enter writers name |

`editBlog:blogId route`

```http 
  PUT /editBlog:blogId
```

**Description:** edit blog

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blogId` | `string` | **Required**. Enter blog id |
| `title` | `string` | **Required**. Enter the title |
| `tag` | `string` | **Required**. Enter the tag |
| `intro` | `string` | **Required**. Enter the intro |
| `content` | `string` | **Required**. Enter the content |
| `writerName` | `string` | **Required**. Enter the writer name |
| `writerIntro` | `string` | **Required**. Enter the writer intro |
| `writerPic` | `string` | **Required**. Enter the writer pic |
| `timestamp` | `string` | **Required**. Enter the time stamp |
| `topicPic` | `string` | **Required**. Enter the topic pic |
| `writerEmail` | `string` | **Required**. Enter the writer email |

`createBlog route`

```http 
  POST /createBlog 
```

**Description:** Create blog

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Enter email id |
| `subject` | `string` | **Required**. Enter subject name |
| `text` | `string` | **Required**. Enter text |

`myPublishedBlogs route`

```http 
  GET /myPublishedBlogs 
```

**Description:** Create blog

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Enter email id |

`publicWrittenBlog:authoruniqueid route`

```http 
  GET /publicWrittenBlog:authoruniqueid 
```

**Description:** public written blog

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blogId` | `string` | **Required**. Enter blog id |
| `title` | `string` | **Required**. Enter the title |
| `tag` | `string` | **Required**. Enter the tag |
| `intro` | `string` | **Required**. Enter the intro |
| `content` | `string` | **Required**. Enter the content |
| `writername` | `string` | **Required**. Enter the writer name |
| `writerintro` | `string` | **Required**. Enter the writer intro |
| `writerpic` | `string` | **Required**. Enter the writer pic |
| `timestamp` | `string` | **Required**. Enter the time stamp |
| `topicpic` | `string` | **Required**. Enter the topic pic |
| `writeremail` | `string` | **Required**. Enter the writer email |

`tagSpecificBlogList:tagName route`

```http 
  GET /tagSpecificBlogList:tagName
```

**Description:** tag tagSpecific BlogList

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blogId` | `string` | **Required**. Enter blog id |
| `title` | `string` | **Required**. Enter the title |
| `tag` | `string` | **Required**. Enter the tag |
| `intro` | `string` | **Required**. Enter the intro |
| `content` | `string` | **Required**. Enter the content |
| `writername` | `string` | **Required**. Enter the writer name |
| `writerintro` | `string` | **Required**. Enter the writer intro |
| `writerpic` | `string` | **Required**. Enter the writer pic |
| `timestamp` | `string` | **Required**. Enter the time stamp |
| `topicpic` | `string` | **Required**. Enter the topic pic |
| `writeremail` | `string` | **Required**. Enter the writer email |

`apiBlogs:blogId route`

```http  
  POST /apiBlogs:blogId
```

**Description:**api blogs

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Enter title |
| `tag` | `string` | **Required**. Enter tag |
| `intro` | `string` | **Required**. Enter intro |
| `content` | `string` | **Required**. Enter content |
| `topicPic` | `img` | **Required**. Enter topics picture |
| `writerName` | `string` | **Required**. Enter name |
| `writerIntro` | `string` | **Required**. Enter writers intro |
| `writerPic` | `img` | **Required**. Give writers picture |
| `writerEmail` | `string` | **Required**. Enter writers email |

`apiComment:postId route`

```http  
  GET /apiComment:postId
```

`apicomment:Id route`

```http  
  POST /apicomment:Id
```
**Description:** api comment 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `commentAuthor` | `string` | **Required**. Enter comment to author |
| `commentPic` | `string` | **Required**. Enter comment picture |
| `text` | `string` | **Required**. Enter text |
| `userId` | `string` | **Required**. Enter user id |

`allAccounts route`

```http  
  GET /allAccounts
```
**Description:** all accounts

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |
| `password` | `string` | **Required**. A password that you can remember |
| `bio` | `string` | **Required**. bio for dashboard |
| `userimg` | `string` | **Required**. user image for dashboard |
| `facebook` | `string` | **Required**. facebook account link |
| `github` | `string` | **Required**. github account link |
| `linkedin` | `string` | **Required**. linkedin account link |
| `instagram` | `string` | **Required**. instagram account link |
| `role` | `string` | **Required**. Enter the role  |
| `deleteAccount` | `string` | **Required**. Delete account |

`makeadmin:email route`

```http  
  GET /makeadmin:email
```
**Description:** make admin email

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |

``makeclient:email route`

```http  
  GET /`makeclient:email
```
**Description:** make client 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`EMAIL_ECELL`=`Email address for sending mails`

`EMAIL_PWD_ECELL`=`password for email service`

`MONGODBSECRET`=`mongodb+srv://username:password@cluster0.gfrng.mongodb.net/db_name`

`NODE_VERSION`= `v18.x`

`YOUR_SECRET_KEY`=`A strong secret key for user authentication`