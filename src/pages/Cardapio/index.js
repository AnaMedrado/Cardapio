import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import Menu from "../../components/Menu";
import GrupoProdutos from "./components/compGrupo";
import "../Cardapio/styles.css";
import CadastroGrupo from "./components/compCadastroGrupo";
import { Card, Container, Typography, Grid} from "@material-ui/core";

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

class Cardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.cadastroGrupoRef = React.createRef()
    this.listGrupoRef = React.createRef()
  }

  updateComponent(grupo) {
    this.cadastroGrupoRef.current.update(grupo)
  }

  listComponent() {
    this.listGrupoRef.current.handleListGrup()
  }

  setEditarGrupo(){
    console.log("editando um grupo XXX")
  }

  setGrupoEditadoComsucesso(){
    console.log("grupo editado com sucesoooo XXX")
  }

  render() {
    const { classes } = this.props;
    return (

      <div className="App">
        <Menu />

        <Container fixed>
        
          <Typography className={classes.title}>
            <strong>CARDÁPIO</strong>
          </Typography>
          <Typography color="textSecondary" className={classes.subTitle}>
            Seu cardápio ativo é o que aparecerá para seus clientes. Aqui você
            pode inserir itens, complementos e opcionais, definir
            disponibilidade e alterar preços.
          </Typography>
          <Grid container justify="flex-end">
            <CadastroGrupo ref={this.cadastroGrupoRef} 
              listUpdateCallback={() => this.listComponent()} 
              setGrupoEditadoComsucesso={this.setGrupoEditadoComsucesso.bind(this)} />
          </Grid>
            <GrupoProdutos  ref={this.listGrupoRef} 
              updateCallback={(grupo) => this.updateComponent(grupo)}  
              setEditarGrupo={this.setEditarGrupo.bind(this)}  />
        </Container>
        
      </div>
    );
  }
}

export default withStyles(styles)(Cardapio);
