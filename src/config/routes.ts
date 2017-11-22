/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
// import graphqlHTTP from 'koa-graphql';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
// import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import App from '../app/controllers/app';

const router = new Router({
  prefix: '/pages',
});

// // GraphQL
// router.all('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

// RESTful
router.get('/index', App.index);

module.exports = router;
