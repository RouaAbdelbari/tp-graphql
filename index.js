const fs = require('fs');
const path = require('path');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const app = express();

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'taskSchema.gql'),
  'utf8'
);

const resolvers = require('./taskResolver');

async function startServer() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}

startServer();