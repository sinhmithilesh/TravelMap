import React, { useEffect, useState } from 'react'
import './App.css'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LocationOn, Star } from '@mui/icons-material'
import { format } from 'timeago.js'
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2luaDIwOTUiLCJhIjoiY2w4eng4dW5jMHQ5OTNub2lnazU5ZmppNyJ9.yYsZ1tClWbrOozTdJW2Wig'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [pins, setPins] = useState([])
  const [currentplaceId, setCurrentPlaceId] = useState(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [rating, setRating] = useState(0)
  const [newPlace, setNewPlace] = useState(null)
  const [viewport, setViewport] = useState({
    height: '100vh',
    width: '100vw',
    longitude: 78.0421,
    latitude: 27.1751,
    zoom: 6,
  })

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await fetch('http://localhost:8087/api/pins')
        const pins = await response.json()
        setPins(pins)
      } catch (err) {
        console.log(err)
      }
    }
    getPins()
  }, [])

  const handleMarkerClick = (pinId, lat, long) => {
    setCurrentPlaceId(pinId)
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }

  const handleAddClick = (e) => {
    const { lat, lng } = e.lngLat
    setNewPlace({ lat, lng })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !desc || !rating) {
      alert('all fields are required')
      return
    }
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    }
  
    try {
      const response = await fetch('http://localhost:8087/api/pins', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPin),
      })
      const data = await response.json()
      if(data){
         setPins([...pins, data])
      }
      setNewPlace(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Map
      className="map"
      initialViewState={{
        longitude: viewport.longitude,
        latitude: viewport.latitude,
        zoom: 6,
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: viewport.width, height: viewport.height }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
    >
      {pins?.map((pin) => (
        <div key={pin._id}>
          <Marker
            latitude={pin.lat}
            longitude={pin.long}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <LocationOn
              style={{
                fontSize: viewport.zoom * 7,
                color: pin.username === currentUser ? 'tomato' : 'slateBlue',
                cursor: 'pointer',
              }}
              onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
            />
          </Marker>
          {pin._id === currentplaceId && (
            <Popup
              key={pin._id}
              latitude={pin.lat}
              longitude={pin.long}
              closeButton={true}
              closeOnClick={false}
              anchor="bottom"
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{pin.title}</h4>
                <label>Review</label>
                <p className="desc">{pin.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  {Array(pin.rating).fill(<Star className="star" />)}
                </div>
                <label>Informatio</label>
                <span className="username">
                  Created by <b> {pin.username}</b>
                </span>
                <span className="date">
                  {format(pin.createdAt)} <b> {pin.username}</b>
                </span>
              </div>
            </Popup>
          )}
        </div>
      ))}

      {/* when user double click on map to add new place */}
      {newPlace && (
        <Popup
          latitude={newPlace?.lat}
          longitude={newPlace?.lng}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Review</label>
              <textarea
                placeholder="say something about this place"
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">
                Add Pin
              </button>
            </form>
          </div>
        </Popup>
      )}
      {currentUser ? 
        (  <button className='button logout'>Log out</button>) 
        : 
        (  <div className='initial-btn'>
        <button className='button login'>Login</button>
        <button className='button register'>Register</button>
      </div>)}   
    </Map>
  )
}
