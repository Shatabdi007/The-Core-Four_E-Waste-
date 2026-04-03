## SudhaarSetu
Smart E-Waste Management & Repair Ecosystem

 ## Overview
SudhaarSetu is a full-stack web application designed to promote sustainable electronics usage by enabling users to:
1-  Estimate repair costs
2- Find nearby repair centers
3- Schedule e-waste pickup
4- Track repair history (Repair Passport)
5- Get assistance via Sudhaar Bot

The platform encourages repair over replacement, reducing electronic waste and supporting a circular economy.

## Key Features
1- Repair Estimator
Get instant cost estimates for device repairs
Supports mobile, laptop, and appliances
2- Repair Center Locator
Find nearby repair shops
Filter by services (mobile, laptop, appliance)
Map + list view integration
3- E-Waste Pickup Booking
Schedule doorstep pickup
Email confirmation system
Admin notification system
4- Repair Passport
Stores device repair history
Tracks lifecycle of devices
5- Sudhaar Bot
AI-like chatbot for user assistance
Answers queries about repair, booking, and features
6- Safe Disposal Tips
Educates users on proper e-waste disposal
Promotes eco-friendly practices

## Tech Stack

1- Frontend
React.js
Tailwind CSS
Leaflet (maps)
Axios

2- Backend
Node.js
Express.js
MongoDB (Mongoose)
Nodemailer (email service)

3- Other Tools
dotenv (environment variables)
Capacitor (optional mobile support)

## Project Structure
SudhaarSetu/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.js
│
├── backend/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── sendemail.js
│   └── .env

 ## Installation & Setup
1️. Clone the repository
git clone https://github.com/your-username/sudhaarsetu.git
cd sudhaarsetu
2️. Backend Setup
cd backend
npm install

Create .env file:
MONGO_URI=your_mongodb_connection_string
MAIL_USER=yourgmail@gmail.com
MAIL_PASS=your_app_password
PORT=5000

Run backend:
npm start

3️. Frontend Setup
cd frontend
npm install
npm start

Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
MAIL_USER	Gmail address
MAIL_PASS	Gmail App Password
PORT	Server port

## Future Enhancements
1.SMS notifications
2. Analytics dashboard
3. AI-powered chatbot
4. Mobile app (via Capacitor)
5. PDF receipts for bookings

## Impact
1. Reduces e-waste pollution
2.Encourages sustainable consumption
Supports local repair businesses
Promotes circular economy

## Contributors
Shatabdi  Singh
Samridhi Tyagi
Saloni Teotia
Ashutosh Rai

## License
This project is for educational and sustainability purposes.

## Tagline
"Repair. Reuse. Reduce. — Building a Sustainable Future with SudhaarSetu "

