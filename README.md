# events-backend

## Technologies used

- Node
- Docker
- Prisma
- PostgreSQL
- Express
- Typescript

## Configuration

API: https://sucasa-backend.herokuapp.com

To run locally:

0 - Clone the project by running the command:

    git clone https://github.com/keepact/events-backend.git

1 - From the ``root`` folder, you have to install all the project dependecies with the command:

    yarn

2 - Now, from the ``root`` folder, to turn on the postgre database you have to run:

    docker compose up
    
3 - Migrate prisma models with command:

    npx prisma migrate dev 
    
4 - To finalize the prisma settings, run:

    npx prisma generate 
    
5 - Finally, to start the project run:

    yarn dev    

6 -  Now, you can ``access`` the api at the address:

    http://localhost:3001
