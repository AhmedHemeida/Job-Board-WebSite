const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
           req.id = decoded.id;
              req.username = decoded.username;
                req.photo = decoded.photo;
                req.JobTitle = decoded.JobTitle

        next();
    });
}

module.exports = authMiddleware;
