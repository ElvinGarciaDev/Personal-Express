# 🐉 Project: Keep track of House of the Dragon characters

<img width="800" alt="Screen Shot 2022-10-31 at 8 02 49 PM" src="https://user-images.githubusercontent.com/91163017/199131957-6f0fa6b2-c5fb-4c1a-a843-6c9ae92c20bf.png">

<img width="500" alt="Screen Shot 2022-10-31 at 8 03 19 PM" src="https://user-images.githubusercontent.com/91163017/199131963-556e24cf-e794-49a9-b935-095bd70cca20.png">


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB, EJS

Users are able to keep track of HOD characters by submitting the form. When the form is submitted a POST request is sent with all the information from the form. The character details are stored in MongoDB and then rendered using EJS. Users are able to remove characters by selecting the trash can icon. Users can also update any specific field on any character by going to the form, adding the character name and any field they want to update. 

## Lessons Learned:

The most difficult part of this project was allowing the user to update a character. I was able to accomplish this by having the user enter the character's name and on the backend removing any empty strings that came with the request.body. 



## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `npm run dev`
2. Navigate to `localhost:8000`
