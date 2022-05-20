require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

//Connect to DB
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@smartlearning.7kayr.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Connect to DB successfully !!!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB();
//use middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth/', authRouter);
app.use('/api/posts/', postRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));
