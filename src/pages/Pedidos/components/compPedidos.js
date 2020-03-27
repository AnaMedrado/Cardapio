import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Card, Grid, TextField, Button} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import MaterialTable from 'material-table';
import AuthService from "../../../AuthService";

import "../styles.css";
import {
  Typography,Divider
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";

const styles = theme => ({
  card: {
    width: "140%",
    marginTop: "100px"
  },
  textField: {
    width: "100%",
    marginTop: "10px",
    background: "#FFFFFF"
  },
  Grid: {
      marginLeft: "3%",
      marginTop: "2%",
  },
  GridCard:{
      marginLeft: "3%",
      marginTop: "2%",
      marginBottom: "2%",
  },
  buttonPrincipal: {
    background: "#253257",
    color: "white",
    marginTop: "10px",
    width: "100%",
    height: "55px",
    "&:hover": {
      background: "#E9E9E9",
      color: "#253257"
    }
  },
  divider: {
    marginTop: "18px",
  },
  Card: {
    marginTop: "18px",
    marginRight: "18px",
    marginLeft: "18px",
    marginBottom: "18px",
  }
});

class Pedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: [],
    };
  }

  async componentDidMount() {
    this.handleListPedido()
  }
  

  handleListPedido() {
    let service = new AuthService();
    service
      .fetch("/pedido/list")
      .then(retorno => {
        console.log(retorno);

        this.setState({ pedidos: retorno }); 
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    const { classes } = this.props;
    const { pedidos } = this.state;

    return (
      <div className="App">
        <Card fixed>
          <Grid container spacing={2} className={classes.Grid}>
            <Grid item  sm={1}>
              <TextField
                    className={classes.textField}
                    variant="outlined"
                    label={"Mesa"}
              />
            </Grid>
            <Grid item  sm={4}>
              <TextField
                    className={classes.textField}
                    variant="outlined"
                    label={"Nome"}
              />
            </Grid>
            <Grid item sm={2}> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    margin="normal"
                    className={classes.textField}
                    inputVariant="outlined"
                    label="Data e hora inicial"
                />
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={2}> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    margin="normal"
                    className={classes.textField}
                    inputVariant="outlined"
                    label="Data e hora final"
                />
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={2}> 
            <Button
                onClick={this.handleSubmit}
                className={classes.buttonPrincipal}
                >FAZER PESQUISA
            </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Divider className={classes.divider}/>
          </Grid>

          <Card className={classes.Card}>
          <Grid container spacing={2} className={classes.Grid} >
            <Grid item  sm={1}>
              <Typography>Mesa</Typography>
            </Grid>
            <Grid item  sm={2}>
              <Typography>Data</Typography>
            </Grid>
            <Grid item sm={3}> 
            <Typography>Nome</Typography>
            </Grid>
            <Grid item sm={2} container justify="flex-end"> 
            <Typography>Valor</Typography>
            </Grid>
            <Grid item sm={1} container justify="flex-end"> 
            <Typography>Cancelar</Typography>
            </Grid>
            <Grid item sm={1} container justify="flex-end"> 
            <Typography>Descrição</Typography>
            </Grid>
            <Grid item sm={1} 
            container justify="flex-end"> 
            <Typography>Fechar</Typography>
            </Grid>
          </Grid>
          
         <div>
          <Grid item xs={12} sm={12}>
            <Divider className={classes.divider}/>
          </Grid>
          <Card className={classes.Card}>
            <Grid container spacing={2} className={classes.GridCard} >
              <Grid item  sm={1}>
                <Typography>{pedidos.identificador}</Typography>
              </Grid>
              <Grid item  sm={2}>
                <Typography>Data</Typography>
              </Grid>
              <Grid item sm={3}> 
              <Typography>{pedidos.descricao}</Typography>
              </Grid>
              <Grid item sm={2} container justify="flex-end"> 
              <Typography>Valor</Typography>
              </Grid>
              <Grid item sm={1} container justify="flex-end"> 
              <Typography>Cancelar</Typography>
              </Grid>
              <Grid item sm={1} container justify="flex-end"> 
              <Typography>Descrição</Typography>
              </Grid>
              <Grid item sm={1} 
              container justify="flex-end"> 
              <Typography>Fechar</Typography>
              </Grid>
            </Grid>
          </Card>
          </div>
          </Card>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(Pedidos);
