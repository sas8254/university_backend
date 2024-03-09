# University Website Backend

This is a backend system for a university website that allows for the management of multiple colleges and students using Node.js and MongoDB. The website includes two types of login options, one for colleges and one for students.

With a student login, students can upload their projects and view their project status. With a college login, colleges can view the projects submitted by all students enrolled in that particular college and accept or reject them. Colleges can also enroll or add new students to their college using the website. Project files are uploaded on cloudinary.

The website is designed to be secure, with authentication and authorization implemented using JSON Web Tokens (JWT) to restrict access to certain endpoints based on the user's role and ID. Passwords are hashed and salted using bcrypt before being stored in the database to improve security.

## Technologies Used

- Node.js
- MongoDB
- Express.js
- bcrypt
- JSON Web Tokens (JWT)
- multer
- clouninary (for project uploads)

## Installation & Setup

1. Clone this repo on your local machine
2. Install the dependencies:
3. Create a `.env` file in the root directory and fill in your environment variables

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
DB_URL=your_mongodb_atlas_database_url
SECRET=your_personal_secret
```

4. Start the server:

5. Visit `http://localhost:3100` in your browser

## Features

- Authentication and authorization using JSON Web Tokens (JWT)
- Two types of login options: college login and student login
- College login allows colleges to view and manage projects submitted by students enrolled in that college
- Student login allows students to upload and view the status of their projects
- File upload functionality using multer middleware on cloudinary.
- Efficient and flexible management of large amounts of data using MongoDB

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
