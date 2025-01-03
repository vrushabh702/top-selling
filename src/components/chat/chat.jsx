import React, { useEffect, useState } from "react"
import {
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { makeStyles } from "@mui/styles"
import { styled } from "@mui/system"
import axios from "axios"
import { FaCircle } from "react-icons/fa"
import io from "socket.io-client"

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
})

const socket = io("http://localhost:5000")

const Chat = () => {
  const classes = useStyles()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Axios for HTTP GET request
        const response = await axios.get("/assets/api/chatUser.json")

        // Axios returns the data directly in the response object
        setUsers(response.data)
      } catch (err) {
        // Handle errors from Axios (network errors, server errors, etc.)
        setError(err.message)
      } finally {
        // Set loading to false when the request is done
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server")
    })

    socket.on("receive_message", (message) => {
      if (
        message.recipient === selectedUser.id ||
        message.sender === selectedUser.id
      ) {
        console.log("Message received on client:", message)
        setMessages((prevMessages) => [...prevMessages, message])
      }
    })

    return () => {
      socket.off("receive_message") // Clean up the listener when the component unmounts
      socket.off("connect")
    }
  }, [selectedUser])

  const sendMessage = () => {
    if (inputMessage.trim() && selectedUser) {
      const message = {
        text: inputMessage,
        sender: "You", // Assuming 'You' is the logged-in user
        recipient: selectedUser.id,
        timestamp: new Date().toLocaleTimeString(),
      }
      socket.emit("send_message", message) // Send message to the server
      setMessages((prevMessages) => [...prevMessages, message]) // Update local messages
      setInputMessage("")
    }
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography>Error: {error}</Typography>
  }

  // Function to alternate men and women
  const alternateUsers = () => {
    const alternatingList = []
    const men = users.men
    const women = users.women
    const length = Math.max(men.length, women.length)

    for (let i = 0; i < length; i++) {
      if (men[i]) {
        alternatingList.push(men[i])
      }
      if (women[i]) {
        alternatingList.push(women[i])
      }
    }

    return alternatingList
  }

  const filteredUsers = alternateUsers().filter((user) =>
    (user.first_name + " " + user.last_name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        style={{ height: "80vh", width: "100%" }}
      >
        <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
          {selectedUser && (
            <List>
              <ListItem
                button
                key={selectedUser.first_name + selectedUser.last_name}
              >
                <ListItemIcon>
                  <Avatar
                    alt={selectedUser.first_name + " " + selectedUser.last_name}
                    src={selectedUser.image_path}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    selectedUser.first_name + " " + selectedUser.last_name
                  }
                ></ListItemText>
              </ListItem>
            </List>
          )}
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Divider />

          <List>
            {filteredUsers.map((user, index) => (
              <ListItem
                button
                key={user.first_name + " " + user.last_name + index}
                onClick={() => handleUserClick(user)}
              >
                <ListItemIcon>
                  <Avatar
                    alt={user.first_name + " " + user.last_name}
                    src={user.image_path}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={user.first_name + " " + user.last_name}
                />
                <ListItemText
                  secondary={<FaCircle className="text-success" />}
                  align="right"
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          {selectedUser && (
            <List style={{ height: "70vh", overflowY: "auto" }}>
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  className={message.sender === "You" ? "bg-light" : "bg-info"}
                >
                  <Grid container>
                    <Grid item xs={9}>
                      <ListItemText
                        align={message.sender === "You" ? "right" : "left"}
                        primary={message.text}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <ListItemText
                        align="right"
                        secondary={message.timestamp}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add" onClick={sendMessage}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat
