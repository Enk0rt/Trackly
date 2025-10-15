This is a goals and habits tracking system Trackly. 
Project developed with following stack of technologies:
- Next.js v15
- TypeScript
- React Hook Form v7
- Tanstack Query
- Tailwind v4
- Node.js v22
- Express v5
- MongoDB
- Zod
- Docker + Nginx
- SwaggerUI (for documentation)

## Getting Started

#### Import postman collection from repo to desktop app to have access to backend routes
#### 1. Install all the required node modules

```bash
cd frontend 

npm i

cd ..

cd backend

npm i
```

#### 2. Build and run the containers

Run command below from project root directory

```bash
docker compose up --build backend frontend-prod nginx
```

Open [http://localhost](http://localhost) with your browser to see the result.

### API documentation provided

Once backend container is up, open [http://localhost/api/docs](http://localhost/api/docs) to read available docs

### Additional information 

#### - For admins
To change users amount on a page open settings and use either buttons (plus/minus) or set the number to input 

#### - Environment settings (.env file)

- Set up email login and app password in an empty fields of backend `.env file` for making email-verify and pass-recovery sending service available

  `EMAIL_USER=`

  `EMAIL_PASSWORD=`

- If you don`t make the step above you will get the following error: 


  `Something went wrong, try again later`

Due to this error you won`t be able to sign up a new user, because email service will be unavailable


<img width="1921" height="951" alt="image" src="https://github.com/user-attachments/assets/d4a3431f-9f3e-4da5-85e4-4cc369cfea44" />
<img width="1902" height="950" alt="image" src="https://github.com/user-attachments/assets/ed776c65-60d8-4a4b-868d-fb062fe16989" />
<img width="1906" height="954" alt="image" src="https://github.com/user-attachments/assets/4f529a52-43cb-420a-8926-f86487cdc7e6" />
<img width="1905" height="945" alt="image" src="https://github.com/user-attachments/assets/d5a7af7b-593f-4260-8b95-833608a2ae18" />
<img width="1905" height="950" alt="image" src="https://github.com/user-attachments/assets/cb918c43-2f64-4837-b618-f37ffdfcfeb2" />
<img width="1906" height="947" alt="image" src="https://github.com/user-attachments/assets/b11b98d9-48a1-45db-835e-facfaa6e6f2d" />
<img width="1902" height="953" alt="image" src="https://github.com/user-attachments/assets/cd548247-7c7e-46b5-81c5-a1071fd4fd63" />
<img width="1918" height="947" alt="image" src="https://github.com/user-attachments/assets/a1e82100-a2d6-4ad5-b655-d8a2422f1525" />
<img width="1912" height="945" alt="image" src="https://github.com/user-attachments/assets/4a1157a5-9c96-45d1-8c30-83d5549f9879" />
<img width="1916" height="946" alt="image" src="https://github.com/user-attachments/assets/841084a0-efc0-498b-8c46-4a3f79bb1bea" />
<img width="1919" height="952" alt="image" src="https://github.com/user-attachments/assets/f0f36911-261a-4daa-9372-d0a6b68ff7fb" />
<img width="1914" height="950" alt="image" src="https://github.com/user-attachments/assets/6e0188f6-4349-4169-b63a-3feddcd0b453" />
<img width="1914" height="950" alt="image" src="https://github.com/user-attachments/assets/90c6777b-4380-462e-ac7d-a73962285277" />




