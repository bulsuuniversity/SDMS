First thing first. Make sure you have installed node js version 16+ and git. 

Open you vs code and do the following

1. Click clone repository and you will be prompted to the file manager. Create a folder in the desktop
to be noticed directly or any file directory that have less files. Name it to SDMS or any name you like for the project. Click save or Okay.
2. press ctrl+shift+p or cmd+shift+p and paste this to the prompt: https://github.com/bulsuuniversity/SDMS.git
3. Open terminal then navigate to the local directtory where you created the folder earlier using cd then enter this: npm i
4. create .env file then paste the following:

gmailusername = bulsubulacanuniversity@gmail.com
gmailpassword = tlyrevkbecrwwpjj
gmailappPassword = rirgwoicyyoohjxz

DATABASE_URL = "mongodb+srv://bulsubulacanuniversity:IN3xkw1Cp7C5hCYT@cluster0.5bvmwdy.mongodb.net/bulsu"

mongodbPassword = IN3xkw1Cp7C5hCYT
mongodbUsername = bulsubulacanuniversity

CLOUDINARY_API_SECRET = "WXE0cHogu5zyl62a_Bxfe_4SK7g"
CLOUDINARY_CLOUD_NAME = "df9trcyks"
CLOUDINARY_API_KEY = "187851431242187"

NEXTAUTH_URL=http://localhost:3000
URL = http://localhost:3000
NEXT_PUBLIC_URL = http://localhost:3000

5. enter this to the terminal npm run dev




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Database

I used mongodb for the the database. Visit https://www.mongodb.com/ for more Information.

Step 1: Create a MongoDB Atlas Account
Go to the MongoDB Atlas website.
Click the "Get started free" button and follow the registration process to create an account.
Once logged in, click "Build a Cluster" to create a new MongoDB cluster. Follow the prompts and select the settings that suit your project.
Step 2: Whitelist Your IP Address
In the MongoDB Atlas dashboard, go to "Network Access" under the "Security" section.
Click the "Add IP Address" button and choose "Add Current IP Address" to allow your current IP to access the cluster.
You can also choose to allow access from any IP address for development purposes.
Step 3: Create a Database User
In the MongoDB Atlas dashboard, go to "Database Access" under the "Security" section.
Click the "Add New Database User" button.
Create a new user with the necessary permissions. Make sure to remember the username and password you set.
Step 4: Connect to Your Cluster
Go to the "Clusters" section in the MongoDB Atlas dashboard.
Click the "Connect" button for your cluster.
Select "Connect Your Application."
Copy the connection string provided. You will need this in your Next.js application.
Step 5: Install Prisma
In your Next.js project folder, install Prisma using npm or yarn:

bash

npm install prisma --save-dev
# or
yarn add prisma --dev
Step 6: Initialize Prisma
In your Next.js project folder, run the following command to initialize Prisma:
bash

npx prisma init
Follow the prompts to configure your database connection. Use the MongoDB connection string from MongoDB Atlas when asked.
Step 7: Generate Prisma Client
Run the following command to generate the Prisma client:
bash

npx prisma generate

npx prisma db push


## Set up Cloudinary

Step 1: Create a Cloudinary Account
Go to the Cloudinary website and sign up for an account.
Once you've created an account, log in to your Cloudinary dashboard.
Step 2: Obtain Your Cloudinary API Credentials
In your Cloudinary dashboard, click on "Console" in the top right corner.
Under the "Account Details" section, you'll find your Cloud Name, API Key, and API Secret. Note these credentials down, as you'll need them in your Next.js application.
Step 3: Install Cloudinary SDK
In your Next.js project folder, install the Cloudinary SDK using npm or yarn:

bash

npm install cloudinary --save

# or
yarn add cloudinary
Step 4: Configure Cloudinary in Your Next.js Application
Create a .env.local file in the root of your Next.js project to store your Cloudinary API credentials. Add the following entries to the file:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Replace your_cloud_name, your_api_key, and your_api_secret with the values obtained from your Cloudinary dashboard.

Step 5 Create folders named 


Best Regards,
Aaron
