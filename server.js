import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from "jsonwebtoken"
import authenticateJWT from './middlewares/authenticateJWT.js';

// Load environment variables
config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(passport.initialize())

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            const user = { id: profile.id, name: profile.displayName, email: profile.emails[0].value };
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
            return done(null, { user, token });
        }
    )
)

// Import routes
import apiRoutes from './routes/apiRoutes.js';
app.use('/api', apiRoutes);
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    res.json(req.user);
});

app.get("/abcd", authenticateJWT, (req, res) => {
    res.json({ message: "This is a protected route" });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});