const app = require("./app/app");

app.listen(process.env.PORT || 2003, function () {

  console.log(`Server Started on port ${process.env.PORT || 2003}`);

});