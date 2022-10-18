const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(200)
                .json({ success: true, idNamePairs: []})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

deletePlaylistById = async (req, res) => {
    await Playlist.deleteOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true})
    }).catch(err => console.log(err))
}

putPlaylistById = async (req, res) => {
    const name = req.body.name;
    await Playlist.findByIdAndUpdate({ _id: req.params.id }, {name}, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true})
    }).catch(err => console.log(err))
}

createSong = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        let rickRoll = {title: "Untitled", artist: "Unknown", youTubeId: "dQw4w9WgXcQ"};
        list.songs.push(rickRoll)
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Song Created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Created!',
                })
            })
    }).catch(err => console.log(err))
}

removeSong = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        let removedSong = list.songs.pop();
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    song: removedSong,
                    message: 'Song Removed!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Removed!',
                })
            })
    }).catch(err => console.log(err))
}

editSong = async (req, res) => {
    const body = req.body;
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a song',
            })
        }
        const index = req.params.index;

        let newSong = {title: body.title, artist: body.artist, youTubeId: body.youTubeId};

        list.songs[index] = newSong;

        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Song Edited!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Edited!',
                })
            })
    }).catch(err => console.log(err))
}

deleteSong = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        let deletedSong = list.songs.splice(req.params.index, 1)[0];
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    song: deletedSong,
                    message: 'Song Deleted!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Song Not Deleted!',
                })
            })
    }).catch(err => console.log(err))
}

addDeleteSong = async (req, res) => {
    const body = req.body;
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a deleted song',
            })
        }
        const index = req.params.index;

        let deletedSong = {title: body.title, artist: body.artist, youTubeId: body.youTubeId};

        list.songs.splice(index, 0, deletedSong);

        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Deleted Song Added!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Deleted Song Not Added!',
                })
            })
    }).catch(err => console.log(err))
}

moveSong = async (req, res) => {
    let body = req.body.start;
    let body2 = req.body.end;
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a song to move',
            })
        }
        let start = body;
        let end = body2;

        // start -= 1;
        // end -= 1;
        // console.log(start)
        // console.log(end)
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }
        
        list.markModified("songs");
        list
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    playlist: list,
                    message: 'Move Song Successful!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Move Song Unsuccessful!',
                })
            })
    }).catch(err => console.log(err))
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    deletePlaylistById,
    putPlaylistById,
    createSong,
    removeSong,
    editSong,
    deleteSong,
    addDeleteSong,
    moveSong,

}