

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authUser;

