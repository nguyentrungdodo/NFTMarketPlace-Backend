const mediaRoute = require("./media");
const userRoute = require("./user");
const blogRoute = require('./blog');
function route(app) {
  app.use(`/media`, mediaRoute);
  app.use(`/user`, userRoute);
  app.use(`/blog`, blogRoute);
}

module.exports = route;
