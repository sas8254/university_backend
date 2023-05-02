# University Website Backend

This is a backend system for a university website that allows for the management of multiple colleges and students using Node.js and MongoDB. The website includes two types of login options, one for colleges and one for students. 

With a student login, students can upload their projects and view their own project status. With a college login, colleges can view the projects submitted by all students enrolled in that particular college and accept or reject them. Colleges can also enroll or add new students to their college using the website.

The website is designed to be secure, with authentication and authorization implemented using JSON Web Tokens (JWT) to restrict access to certain endpoints based on the user's role and ID. Passwords are hashed and salted using bcrypt before being stored in the database to improve security.

## Technologies Used

- Node.js
- MongoDB
- Express.js
- bcrypt
- JSON Web Tokens (JWT)
- multer

## Getting Started

To get started, clone this repository and install the required dependencies using `npm install`. You will also need to set up a MongoDB database and obtain a Spoonacular API key, which can be used to retrieve recipe data based on user input.

## Features

- Authentication and authorization using JSON Web Tokens (JWT)
- Two types of login options: college login and student login
- College login allows colleges to view and manage projects submitted by students enrolled in that college
- Student login allows students to upload and view the status of their projects
- File upload functionality using multer middleware
- Efficient and flexible management of large amounts of data using MongoDB

## Contributing

Contributions to this project are welcome. If you find a bug or have a feature request, please open an issue on this repository. If you would like to contribute code, please fork this repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
