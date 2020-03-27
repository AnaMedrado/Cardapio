import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import {
  Grid,
  TextField,
} from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: "100%"
  },
  Grid: {
    marginTop: "15px"
  }
});

class CadastroCardapio extends Component {
  constructor(props){
    super(props);
    this.state = {
      produto:{}
    };
    this.handleChange =  this.handleChange.bind(this);
  }

  handleChange(event){
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
    console.log(this.state)
  }

  render() {
    const { classes } = this.props;
    const { produto } = this.state;

    return (
      //o Grid contem o spacing ele refere-se ao espaco entre os grids
      <Fragment>
        <Grid container spacing={4} className={classes.Grid}>
          <Grid item xs={12} sm={5}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label={"Nome"}
              name="nome"
              value={produto.nome}
              onChange= {event => this.handleChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label={"Preço"}
              name="preco"
              value={produto.preco}
              onChange= {event => this.handleChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label={"Categoria"}
              name="grupoProduto"
              value={produto.grupoProduto}
              onChange= {event => this.handleChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label={"Descrição"}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Ficha técnica e ingredientes"
              className={classes.textField}
              multiline
              variant="outlined"
              rows="4"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label={"Advertências"}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CadastroCardapio);
