import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Container, Typography } from "@material-ui/core";
import Menu from "../../components/Menu";
import CompPedidos from "./components/compPedidos";

const styles = theme => ({
  card: {
    width: "140%",
    marginTop: "100px"
  },
  title: {
    marginTop: "10%",
    fontSize: "200%",
    color: "#253257"
  },
  subTitle: {
    marginBottom: "30px"
  }
});

class Pedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Container fixed>
          <Menu/>
          <Typography className={classes.title}>
            <strong>PEDIDOS</strong>
          </Typography>
          <Typography color="textSecondary" className={classes.subTitle}>
            Veja aqui os pedidos feitos em seu restaurante. Nesta página você pode também cancelar pedidos.
          </Typography>
          <CompPedidos/>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Pedidos);
