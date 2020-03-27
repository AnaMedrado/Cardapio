import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import ComponenteListaUser from "./ListUser";
import AuthService from "../../../AuthService";
import { withSnackbar } from "notistack";
import "../styles.css";

import {
  Divider,
  Switch,
  Grid,
  Button,
  Typography,
  TextField,
  FormControlLabel
} from "@material-ui/core";

const styles = theme => ({
  title: {
    fontSize: "120%",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "100%",
    textAlign: "center",
    marginTop: "5px"
  },
  divider: {
    marginTop: "18px"
  },
  textField: {
    width: "100%"
  },
  buttonPrincipal: {
    background: "#253257",
    color: "white",
    borderRadius: 10,
    height: 48,
    width: "100%",
    marginTop: "5px",
    "&:hover": {
      background: "#E9E9E9",
      color: "#253257"
    }
  }
});

class formUser extends Component {
  //constructor, responsavel por chamar os metodos de contrução da classe
  //como o state que gera o estado de componete, para manter metodos como,
  //handleChange eles precisam ser intanciados dentro do contructor.

  constructor(props){
    super(props);
    //Cada elemento de input que você terá em seu component
    //formulário assumirá o valor de state como seu valor.
    this.state = {
      users: [],
      user: {
        username: '',
        password: '',
        ativo: true
      }
    };
    this.listaUsers = React.createRef()
    //"chamam" os metodos
    this.handleChange =  this.handleChange.bind(this);
    this.handleChecked =  this.handleChecked.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
    this.handleAlter =  this.handleAlter.bind(this);
  }

  blankUser() {
    return {
      username: '',
      password: '',
      ativo: true
    }
  }

  //responsavel por pegar os dados setados em tela pelo name do campo
  //e joga-los dentro do state
  handleChange(event){
    const { user } = this.state;
    user[event.target.name] =  event.target.value;
    this.setState({ user: user })
  }

  //handleChecked é responsavel por receber o status de checked do botão
  //status de usuário e jogar seu stauts dentro do state junto com seu name
  handleChecked(event){
    const { user } = this.state;
    user[event.target.name] =  event.target.checked;
    this.setState({ user: user })
  }

  //O handleSubmit tem sua ativação pelo button e 
  //seta as informações do state para salva-las.
  handleSubmit(event) {
    
    const { user } = this.state;
    console.log(user)
    
    //verifica se o id veio indefinido, vem indefinido quando 
    //o item é novo, devido o id ser setado na API, entao ele 
    //salva como novo usuario, caso nao seja ele apenas edita !
    let service = new AuthService();
    service
      .post("/usuario", user)
      .then(retorno => {
        console.log("salvarUser")
        
        console.log(retorno.data)
        this.setState({ user: this.blankUser() })

        
        this.props.enqueueSnackbar('Usuário salvo com sucesso',  {variant: 'info'})

        this.listaUsers.current.listar()
      }).catch(err => {

        if (err.response == undefined){
          this.props.enqueueSnackbar('Falha ao tentar salvar usuário', {variant: 'error'});
        }else{
          err.response.json().then(elem => {
            console.log(elem);
            this.props.enqueueSnackbar('Falha ao salvar usuário ' + elem.errorMessage, {variant: 'error'});
            
          });
        }
      })
    
  }

  //O handleAlter pega o usuario pelo Id a partir de Callbacks
  //lista pelo id pego da classe filha 
  handleAlter(idUser) {
    let service = new AuthService();
    service
      .fetch(`usuario/${idUser}`)
      .then(retorno => {
        this.setState({ user: retorno }); 
        console.log(this.state.user);
      })
      .catch(err => {
        //em caso de erro é impresso o erro no console.
        console.log(err);
      });
}
  
  render() {
    //passa a classe de style para a chamada de classes, podendo chamar
    //pelo className
    const { classes } = this.props;
    const { users } = this.state;
    const { user } = this.state;
    return (
      //o Form é nescessário para poder fazer a validação dos campos
      <form ref={this.rfmForm}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={4}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography className={classes.title} color="textSecondary">
            Dados dos usuários
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.textField}
            variant="outlined"
            label={"Nome do usuário"}
            name="username"
            value={user.username}
            onChange= {event => this.handleChange(event)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            className={classes.textField}
            variant="outlined"
            label={"Senha"}
            name="password"
            value={user.password}
            //o prop onChange que será executado toda vez que o valor de entrada for alterado.
            onChange={ event => this.handleChange(event) }
          />
        </Grid>
        <Grid item xs={12} sm={3} container justify="center">
        <FormControlLabel
          name="ativo"
          control={
            <Switch
              checked={user.ativo}
              color="primary"
              onChange= {event => this.handleChecked(event) }
            /> }
            label={"Status do usuário"} />
        </Grid>
        <Grid item xs={12} sm={1}>
        <Button
          className={classes.buttonPrincipal}
          value="teste"
          onClick={e => this.handleSubmit(e)}
        > {" "}  + </Button>
        </Grid>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={1}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography className={classes.subtitle} color="textSecondary">
            Usuários cadastrados
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10}>
          <ComponenteListaUser  
          handleAlter={(idUser) => this.handleAlter(idUser)}  
          ref={this.listaUsers}/>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={12} />
      </Grid>
      </form>
    );
  }
}
export default withSnackbar( withStyles(styles)(formUser) );
