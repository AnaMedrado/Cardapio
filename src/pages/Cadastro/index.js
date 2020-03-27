import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CadastroPessoa from "./components/formUser";
import FormEmpresa from "../Cadastro/components/formEmpresa";
import Menu from "../../components/Menu";
import withStyles from "@material-ui/styles/withStyles";

import {
  Grid,
  Card,
  Container,
  Typography,
} from "@material-ui/core";


const themeDark = createMuiTheme({
  palette: {
    primary: { main: "#253257" },
    secondary: { main: "#FFFFFF" }
  }
});

const styles = theme => ({
 card: {
    minWidth: 275,
    marginTop: "100px"
  },
  title: {
    marginTop: "3%",
    fontSize: "200%",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "100%",
    textAlign: "center"
  },
});


class ListUser extends Component {

  constructor(props){
    super(props)

    this.state = {
      users : []
    }
  }

  render() {
    //passa a classe de style para a chamada de classes, podendo chamar
    //pelo className
    const { classes } = this.props;
    const { users } = this.state;
    return (
    <div className="App">
      <Menu />
      <ThemeProvider theme={themeDark}>
          <Container fixed >
            <Card className={classes.card}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography className={classes.title} color="primary">
                    Conta da empresa
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    color="textSecondary"
                  >
                    Edite os dados da empresa ou seus usuários
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={1} />
                <FormEmpresa />
                <CadastroPessoa />
                <Grid item xs={12} sm={9} />
              </Grid>
            </Card>
          </Container>
      </ThemeProvider>
    </div>
    );
  }
}

export default withStyles(styles)(ListUser);
