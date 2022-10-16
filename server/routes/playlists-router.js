/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)
router.delete('/deletePlaylist/:id', PlaylistController.deletePlaylistById)
router.put('/putPlaylistById/:id', PlaylistController.putPlaylistById)

router.post('/createSong/:id', PlaylistController.createSong)
router.delete('/removeSong/:id', PlaylistController.removeSong)
router.post('/editSong/:id/:index', PlaylistController.editSong)
router.delete('/deleteSong/:id/:index', PlaylistController.deleteSong)
router.post('/addDeleteSong/:id/:index', PlaylistController.addDeleteSong)
router.put('/moveSong/:id', PlaylistController.moveSong)

module.exports = router