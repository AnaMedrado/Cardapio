import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import AuthService from "../../../AuthService";
import { withSnackbar } from "notistack";
import DeleteIcon from "@material-ui/icons/Delete";
import { transparent } from "material-ui/styles/colors";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {
  Button, Dialog, DialogActions,DialogContent, ListItem,ListItemText,Typography, Fab,Grid,TextField,
} from "@material-ui/core";

const styles = theme => ({
  textFieldDetalhes: {
    width: "100%",
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
  control:{
      marginTop: "10px",
  } 
});


 

class CadastroCardapio extends Component {

  constructor(props){
    super(props);

    this.state = {
      open: false,
      grupo:{
        tipoGrupoProduto:{},
        ativo: true,
        pausado: true,
      },
      optionsTipoGrupo: [],
      idTipoGrupo: null
    };

    this.listUpdateCallback = props.listUpdateCallback
    this.handleChange =  this.handleChange.bind(this);
  }

  createNewGrupo(){
    let grupo = {
      tipoGrupoProduto:{},
      ativo: true,
      pausado: true
    }

    return grupo
  }
 

  async componentDidMount() {
    console.log("Criando componente de cadastro de grupo")
    this.handleList()
  }

  update(grupo) {

    console.log("Carregando grupo")
    this.setState({ grupo: grupo })
    console.log("TIPO GRUPO")
    console.log(grupo.tipoGrupoProduto)

    this.setState({idTipoGrupo:  grupo.tipoGrupoProduto.id})
    console.log(this.state)
    this.handleToggle()
  }

  handleList() {
    let service = new AuthService();
    service
      .fetch("/tipoGrupoProduto/list")
      .then(retorno => {

        this.setState({ optionsTipoGrupo: retorno }); 
        console.log(this.state);
      })
      .catch(err => {
        //em caso de erro é impresso o erro no console.
        console.log(err);
      });
  }

  handleDelete(grupo){
    let service = new AuthService();
    service
    .delete(`grupoProduto/${grupo.id}`)
    .then(retorno => {
        grupo.ativo = false;
        this.setState({grupo: grupo})
        this.props.enqueueSnackbar('Grupo inativado com sucesso',  {variant: 'info'})
    }) 
    .catch(err => {
      if (err.response == undefined){
        this.props.enqueueSnackbar('Falha ao tentar deletar o grupo', {variant: 'error'});
      }else{
        err.response.json().then(elem => {
          console.log(elem);
          this.props.enqueueSnackbar('Falha ao deletar grupo ' + elem.errorMessage, {variant: 'error'});
          });
        }
    })
    this.handleToggle()
    this.listUpdateCallback()
  }

  //responsavel por salvar os dados do produto, setando no 
  //state os campos dentro do array
  handleChange(event){
    
    console.log("handleChange")
    const tempGrupo = this.state.grupo
    tempGrupo[event.target.name] = event.target.value
    this.setState({ grupo : tempGrupo })
    console.log(this.state);
  }

  handleChangeTipoGrupoProduto(event){
    console.log("handleChangeTipoGrupoProduto")
    const tempGrupo = this.state.grupo

    let tipoGrupoProduto = { id: event.target.value }

    if ( event.target.value == ""){
      tipoGrupoProduto = null
      this.setState({ idTipoGrupo : null })
      console.log("tipoGrupo " + tipoGrupoProduto)
    }else{
      this.setState({ idTipoGrupo : tipoGrupoProduto.id })
      console.log("tipoGrupo " + tipoGrupoProduto.id)
    }
    
    tempGrupo.tipoGrupoProduto = tipoGrupoProduto
    this.setState({ grupo : tempGrupo })
    console.log(this.state);
  }

  //handle submit salva os dados do state mandando para a API
  handleSubmit(event){
    const { grupo } = this.state;
    console.log(grupo)
    if ( grupo.descricao == null){
     this.props.enqueueSnackbar('Preencha os campos requeridos', {variant: 'warning'})
     return;
    }

    let service = new AuthService();
    service
      .post("/grupoProduto", grupo)
      .then(retorno => {
        this.props.enqueueSnackbar('Grupo salvo com sucesso ', {variant: 'success'});
         
      })
      .catch(err => {
        if (err.response == undefined){
          this.props.enqueueSnackbar('Falha ao tentar salvar grupo', {variant: 'error'});
        }else{
          err.response.json().then(elem => {
            console.log(elem);
            this.props.enqueueSnackbar('Falha ao salvar grupo ' + elem.errorMessage, {variant: 'error'});
          });
        }
      })
    this.handleToggle()
    this.listUpdateCallback()
     
  }

  novoGrupoProduto = () =>{
    this.update(this.createNewGrupo())
    this.handleToggle()
  }

  //responsavel por fazer a abertura da tela
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };


  render() {
    const { open } = this.state;
    const { classes } = this.props;
    const { grupo } = this.state;
    const { optionsTipoGrupo } = this.state;
    const { idTipoGrupo } = this.state;
    

    return (
      <Fragment>
        <Fab variant="extended"  className={classes.buttonPrincipal} onClick={this.novoGrupoProduto}>
          ADICIONAR GRUPO
        </Fab>
        <Dialog open={open} onClose={this.handleToggle} className={classes.Dialog} >
          <ListItem>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography color="textPrimary" className={classes.title}>
                    <strong>CADASTRAR GRUPO DE PRODUTOS</strong>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <DialogContent>
              <Grid container spacing={4} className={classes.GridDetalhes}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textFieldDetalhes}
                    variant="outlined"
                    label={"Nome do grupo"}
                    name="descricao"
                    required
                    value={grupo.descricao}
                    onChange= {event => this.handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} container justify="center">
                  <FormControl variant="outlined" className={classes.textFieldDetalhes}>
                  <InputLabel htmlFor="outlined-age-simple">
                    Tipo do grupo
                  </InputLabel>  
                  <Select
                    value={idTipoGrupo}
                    onChange={event => this.handleChangeTipoGrupoProduto(event)}
                    inputProps={{
                      name: 'tipoGrupoProduto',
                      id: 'outlined-age-simple',
                    }}
                    >
                    <MenuItem value="">
                      <em>nenhum...</em>
                    </MenuItem>

                    {optionsTipoGrupo.map(tipo => (
                      <MenuItem key={tipo.id} value={tipo.id}>{tipo.descricao}</MenuItem>
                    ))}
                  </Select>
                  
                  </FormControl>

                </Grid>
              </Grid>
          </DialogContent>
          <DialogActions>
            <DialogContent />
          </DialogActions>
          <DialogActions>
            <Button onClick={this.handleSubmit} 
            onClick={() => this.handleDelete(grupo)}
            className={classes.buttonIconDelete}>
              {" "}
              <DeleteIcon />
              &nbsp;&nbsp;EXCLUIR ITEM
            </Button>
            <Button
              className={classes.buttonSecundario}
              onClick={e => this.handleToggle(e)}
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
