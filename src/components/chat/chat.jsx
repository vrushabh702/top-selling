import React from "react"
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
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
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
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp"></ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>

            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Komal"></ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>

            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="pooja"></ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>

            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Suraj"></ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
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
