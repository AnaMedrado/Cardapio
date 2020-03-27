import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AuthService from "../../AuthService";
import { withSnackbar } from "notistack";
import Logo from "../../imagens/LogoVersao2Azul.svg";

import { Button, Card, Grid, TextField } from "@material-ui/core";

const styles = theme => ({
  card: {
    margin: "100px auto",
    maxWidth: "600px"
  },
  textField: {
    width: "80%",
    marginTop: "25px"
  },
  buttonPrincipal: {
    background: "#253257",
    color: "white",
    borderRadius: 50,
    height: 48,
    width: "40%",
    marginTop: "30px",
    "&:hover": {
      background: "#E9E9E9",
      color: "#253257"
    }
  },
  buttonSecundario: {
    color: "#253257",
    marginBottom: "60px",
    "&:hover": {
      color: "#253257",
      background: "transparent"
    }
  },
  img: {
    width: "30%",
    marginTop: "10%",
  }
});

class SignIn extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  handleLogin = (msg, options) => {
    this.key = this.props.enqueueSnackbar(msg, options);
  }

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
          <Card className={classes.card}>
            <form>
              <Grid>
                <Grid container justify="center">
                   <img className={classes.img} src={Logo} />
                </Grid>
                <Grid container justify="center">
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    name="username"
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Senha"
                    type="password"
                    variant="outlined"
                    name="password"
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <Button
                    value="submit"
                    type="submit"
                    onClick={this.handleFormSubmit}
                    className={classes.buttonPrincipal}
                  > ENTRAR</Button>
                </Grid>
                <Grid container justify="center">
                  <Button
                    className={classes.buttonSecundario}
                    href={"/cadastro"}
                  >Cadastrar-se </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </React.Fragment>
    );
  }

  //handleChange método que define os valores de entrada para o estado do componente.
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // para evitar que se permaneça na tela de login caso ja esteja logado na aplicação
  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  //chamando o método de login que criamos no serviço de autenticação.
  //Se logarmos com sucesso, seremos redirecionados para a página inicial,
  //que protegeremos com nosso componente de ordem superior posteriormente.
  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.handleLogin('Login realizado com sucesso', {variant: 'success'})
        this.props.history.replace("/Cardapio");
      })
      .catch(err => {
        if (err.response == undefined){
          this.handleLogin('Falha ao se comunicar com servidor', {variant: 'error'});
        }else{
          err.response.json().then(elem => {
            console.log(elem);
            this.handleLogin(elem.errorMessage, {variant: 'error'});
            //alert(elem.errorMessage);
          });
        }
        
      });
  }

}

export default withSnackbar( withStyles(styles)(SignIn) );
