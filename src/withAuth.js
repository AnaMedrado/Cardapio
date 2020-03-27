import React, { Component } from "react";
import AuthService from "./AuthService";

export default function withAuth(AuthComponent) {
  const Auth = new AuthService("http://localhost:8080/qrpedir");

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      };
    }

    //Primeiro verificamos se estamos logados (),
    //que verificam o token do localStorage.
    //Em seguida, decodificamos o token para que possamos
    //configurá-lo para o nosso estado. Se não conseguirmos
    //decodificá-lo, redirecionaremos para a página de login.
    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    //verificando se o usuário existe e passando o usuário para o componente.
    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}
