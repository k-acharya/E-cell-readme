
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
  GET /
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

`Login route`

```http
  POST /signup
```

**Description:** login to user account

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for account creation |
| `password` | `string` | **Required**. A password that you can remember |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`EMAIL_ECELL`=`Email address for sending mails`

`EMAIL_PWD_ECELL`=`password for email service`

`MONGODBSECRET`=`mongodb+srv://username:password@cluster0.gfrng.mongodb.net/db_name`

`NODE_VERSION`= `v18.x`

`YOUR_SECRET_KEY`=`A strong secret key for user authentication`
