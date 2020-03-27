import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import "../styles.css";
import { transparent } from "material-ui/styles/colors";
import AuthService from "../../../AuthService";
import CompAlterCadastroProduto from "./compAlterCadastroProduto";

import {
  TextField,
  Typography,
  ListItemText,
  ListItem,
  ListItemIcon,Button,
  ExpansionPanelSummary,
  ExpansionPanel,
} from "@material-ui/core";

const styles = theme => ({
  title: {
    fontSize: "120%"
  },
  subTitle: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  iconButton: {
    marginRight: "15px",
    "&:hover": {
      background: transparent
    }
  },
  textField: {
    width: "100px"
  },
  buttonPrincipal: {
    background: transparent,
    color: "#707070",
    "&:hover": {
      background: transparent,
    }
  },
});

class Cardapio extends Component {
  constructor(props) {
    super(props);
    
    this.produto = props.produto
    this.grupo = props.grupo

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick( produtoid, produtoPausado){
    console.log(produtoid, produtoPausado);
    produtoPausado = !produtoPausado
    let service = new AuthService();
    service
      .post(`produto/pausar/${produtoid}/${produtoPausado}`)
      .then(retorno => {
        console.log('pausar');
      }) 
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.card}>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography color="textSecondary" className={classes.title}  >
                    <strong>{this.produto.nome}</strong>
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                <Typography color="textSecondary" className={classes.title}  >
                  R$ {this.produto.preco}
                </Typography>
              </React.Fragment>
              }
                />
            <ListItemIcon>
              <Button edge="end" className={classes.buttonPrincipal} onClick={() => this.handleClick( this.produto.id, this.produto.pausado)}>
                {this.produto.pausado ? ( 
                  <PauseCircleOutlineIcon/>   
                ) : (
                  <PlayCircleOutlineIcon/>
                )}
              </Button>
              <CompAlterCadastroProduto 
              key={this.produto.id} produto={this.produto}
              listProdutos={() => (this.produto.id)}/>
            </ListItemIcon>
          </ExpansionPanelSummary>
          {/* <ExpansionPanelDetails>
           <OptionGrup />
          </ExpansionPanelDetails>*/}
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Cardapio);
