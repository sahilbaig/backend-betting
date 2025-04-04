import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });

        req.user = user;
        next();
    });
};

export default authenticateJWT;