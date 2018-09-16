import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import schema from './schema';

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://<url>/graphql-tutorial', { 
    useNewUrlParser: true 
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connection to database is successful');
})

const server = new ApolloServer({ 
    schema,
    playground: {
        endpoint: `http://localhost:4000/graphql`,
        settings: {
          'editor.theme': 'light'
        }
    }
});

server.applyMiddleware({ app });

app.listen(4000, () => {
    console.log('listening on the port 4000');
});