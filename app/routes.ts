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

import App from './controller/app';
import Download from './controller/download';

const router = new Router({
  prefix: '/server',
});

// // GraphQL
// router.all('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

// RESTful
router
  .get('/index', App.index)
  .get('/checkForUpdates', App.checkForUpdates)
  // http://localhost:9999/server/download?fileName=bundle.zip&platform=ios&moduleFolder=main&isIncrementalPacket=true
  .get('/download', Download.download);

export default router;
