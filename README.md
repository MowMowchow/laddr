# Laddr
API routes:
  - There is only one API route, '/get_data'
    - This route expects one field (named 'field') in the JSON request body
    - The body of the response contains information regarding the field send in the request
    - Below is an example of what a response body would look like:
        ```JSON
        {
        "female": [
            {
                "Education_Level": "Career, Technical, Professional Training Certificate",
                "Annual_Income": 29400
            }
        ],
        "male": [
            {
                "Education_Level": "Career, Technical, Professional Training Certificate",
                "Annual_Income": 32500
            }
        ],
        "total": [
            {
                "Education_Level": "Career, Technical, Professional Training Certificate",
                "Annual_Income": 29700
            }
        ]
      }
      ```

Building / Running Laddr:
  - Laddr requires two commands, assuming the user already has Node.js installed (if not,    The official Node.js download page: https://nodejs.org/en/download/)
  - The first command is to download all of the required dependencies
  - The second command is to build and run the web application
    ~
  - The steps to run Laddr are as follows:
    - Make sure that the ports ```http://localhost:3000/``` and ```http://localhost:3001/``` are not being used
    - Extract the zip into a new directory (let us call the folder "laddr")
    - Open a terminal in the new directory (laddr) and make sure that the directory contains a folder named "client"
    - Run the following two commands in the terminal and wait for them to finish executing in order to avoid any errors:
      1) ```npm run install-all```
      2) ```npm run dev```
