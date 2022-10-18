/*
    This is our http api, which we use to send requests to
    our back-end API. Note we're using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it's a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE'LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /playlist). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const getAllPlaylists = () => api.get(`/playlists`)
export const getPlaylistPairs = () => api.get(`/playlistpairs`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const deletePlaylistById = (id) => api.delete(`/deletePlaylist/${id}`)
export const putPlaylistById = (id, playlist) => api.put(`/putPlaylistById/${id}`, playlist)

export const createSong = (id) => api.post(`/createSong/${id}`)
export const removeSong = (id) => api.delete(`/removeSong/${id}`)
export const editSong = (id, index, song) => 
  api.post(`/editSong/${id}/${index}`, 
    {   
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId
    }
  )

export const deleteSong = (id, index) => api.delete(`/deleteSong/${id}/${index}`)

export const addDeleteSong = (id, index, song) => 
  api.post(`/addDeleteSong/${id}/${index}`, 
    {   
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId
    }
  )

export const moveSong = (id, req) => api.put(`/moveSong/${id}`, req)

export const createPlayList = () =>
  api.post("/playlist", {
    name: "Untitled",
    songs: [],
  });

const apis = {
    getAllPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    createPlayList,
    deletePlaylistById,
    putPlaylistById,
    createSong,
    removeSong,
    editSong,
    deleteSong,
    addDeleteSong,
    moveSong,
}

export default apis
