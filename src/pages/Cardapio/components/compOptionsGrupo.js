import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import "../styles.css";

import { transparent } from "material-ui/styles/colors";

import {
  TextField,
  Typography,
  ListItemText,
  ListItem,
  ListItemIcon,
  IconButton,
  Button,
  Grid,
  Divider
} from "@material-ui/core";

const styles = theme => ({
  title: {
    color: "#253257"
  },
  subTitle: {
    marginLeft: "5px",
    marginRight: "5px"
  },
  iconButton: {
    marginRight: "15px",
    "&:hover": {
      background: transparent
    }
  },
  textField: {
    width: "100px"
  },
  divButton: {
    alignItems: "end"
  },
  Divider: {
    marginRight: "2%",
    marginLeft: "1%"
  },
  Typography: {
    fontSize: "12px",
    marginRight: "2%",
    marginLeft: "1%"
  },
  TypographyTitle: {
    fontSize: "15px",
    marginBottom: "5px"
  }
});

class Cardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.card}>
        <ListItem>
          <Typography color="textSecondary" className={classes.TypographyTitle}>
            Escolha sua batata
          </Typography>
        </ListItem>

        <Grid>
          <Divider className={classes.Divider} light={true} />
        </Grid>

        <ListItem>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  color="textSecondary"
                  className={classes.Typography}
                >
                  Batata frita
                </Typography>
              </React.Fragment>
            }
          />
          <ListItemIcon>
            <ListItem>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={"R$"}
              />
            </ListItem>

            <IconButton edge="end" className={classes.iconButton}>
              <PauseCircleOutlineIcon />
              <Typography color="textSecundary" className={classes.subTitle}>
                Pausar vendas
              </Typography>
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(Cardapio);