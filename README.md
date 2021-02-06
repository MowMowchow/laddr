# Laddr
API routes:
  - There is only one API route, '/get_data'
    - This route expects one field (named 'field') in the JSON request body
    - The body of the response contains information regarding the field send in the request
      - The returned JSON is formatted as such:

Building / Running Laddr:
  - Laddr requires two commands, assuming the user already has Node.js installed (if not,    The official Node.js download page: https://nodejs.org/en/download/)
  - The first command is to download all of the required dependencies.
  - The second command is to build and run the web application
  - Please run these two commands and wait for them to finish executing in order to avoid   any errors:
    - npm run install-all
    - npm run dev
