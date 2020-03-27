import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { transparent } from "material-ui/styles/colors";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import {
  ListItemIcon,
  IconButton,
  Typography,
  Container,
} from "@material-ui/core";

const styles = theme => ({
  div: {
    background: "#F3F3F3",
    marginTop: "20px"
  },
  Typography: {
    marginLeft: "10px",
    marginRight: "20px",
    color: "#253257"
  },
  Container: {
    marginTop: "10px",
    marginBottom: "10px"
  },
  Button: {
    fontSize: "100%",
    color: "#253257",
    "&:hover": {
      background: transparent
    }
  }
});

class CadastroCardapio extends Component {
  state = {
    open: false
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.div}>
          <Container fixed className={classes.Container}>
            <ListItemIcon>
              <IconButton className={classes.Button}>
                <PauseCircleOutlineIcon />
                <Typography className={classes.Typography}>
                  <strong>Pausar</strong>
                </Typography>
              </IconButton>
              <Typography className={classes.Typography}>
                Para pausar as vendas desse item, clique no botão ao lado. Se o
                botão estiver habilitado, o item não aparecerá no seu menu de
                pratos no aplicativo.
              </Typography>
            </ListItemIcon>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CadastroCardapio);
