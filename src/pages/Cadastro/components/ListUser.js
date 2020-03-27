import React, { Component } from "react";
import "../styles.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AuthService from "../../../AuthService";
import withStyles from "@material-ui/styles/withStyles";
import { withSnackbar } from "notistack";

import {
  ListItemText,
  ListItem,
  Typography,
  ListItemIcon,
  Card,
  IconButton
} from "@material-ui/core";


const styles = theme => ({
  card: {
    marginBottom: "10px",
  },
});


class ListUser extends Component {
  state = {
    users: [] 
  };

  //componetDidMount() instância o service do AuthService,
  //chamando o servico fetch, passando pra ela a url da requisição,
  //a url é montada com o token e a partir dela é feita
  //a requisição retornando a tring com so dados em JSON
  //caso ocorra algum erro é impresso no console o erro !
  async componentDidMount() {
    this.listar()
  }

  listar() {
    let service = new AuthService();
    service
      .fetch("/usuario/list")
      .then(retorno => {
        this.setState({ users: retorno }); 
        console.log(this.state.users);
      })
      .catch(err => {
        //em caso de erro é impresso o erro no console.
        console.log(err);
      });
  }

  handleDelete(user){
    let service = new AuthService();
    service
      .delete(`usuario/${user.id}`)
      .then(retorno => {
    
        user.ativo = false;
        this.setState({user: user})
    
        this.props.enqueueSnackbar('Usuário inativado com sucesso',  {variant: 'info'})
    }) 
  }

  render() {
    //passa a classe de style para a chamada de classes, podendo chamar
    //pelo className
    const { classes } = this.props;
    const { users } = this.state;
      
    return (
      <div>
        {users.map(user => (
          <Card className={classes.card} key={user.id}>
          <ListItem >
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography color="textPrimary">{user.username}</Typography>
                </React.Fragment>
              }
              secondary="NOME DO USUÁRIO"
            />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography color="textPrimary">{user.ativo ? "ativo": "inativo"}</Typography>
                </React.Fragment>
              }
              secondary="STATUS DO USUÁRIO"
            />
            <ListItemIcon >
              <IconButton edge="end"  onClick={() => this.props.handleAlter(user.id)}>
                <EditIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemIcon>
              <IconButton edge="end"  onClick={() => this.handleDelete(user)}>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          </Card>
        ))}
      </div>
    );
  }
}

export default withSnackbar( withStyles(styles)(ListUser) );
