/* JWT token */

import jwt from "jsonwebtoken";

const token = jwt.sign(
    { id: user.id, role: user },
    JWT_SECRET,
    { expiresIn: "5m" }
)

export default token;