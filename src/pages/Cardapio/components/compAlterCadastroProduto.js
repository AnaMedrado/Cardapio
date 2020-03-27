import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withSnackbar } from "notistack";
import AuthService from "../../../AuthService";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import { transparent } from "material-ui/styles/colors";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
  Button,Dialog,DialogActions,DialogContent,ListItem,
  ListItemText,ExpansionPanelSummary,ExpansionPanelActions,
  Typography,Divider,FormControlLabel,Switch,Grid,
  TextField,ExpansionPanel,ExpansionPanelDetails
} from "@material-ui/core";

const styles = theme => ({
  textFieldDetalhes: {
    width: "100%"
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
  buttonComplementos: {
    background: "#F2C26A",
    color: "white",
    height: 48,
    width: "15%",
    marginTop: "15px",
    marginBottom: "5px",
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
  button: {
    background: transparent,
    color: "#707070",
    "&:hover": {
      background: transparent,
    }
  },
  title: {
    color: "#253257",
    fontSize: "130%",
    marginLeft: "1%",
    marginTop: "1%"
  },
  Button: {
    fontSize: "100%",
    color: "#253257",
    "&:hover": {
      color: "#F2C26A",
      background: transparent
    }
  },  
  textField: {
    width: "100%",
  },
  Grid: {
    marginTop: "15px",
  },
  Grid1: {
    marginTop: "15px",
  },
  Divider: {
    width: "100%",
  },
  buttonIcon: {
    background: transparent,
    color: "#253257",
    "&:hover": {
      background: transparent
    }
  },
  buttonIconAdd: {
    background: transparent,
    color: "#253257",
    width: "40px",
    "&:hover": {
      background: transparent
    }
  },
  subTitle: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  buttonAddIcon: {
    background: transparent,
    color: "#253257",
    marginTop: "15px",
    marginBottom: "15px",
    "&:hover": {
      background: transparent
    }
  },
  div: {
    marginLeft: "10px",
  },
  div2: {
    marginTop: "10px",
    marginLeft: "10px"
  },
  Switch: {
    marginTop: "10px",
  }
});

class CadastroCardapio extends Component {
  constructor(props){
    super(props);
    this.state = {
      produto:{   
        grupoProduto:[],
        complementos:[],
        ativo: true,
        pausado: true,
      },
      complemento: {
        descricao: "",
        max: 0,
        min: 0,
        obrigatorio: true, 
        ativo: true,
      },
      grupos:[],
    };

    this.produto = props.produto
    this.handleChange =  this.handleChange.bind(this);

  }

  async componentDidMount() {
    this.handleListGroup()
    this.listProdutos(this.produto.id)
  }

    //responsavel por salvar os dados do produto, setando no 
    //state os campos dentro do array de produto
    handleChange(event){
        const tempProduto = this.state.produto
        tempProduto[event.target.name] = event.target.value
        this.setState({ produto : tempProduto })
        console.log(this.state);
    }

    //o handleChecked seta o state de chekbox dentro do produto
    handleChecked(event){
        const tempProduto = this.state.produto
        tempProduto[event.target.name] = event.target.checked;
        this.setState({ produto : tempProduto })
        console.log(this.state);
    }
    
    //responsvel por setar as informaçõs do complemento dentro 
    //do state de produtos
    handleAddChange(event){
        const { complemento } = this.state;
        complemento[event.target.name] = (event.target.value)
        this.setState({ complemento : complemento})

        //const tempProduto = this.state.produto
        //tempProduto.complementos[event.target.name] = (event.target.value)
        //this.setState({ produto : tempProduto})
        console.log(this.state);
    }

    //lista o produto para edicao a partir do id proveniente da listagem 
    listProdutos(produto) {
        let service = new AuthService();
        service
        .fetch(`/produto/${produto}`)
        .then(retorno => {
            this.setState({ produto: retorno }); 
            console.log(this.state);
        })
        .catch(err => {
            //em caso de erro é impresso o erro no console.
            console.log(err);
        });
    }

    //lista os grupos nescessarios para o box de grupos
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

    handleSubmitComplemento(event){
      const {complemento} = this.state;
      const {produto} = this.state;

      complemento.produto = {id: produto.id};

      console.log("Salvando complemento",complemento)

      let service = new AuthService();
      service
        .post("/complemento", complemento)
        .then(retorno => {
          console.log("salvar Complemento")
          console.log(retorno)
          this.props.enqueueSnackbar('Complemento salvo com sucesso',  {variant: 'info'})
          produto.complementos.push(retorno)
          this.setState({produto})
        })
        .catch(err => {
          if (err.response == undefined){
            this.props.enqueueSnackbar('Falha ao tentar salvar o complemento', {variant: 'error'});
          }else{
            err.response.json().then(elem => {
              console.log(elem);
              this.props.enqueueSnackbar('Falha ao salvar o complemento ' + elem.errorMessage, {variant: 'error'});
            });
          }
      })
      this.novoComplemento()
    
  }

    handleSubmit(event){
        const { produto } = this.state;
        console.log("salvar" + produto)
        
        let service = new AuthService();
        service
          .post("/produto", produto)
          .then(retorno => {
            console.log("salvarProduto")
            console.log(retorno.data)
            this.props.enqueueSnackbar('Produto salvo com sucesso',  {variant: 'info'})
          })
          .catch(err => {
            if (err.response == undefined){
              this.props.enqueueSnackbar('Falha ao tentar salvar o produto', {variant: 'error'});
            }else{
              err.response.json().then(elem => {
                console.log(elem);
                this.props.enqueueSnackbar('Falha ao salvar o produto ' + elem.errorMessage, {variant: 'error'});
              });
            }
        })
        this.handleToggle()
    }
    
    handleDelete(produto){
        let service = new AuthService();
        service
        .delete(`produto/${produto.id}`)
        .then(retorno => {
            produto.ativo = false;
            this.setState({produto: produto})
            this.props.enqueueSnackbar('Produto inativado com sucesso',  {variant: 'info'})
        }) 
    }

    handleCancel() {
      this.handleToggle()
    }

    //responsavel por fazer a abertura da tela
    handleToggle = () => {
      console.log(this.state);
      this.setState({
      open: !this.state.open
      });
    };

    handleEditarComplemento(event, complemento) {
      event.stopPropagation();
      console.log(complemento)
      this.setState({complemento: complemento})
    }

    novoComplemento(){
      let complemento = {
        id: null,
        descricao: "",
        max: 0,
        min: 0,
        obrigatorio: true,
        complementoItens: [ { descricao: "", valor: 0.0 }]
      }
      this.setState({complemento})
    }

    handleAddComplementoItem(complemento){
      console.log(complemento)
      complemento.complementoItens.push({descricao : "", valor: "0.00"})
      this.setState({complemento : complemento})
    }

    handleRemoveComplementoItem(complementoItem){
     
      if (complementoItem.id != null){
        let service = new AuthService();
        service
        .delete(`complementoItem/${complementoItem.id}`)
      }

      //todos os arrays
      let temp = this.state.complemento.complementoItens
      console.log("todos" + temp)

      //passa a posição no array
      let pos = temp.findIndex(r => r == complementoItem)
      console.log("posição" + pos)

      //deleta do array o de posição escolhda
      delete temp[pos]
      console.log("removido" + temp)

      //seta o novo array sem o array deletado
      this.setState({complementoItens : temp})

      this.props.enqueueSnackbar('Item do complemento excluido com sucesso',  {variant: 'info'})

    }

  render() {
    const { classes } = this.props;
    const { produto, grupos, open, complemento} = this.state;

    return (
      <Fragment>
       <Button edge="end" className={classes.button} onClick={this.handleToggle} >
            <Typography color="textSecundary" className={classes.subTitle} >
              Editar
            </Typography>
        </Button>
        <Dialog open={open} onClose={this.handleToggle} maxWidth="lg">
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography color="textPrimary" className={classes.title}>
                    <strong>CADASTRAR ITEM</strong>
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
                <Tab>
                  <Button color="textSecondary" className={classes.Button}>
                    Complementos
                  </Button>
                </Tab>
              </TabList>
              <TabPanel>
              <Grid container spacing={4} className={classes.Grid1}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    label={"Nome"}
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
                    value={produto.preco}
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    select
                    label={"Categoria"}
                    name="grupoProduto"
                    value={produto.grupoProduto}
                    onChange= {event => this.handleChange(event)}
                  >{produto.grupoProduto.descricao}
                   {grupos.map(grupo => (
                    <option value={grupo} >{grupo.descricao}</option>
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
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    label={"Advertências"}
                    name="advertencia"
                    value={produto.advertencia}
                    helperText="Ex. Contém lactose"
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
              </Grid>
              </TabPanel>

              <TabPanel>
                  <Grid container spacing={1} className={classes.Grid}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        label={"Descrição do complemento"}
                        name="descricao"
                        value={complemento.descricao}
                        onChange= {event => this.handleAddChange(event)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        label={"Qtd. min."}
                        name="min"
                        value={complemento.min}
                        onChange= {event => this.handleAddChange(event)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        label={"Qtd. máx."}
                        name="max"
                        value={complemento.max}
                        onChange= {event => this.handleAddChange(event)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} container justify="center" >
                    <FormControlLabel
                        name= "ativo"
                        className={classes.Switch}
                        control={
                          <Switch
                          value={complemento.obrigatorio}
                          color="primary"
                            onChange={this.handleChecked}
                            onChange={event =>
                              this.setState({ ativo: event.target.value })
                            }
                          />
                        }
                        label={"Obrigatório"}
                      />
                    </Grid>
 
                    {complemento.complementoItens != null ? complemento.complementoItens.map(complementoItem => (
                     <> 
                     <Grid item xs={12} sm={12}>
                       <Divider className={classes.Divider} light={true} />
                     </Grid >
                     <Grid item xs={12} sm={9}>
                       <TextField
                         className={classes.textField}
                         variant="outlined"
                         label={"Item do complemento"}
                         name="descricao"
                         value={complemento.complementoItens.descricao}
                         onChange= {event => this.handleChange(event)}
                       />
                     </Grid>
                     <Grid item xs={12} sm={2}>
                       <TextField
                         className={classes.textField}
                         variant="outlined"
                         label={"R$"}
                         name="valor"
                         value={complemento.complementoItens.valor}
                         onChange= {event => this.handleChange(event)}
                       />
                     </Grid>
                     <Grid item xs={12} sm={1} container justify="center">
                       <Button onClick={() => this.handleRemoveComplementoItem(complementoItem)}                         
                       className={classes.buttonIconAdd}>
                         <DeleteIcon fontSize="large"/> 
                       </Button>
                     </Grid>
                      </> 
                    )) : ""}


                    
                    <Grid item xs={12} sm={12}>
                      <Divider className={classes.Divider} light={true} />
                    </Grid >
                    <Grid item xs={12} sm={12} container justify="flex-end">

                    <Button onClick={this.handleSubmit} 
                    className={classes.buttonIconDelete}>
                      {" "}
                      <DeleteIcon />
                      &nbsp;&nbsp;EXCLUIR COMPLEMENTO
                    </Button> 
                    <Button
                      onClick={this.handleSubmit}
                      className={classes.buttonPrincipal}
                      onClick={  () => this.handleAddComplementoItem(complemento) }     
                    >ADICIONAR ITEM
                    </Button>
                    <Button
                      onClick={this.handleSubmit}
                      className={classes.buttonPrincipal}
                      onClick={e => this.handleSubmitComplemento(e)}
                      >SALVAR COMPLEMENTO
                    </Button>

                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider className={classes.Divider} light={true} />
                    </Grid >
                  </Grid>
                {produto.complementos.map(complementos => (
                <div key={complementos.id}>
                  <div className={classes.div}>
                 <ExpansionPanel>
                 <ExpansionPanelSummary>
                 <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography color="textPrimary">
                            <strong>{complementos.descricao}</strong>
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                        <Typography color="textSecondary">
                         Qtd. min. {complementos.min} | Qtd. Máx. {complementos.max} 
                        </Typography>
                      </React.Fragment>
                      }
                    />
                     <FormControlLabel
                        edge="end" 
                        name= "ativo"
                        className={classes.buttonIcon}
                        control={
                          <Switch
                            value={this.state.ativo}
                            color="primary"
                            onChange={this.handleChecked}
                            onChange={event =>
                              this.setState({ ativo: event.target.value })
                            }
                          />
                        }
                        label={"Complemento obrigatório"}
                      />
                      <Button
                        edge="end" 
                        onClick={  (event) => this.handleEditarComplemento(event, complementos)  }
                        className={classes.buttonIcon}
                      >Editar
                      </Button>
                    </ListItem>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    {complementos.complementoItens.map(complementoItens => (
                    <ExpansionPanel key={complementoItens.id}>
                    <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography color="textPrimary">
                            <strong>{complementoItens.descricao}</strong>
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                        <Typography color="textSecondary">
                        R$ {complementoItens.valor} 
                        </Typography>
                      </React.Fragment>
                      }/>
                      </ListItem>
                      <Button
                        edge="end" 
                        onClick={this.handleSubmit}
                        className={classes.buttonIcon}
                      >Editar
                      </Button>
                     </ExpansionPanel>
                     ))}
                  </ExpansionPanelDetails>
                 </ExpansionPanel>
                </div>
                </div>
                ))}
              </TabPanel>
            </Tabs>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} 
            onClick={() => this.handleDelete(produto)}
            className={classes.buttonIconDelete}>
              {" "}
              <DeleteIcon />
              &nbsp;&nbsp;EXCLUIR ITEM
            </Button> 
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

export default  withSnackbar(withStyles(styles)(CadastroCardapio));
