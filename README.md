## system diagram

![Untitled-2023-08-13-1411](https://github.com/user-attachments/assets/5f30da8d-a241-44a7-97fd-fa2479379062)


## How To Start The System 

## 1-> clone the repository

`git clone https://github.com/RAHUL14KUMAR/paymentSystem.git`

## 2-> install the dependencies

run- `npm install`


## 3-> add .env file in the root directory

takes 2 things

`MONGO_URI` AND `SECRET_KEY`

## 4-> start the server

run `npm start`

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

## how we can start system using `Docker`

## 1-> Add `.env` file in the `root directory ` which takes 2 things

`MONGO_URI` AND `SECRET_KEY`

## 2-> Create a  `volume` to be named as `payVolume`

`docker volume create payVolume`

## 3-> build the image 

`docker build -t paySystem .`

## 4-> run the container

`docker run -v payVolume:/app --env-file ./.env paySystem`
