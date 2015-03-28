import express from 'express'
import usersCtrl from './controllers/users-ctrl'
import teamsCtrl from './controllers/teams-ctrl'
import activityCtrl from './controllers/activity-ctrl'
import sseMiddleware from './middlewares/sse-response'
import authMiddleware from './middlewares/authentication'
import passport from 'passport'

var router = express.Router()

router.get('/users', usersCtrl.index)
router.post('/users', usersCtrl.create)
router.put('/users', authMiddleware.tokenAuth, usersCtrl.update)
router.get('/users/search', authMiddleware.tokenAuth, usersCtrl.search)
router.post('/login', authMiddleware.passwordAuth, usersCtrl.token)
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }))
router.get('/login/facebook-oauth2callback', passport.authenticate('facebook', { successRedirect: '/',
                                                                                 failureRedirect: '/',
                                                                                 session: false }))

router.get('/activity', authMiddleware.tokenAuth, activityCtrl.index)
router.put('/activity', authMiddleware.tokenAuth, activityCtrl.update)
router.post('/activity', authMiddleware.tokenAuth, activityCtrl.create)
router.get('/activity/:activityId', authMiddleware.tokenAuth, activityCtrl.show)
router.get('/activity/:activityId/messages', authMiddleware.tokenAuth, activityCtrl.messageIndex)
router.post('/activity/:activityId/messages', authMiddleware.tokenAuth, activityCtrl.createMessage)
router.get('/activity/:activityId/messages/stream', sseMiddleware, activityCtrl.streamMessages)

router.get('/teams', authMiddleware.tokenAuth, teamsCtrl.index)
router.get('/teams/:teamId', authMiddleware.tokenAuth, teamsCtrl.show)
router.post('/teams', authMiddleware.tokenAuth, teamsCtrl.create)

// TODO For testing only
router.get('/debug/teams', teamsCtrl.debug)
router.get('/debug/activity', authMiddleware.tokenAuth, activityCtrl.debug)
router.get('/token', authMiddleware.tokenAuth, authMiddleware.stub)

export default router
