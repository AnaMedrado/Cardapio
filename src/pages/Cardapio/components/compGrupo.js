import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ItemGrupo from "../components/compItensGrupo";
import CompCadastro from "../components/compCadastro";
import { transparent } from "material-ui/styles/colors";
import AuthService from "../../../AuthService";
 

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,IconButton,
  ListItemText,
  ListItem,
  ExpansionPanelActions,
  Button
} from "@material-ui/core";

const styles = theme => ({
  title: {
    color: "#253257",
    fontSize: "120%"
  },
  subTitle: {
    marginLeft: "12px",
    marginRight: "12px"
  },
  buttonPrincipal: {
    background: transparent,
    color: "#253257",
    "&:hover": {
      background: transparent,
    }
  },
  space:{ 
    marginRight: "5px",
  }
});

class Cardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grupos: [],
      produtosPorGrupo: {}
    };
    this.updateCallback = props.updateCallback
  }

  async componentDidMount() {
    this.handleListGrup()
  }

  handleAlter(event, grupo) {
    event.preventDefault()
    event.stopPropagation()
    console.log("Solicitando edicao do grupo")
    console.log(grupo)
    this.updateCallback(grupo)
  }

  handleListGrup() {
    let service = new AuthService();
    service
      .fetch("/grupoProduto/list")
      .then(retorno => {
        this.setState({ grupos: retorno }); 
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

   
  
  handleListProdutosPorGrupo(grupo) {
    console.log(grupo); 

    const { produtosPorGrupo } = this.state

    let service = new AuthService();
    service
      .fetch(`/produto/listByGrupo/${grupo.id}`)
      .then(retorno => {
       
        produtosPorGrupo[`${grupo.id}`] = retorno;
        this.setState({ produtosPorGrupo: produtosPorGrupo }); 

        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /*
  handleClick(grupo, grupoid, grupoPausado){
    console.log(grupoid, grupoPausado);
    let service = new AuthService();
    service
      .post(`grupoProduto/pausar/${grupoid}/${grupoPausado}`)
      .then(retorno => {
        grupo.pausado = !grupoPausado;
        this.setState({grupo: grupo})
        console.log('pausar');
      }) 
    this.handleListGrup()
  } */

  handleClickPausar(event, grupo){ 
    console.log("Pausar produto clicado")
    event.preventDefault();
    event.stopPropagation();

    let service = new AuthService();
    service
      .post(`grupoProduto/pausar/${grupo.id}/${!grupo.pausado}`)
      .then(retorno => {
        grupo.pausado = !grupo.pausado;
        this.setState({grupo: grupo})
        console.log('pausar');
      }).catch(err => {
        console.error("Falha ao pausar/startar grupo", err)
      }) 

      return false;
    //this.handleListGrup()
  }

  render() {
    const { classes } = this.props;
    const { grupos, produtosPorGrupo} = this.state;
     

    return (
      <div className="App">
         {grupos.map(grupo => (
        <ExpansionPanel key={grupo.id}>

          <ExpansionPanelSummary onClick={(event) => {  this.handleListProdutosPorGrupo(grupo);  }}
            expandIcon={<ExpandMoreIcon />}
          >
            <ListItem>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography color="textPrimary" className={classes.title}>
                      <strong>{grupo.descricao}</strong>
                    </Typography>
                  </React.Fragment>
                }
              />
              <Button edge="end"  color={grupo.pausado ? "primary": "secondary"} onClick={(event) =>{ this.handleClickPausar(event, grupo) }}>
                <Typography>
                    {grupo.pausado ? "Pausar vendas": "Iniciar vendas"} 
                </Typography>
                {grupo.pausado ? ( 
                  <PauseCircleOutlineIcon/>   
                ) : (
                  <PlayCircleOutlineIcon/>
                )}
              </Button>
            </ListItem>
            <Button edge="end" className={classes.buttonPrincipal} onClick={ (event) => this.handleAlter(event, grupo)} >
                <Typography color="textSecundary" className={classes.subTitle} >
                  Editar
                </Typography>
            </Button>
          
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
             
          {  
            (produtosPorGrupo[grupo.id] != null ? produtosPorGrupo[grupo.id] : [] ).map(produto => (
            <ItemGrupo  
              key={produto.id} 
              produto={produto}
              listProdutos={() => (produto)} 
              
              grupo={grupo} 
              getGrupo={() => (grupo)}  />
           ))
          }
          
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <CompCadastro key={grupo.id} grupo={grupo}  getGrupo={() => (grupo)} />
          </ExpansionPanelActions>
        </ExpansionPanel>
         ))}
      </div>
    );
  }
}

export default withStyles(styles)(Cardapio);
