import express from 'express'
import usersCtrl from './controllers/users-ctrl'
import teamsCtrl from './controllers/teams-ctrl'
import activityCtrl from './controllers/activity-ctrl'
import sseMiddleware from './middlewares/sse-response'
import { passwordAuth, tokenAuth, OAuth2 } from './middlewares/authentication'
import passport from 'passport'

var router = express.Router()

router.get('/users', tokenAuth, usersCtrl.index)
router.post('/users', usersCtrl.create)
router.put('/users', tokenAuth, usersCtrl.update)
router.get('/users/search', tokenAuth, usersCtrl.search)

router.post('/login', passwordAuth, usersCtrl.token)
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.profile.emails.read'] }))
router.get('/login/facebook-oauth2callback', OAuth2('facebook'), usersCtrl.redirectWithToken)
router.get('/login/google-oauth2callback', OAuth2('google'), usersCtrl.redirectWithToken)

router.get('/activity', tokenAuth, activityCtrl.index)
router.put('/activity', tokenAuth, activityCtrl.update)
router.post('/activity', tokenAuth, activityCtrl.create)
router.get('/activity/:activityId', tokenAuth, activityCtrl.show)
router.get('/activity/:activityId/messages', tokenAuth, activityCtrl.messageIndex)
router.post('/activity/:activityId/messages', tokenAuth, activityCtrl.createMessage)
router.get('/activity/:activityId/messages/stream', sseMiddleware, activityCtrl.streamMessages)

router.get('/teams', tokenAuth, teamsCtrl.index)
router.get('/teams/:teamId', tokenAuth, teamsCtrl.show)
router.post('/teams', tokenAuth, teamsCtrl.create)
router.put('/teams', tokenAuth, teamsCtrl.update)

// TODO For testing only
router.get('/debug/teams', teamsCtrl.debug)
router.get('/debug/activity', tokenAuth, activityCtrl.debug)

export default router
