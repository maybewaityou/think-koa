/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as bodyParser from 'koa-bodyparser';
// import graphqlHTTP from 'koa-graphql';
import * as Router from 'koa-router';

import App from '../app/controllers/app';
import Download from '../app/controllers/download';

const router = new Router({
  prefix: '/server',
});

// // GraphQL
// router.all('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

// RESTful
router.get('/index', App.index);
router.get('/checkForUpdates', App.checkForUpdates);
router.get('/download', Download.download);

export default router;
