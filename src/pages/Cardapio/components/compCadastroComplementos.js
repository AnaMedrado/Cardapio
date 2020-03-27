import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import img from "../../../imagens/imgComplemento.svg";
import { Button, Grid, Typography } from "@material-ui/core";

const styles = theme => ({
  buttonPrincipal: {
    background: "#253257",
    color: "white",
    height: 48,
    fontSize: "110%",
    width: "25%",
    marginRight: "25px",
    "&:hover": {
      background: "#E9E9E9",
      color: "#253257"
    }
  },
  img: {
    marginTop: "2%",
    width: "100%",
  }
});

class CadastroCardapio extends Component {
  state = {
    open: false
  };

  render() {
    const { classes } = this.props;

    return (
      <div  justify="center">
        <Grid container spacing={4} className={classes.Grid}>
          <Grid item xs={12} sm={12}>
            <img src={img} className={classes.img} />
          </Grid>
          <Grid item xs={12} sm={12} container justify="center">
            <Typography className={classes.Typography} color="textSecondary">
              Aqui você pode cadastrar complementos, como qual tipo de batata
              vai ir no combo ou qual a bebida.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} container justify="center">
            <Button
              onClick={this.handleSubmit}
              className={classes.buttonPrincipal}
            >ADICIONAR CATEGORIA </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(CadastroCardapio);
