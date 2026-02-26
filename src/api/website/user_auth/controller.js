//website dashboard
export const dashboard = async (req, res) => {
  return res.render("website/index");
};

//login
export const userLogin = async (req, res) => {
  try {
    if (req.method === "POST") {
      //
    }
    return res.render("website/pages/login");
  } catch (error) {}
};

//register
export const registerUser = async () => {
  try {
    if (req.method === "POST") {
    }
    return res.render("website/pages/regiter");
  } catch (error) {}
};
