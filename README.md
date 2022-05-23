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
    
5 - Create .env file in the the ``root`` folder with the content:

    DATABASE_URL="postgresql://postgres:docker@localhost:5432/sucasa"    

6 -  You can ``start`` the project with following command:

    yarn dev
    
7 -  Finally, you can ``access`` the api at the address:

    http://localhost:3001

# API endpoints

These endpoints allow you to create a new presentation with a speaker, create attendes and link attendes to presentations.

## GET
`/presentations`<br/>

## POST
`/presentation`<br/>
`/attendees`<br/>

## PUT
`/presentations`/:presentation_id/attendees/:attendee_email<br/>

### GET /presentations
Get the list of all presentations created

**Parameters**

`none`

**Response**

```
[
	{
		"id": "073f7947-d797-4056-8a47-ede78328547c",
		"details": "Blockchain",
		"room": 12,
		"speaker": {
			"name": "Renan"
		},
		"attendees": [
			{
				"name": "Diego Junges",
				"email": "diego@email.com"
			},
			{
				"name": "Alina",
				"email": "alina@email.com"
			}
		]
	}
]


or implemented error

{
    "error": "No presentation was found in the database"
}
```

### POST /presentation
Create a new presentation

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `details` | required | string  | The details of the presentation.                                                                     |
|     `room` | required | string  | The room of the presentation.                                                                     |
|     `speaker` | required | json  | The speaker who will make the presentation. <br/><br/> Supported properties: `name`, `email`, `company`, `bio`. <br/><br/> Properties types: `string`.                                                                     |

**Response**

```
{
	"id": "25323c27-fed9-4717-9356-f3d4e2a686fa",
	"details": "Blockchain",
	"room": 11,
	"speakerId": "6449fbc8-c6ec-45e8-85f6-0827d3413c02"
}


or implemented error

{
    "error": "Presentation cannot be created in the database"
}
```

### POST /ateendees
Create a new ateendee

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `name` | required | string  | The ateendee name.                                                                     |
|     `email` | required | string  | The ateendee email.     
|     `company` | required | string  | The ateendee company.                                                                     ||

**Response**

```
{
	"id": "28a9da17-6217-4224-8272-2d4ba53cf5f8",
	"name": "Suana",
	"company": "Alchemy",
	"email": "ateendee@email.com",
	"registered": "2022-05-23T18:16:31.305Z",
	"updated_at": "2022-05-23T18:16:31.306Z",
	"attendeeId": null
}


or implemented error

{
    "error": "Attendee cannot be created in the database"
}
```

### PUT /presentations/:presentation_id/attendees/:attendee_email
Add a speaker to a presentation

**Parameters**

`name`

**Response**

```
{
	"message": "Attendee successfully added to presentation",
}


or implemented error

{
    "error": "Attendee with email example@email.com does not exist in the database"
}
```
