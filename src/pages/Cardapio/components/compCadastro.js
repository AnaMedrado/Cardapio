import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import AuthService from "../../../AuthService";
import { withSnackbar } from "notistack";
import { transparent } from "material-ui/styles/colors";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import CompPauseAndStart from "../components/compPauseAndStart";

import {
  Button,Dialog,DialogActions,DialogContent,ListItem,ListItemText,Typography,
  Divider,FormControlLabel,Switch,Grid,TextField,} from "@material-ui/core";

const styles = theme => ({
  textFieldDetalhes: {
    width: "100%"
  },
  GridDetalhes: {
    marginTop: "15px"
  },
  buttonPrincipal: {
    background: "#253257",
    color: "white",
    height: 48,
    width: "15%",
    marginRight: "25px",
    marginBottom: "25px",
    "&:hover": {
      background: "#E9E9E9",
      color: "#253257"
    }
  },
  buttonSecundario: {
    background: "#F2C26A",
    color: "white",
    height: 48,
    width: "15%",
    marginRight: "25px",
    marginBottom: "25px",
    "&:hover": {
      background: "#F2C26A",
      color: "#253257"
    }
  },
  buttonIconDelete: {
    background: transparent,
    height: 48,
    marginRight: "25px",
    marginBottom: "25px",
    "&:hover": {
      background: transparent
    }
  },
  title: {
    color: "#253257",
    fontSize: "130%",
    marginLeft: "1%",
    marginTop: "1%"
  },
  Divider: {
    width: "100%",
    marginTop: "10px"
  },
  Button: {
    fontSize: "100%",
    color: "#253257",
    "&:hover": {
      color: "#F2C26A",
      background: transparent
    }
  },  textField: {
    width: "100%",
    background: "#FFFFFF"
  },
  Grid: {
    marginTop: "15px",
    background: "#F3F3F3"
  },
  Divider: {
    width: "100%",
    marginTop: "10px"
  },
  buttonIcon: {
    background: transparent,
    height: "100%",
    color: "#253257",
    width: "100%",
    "&:hover": {
      background: transparent
    }
  },
  buttonAddIcon: {
    background: transparent,
    color: "#253257",
    marginTop: "15px",
    "&:hover": {
      background: transparent
    }
  },
  div: {
    marginLeft: "10px"
  },
  div2: {
    marginTop: "10px",
    marginLeft: "10px"
  },
});

class CadastroCardapio extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      produto:{   
        grupoProduto:[],
        ativo: true,
        pausado: true,
      },
      grupos:[],
    };
  
    this.grupo = props.grupo
    this.handleChange =  this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.handleAddChangeGrupo()
    this.handleListGroup()
  }

  //responsavel por salvar os dados do produto, setando no 
  //state os campos dentro do array de produto
  handleChange(event){
    const tempProduto = this.state.produto
    tempProduto[event.target.name] = event.target.value
    this.setState({ produto : tempProduto })
    console.log(this.state);
  }

  //responsvel por setar as informaçõs do complemento dentro 
  //do state de produtos
  handleAddChange(event){
    const tempProduto = this.state.produto
    tempProduto.complementos[event.target.name] = (event.target.value)
    this.setState({ produto : tempProduto})
    console.log(this.state);
  }

  //responsvel por setar as informaçõs do grupo dentro 
  //do state de produtos
  handleAddChangeGrupo(event){
    const tempProduto = this.state.produto
    tempProduto.grupoProduto = (this.grupo)
    this.setState({ produto : tempProduto})
    console.log(this.state);
  }

  //o handleChecked seta o state de chekbox dentro do produto
  handleChecked(event){
    const tempProduto = this.state.produto
    tempProduto[event.target.name] = event.target.checked;
    this.setState({ produto : tempProduto })
    console.log(this.state);
  }

  handleListGroup() {
    let service = new AuthService();
    service
      .fetch("/grupoProduto/list")
      .then(retorno => {
        this.setState({ grupos: retorno }); 
        console.log(this.state);
      })
      .catch(err => {
        //em caso de erro é impresso o erro no console.
        console.log(err);
      });
  }

  //handle submit salva os dados do state mandando para a API
  handleSubmit(event){
    const { produto } = this.state;
    console.log(produto.nome)
    if ( produto.nome != null){
    let service = new AuthService();
    service
      .post("/produto", produto)
      .then(retorno => {
        this.props.enqueueSnackbar('Produto salvo com sucesso ', {variant: 'success'});
      })
      .catch(err => {
      if (err.response == undefined){
        this.props.enqueueSnackbar('Falha ao tentar salvar produto', {variant: 'error'});
      }else{
        err.response.json().then(elem => {
          console.log(elem);
          this.props.enqueueSnackbar('Falha ao salvar produto ' + elem.errorMessage, {variant: 'error'});
        });
      }
    })
    this.handleToggle()
    //this.setState({ produto: this.handleBlankState() })
    }else{
      this.props.enqueueSnackbar('Preencha os campos requeridos', {variant: 'warning'});
    }
  }

  //responsável por fazer a abertura da tela
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleCancel() {
    this.setState({ produto: this.handleBlankState() })
    this.handleToggle()
  }
  
  //seta o state vazio após realizar alterações como salvar e cancelar
  handleBlankState() {
    return {  
      ativo: true,
      pausado: true,
    }
  }

  render() {
    const { classes } = this.props;
    const { open, produto, grupos } = this.state;
  
    return (
      <Fragment>
        <Button className={classes.buttonPrincipal}  onClick={this.handleToggle}>
         Adicionar produto
        </Button>
        <Dialog open={open} onClose={this.handleToggle} maxWidth="lg">
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography color="textPrimary" className={classes.title}>
                    <strong>Cadastrar produto</strong>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <DialogContent>
            <Tabs>
              <TabList>
                <Tab>
                  <Button color="textSecondary" className={classes.Button}>
                    Detalhes
                  </Button>
                </Tab>
              </TabList>
              <TabPanel>
               
              <Grid container spacing={4} className={classes.GridDetalhes}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    label={"Nome"}
                    required
                    name="nome"
                    value={produto.nome}
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    label={"Preço"}
                    name="preco"
                    required
                    value={produto.preco}
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    select
                    required
                    label={"Categoria"}
                    name="grupoProduto"
                    value={produto.grupoProduto}
                    onChange= {event => this.handleChange(event)}
                  > 
                   {grupos.map(grupo => (
                    <option key={grupo.id} value={grupo} >{grupo.descricao}</option>
                  ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3} container justify="center">
                <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    select
                    label={"Local Impressão"}
                    name="localImpressao"
                    value={produto.localImpressao}
                    onChange= {event => this.handleChange(event)}
                  > {produto.localImpressao}
                  <option value={"NZ"} >Imprimir Cozinha</option>
                  <option value={"CX"} >Imprimir Caixa</option>
                  <option value={"CP"} >Imprimir Copa</option>

                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    label={"Descrição"}
                    value={produto.descricao}
                    name="descricao"
                    helperText="0/100 caracteres"
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Ficha técnica e ingredientes"
                    className={classes.textFieldDetalhes}
                    multiline
                    variant="outlined"
                    rows="4"
                    name="fichaTecnica"
                    value={produto.fichaTecnica}
                    helperText="0/300 caracteres"
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    label={"Advertências"}
                    name="advertencia"
                    value={produto.advertencias}
                    helperText="Ex. Contém lactose"
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
              </Grid>
              </TabPanel>
              <TabPanel>

              </TabPanel>
            </Tabs>

          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              className={classes.buttonSecundario}
              onClick={e => this.handleCancel(e)}
            >CANCELAR
            </Button>
            <Button
              onClick={this.handleSubmit}
              className={classes.buttonPrincipal}
              onClick={e => this.handleSubmit(e)}
            >SALVAR
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withSnackbar(withStyles(styles)(CadastroCardapio));