import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { transparent } from "material-ui/styles/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Divider
} from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: "100%",
    background: "#FFFFFF"
  },
  Grid: {
    marginTop: "15px",
    background: "#F3F3F3"
  },
  Divider: {
    width: "100%",
    marginTop: "10px"
  },
  buttonIcon: {
    background: transparent,
    height: "100%",
    color: "#253257",
    width: "100%",
    "&:hover": {
      background: transparent
    }
  },
  buttonAddIcon: {
    background: transparent,
    color: "#253257",
    marginTop: "15px",
    "&:hover": {
      background: transparent
    }
  },
  div: {
    marginLeft: "10px"
  },
  div2: {
    marginTop: "10px",
    marginLeft: "10px"
  },
  buttonPrincipal: {
    background: "#253257",
    color: "white",
    height: 48,
    width: "15%",
    marginRight: "25px",
    marginBottom: "25px",
    "&:hover": {
      background: "#E9E9E9",
      color: "#253257"
    }
  },
  buttonSecundario: {
    background: "#F2C26A",
    color: "white",
    height: 48,
    width: "15%",
    marginRight: "25px",
    marginBottom: "25px",
    "&:hover": {
      background: "#F2C26A",
      color: "#253257"
    }
  },
  buttonIcon: {
    background: transparent,
    height: 48,
    marginRight: "25px",
    marginBottom: "25px",
    "&:hover": {
      background: transparent
    }
  },
  title: {
    color: "#253257",
    fontSize: "130%",
    marginLeft: "1%",
    marginTop: "1%"
  },
  Divider: {
    width: "100%",
    marginTop: "10px"
  },
  Button: {
    fontSize: "100%",
    color: "#253257",
    "&:hover": {
      color: "#F2C26A",
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
      //o Grid contem o spacing ele refere-se ao espaco entre os grids
      <Fragment>
        <Button onClick={this.handleSubmit} className={classes.buttonAddIcon}>
          <AddIcon />
          &nbsp;&nbsp;Adicionar complemento
        </Button>
        <div className={classes.div}>
          <Grid container spacing={2} className={classes.Grid}>
            <Grid item xs={12} sm={10}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={"Descrição do complemento"}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                onClick={this.handleSubmit}
                className={classes.buttonIcon}
              >
                {" "}
                <DeleteIcon />
                &nbsp;&nbsp;Excluir complemento
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={"Qtd. min."}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={"Máx."}
              />
            </Grid>
            <Grid item xs={12} sm={3} container justify="center">
              <FormControlLabel
                name="ativo"
                control={
                  <Switch
                    value={this.state.ativo}
                    color="primary"
                    onChange={this.handleChecked}
                    onChange={event =>
                      this.setState({ ativo: event.target.value })
                    }
                  />
                }
                label={"Complemento obrigatório"}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.div2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={"Item do complemento"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={"Descrição"}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={"R$"}
              />
            </Grid>
            <Grid item xs={12} sm={2} container justify="center">
              <Button
                onClick={this.handleSubmit}
                className={classes.buttonAddIcon}
              ><PauseCircleOutlineIcon /></Button>
              <Button
                onClick={this.handleSubmit}
                className={classes.buttonAddIcon}
              ><DeleteIcon /></Button>
            </Grid>
          </Grid>
          <Divider className={classes.Divider} light={true} />
          <Button onClick={this.handleSubmit} className={classes.buttonAddIcon}>
            <AddIcon />
            &nbsp;&nbsp;Adicionar item
          </Button>
          <Divider className={classes.Divider} light={true} />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CadastroCardapio);
