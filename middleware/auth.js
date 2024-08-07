import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.user = decodedData;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized", error: error });
  }
};

export default auth;
