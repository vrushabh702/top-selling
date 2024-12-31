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

const Chat = () => {
  const classes = useStyles()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null) // State to track selected user

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
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="../assets/images/chatUser/man1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Arjun Patel"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />

          <List>
            {alternateUsers().map((user, index) => (
              <ListItem
                button
                key={user.first_name + " " + user.last_name + index}
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
                <ListItemText secondary="online" align="right" />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1" className="bg-light">
              <Grid container>
                <Grid item xs={9}>
                  <ListItemText align="right" primary="Hey man, What's up ?" />
                </Grid>
                <Grid item xs={9}>
                  <ListItemText align="right" secondary="09:30" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2" className="bg-info">
              <Grid container>
                <Grid item xs={9}>
                  <ListItemText
                    align="left"
                    primary="Nothing, Just Neflix and Chill !"
                  />
                </Grid>
                <Grid item xs={9}>
                  <ListItemText align="left" secondary="09:32" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3" className="bg-light">
              <Grid container>
                <Grid item xs={9}>
                  <ListItemText
                    align="right"
                    primary="Which series you looking now. "
                  />
                </Grid>
                <Grid item xs={9}>
                  <ListItemText align="right" secondary="09:33" />
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
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
