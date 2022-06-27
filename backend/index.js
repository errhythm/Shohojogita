const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const eventRouter =  require('./routes/Events')
app.use("/events",eventRouter);

const commentRouter =  require('./routes/Comments')
app.use("/comments",commentRouter);

const usersRouter =  require('./routes/Users')
app.use("/auth",usersRouter);

const allusersRouter =  require('./routes/AllUsers')
app.use("/allusers",allusersRouter);

const reportsRouter = require('./routes/Reports');
app.use("/reports",reportsRouter);

const donationsRouter =  require('./routes/Donations')
app.use("/donations",donationsRouter);


app.listen(3001,()=>{
    console.log("Server Running");
});

