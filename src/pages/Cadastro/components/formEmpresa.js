import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AuthService from "../../../AuthService";
import Select from 'react-select'
import { withSnackbar } from "notistack";

import {
  Divider,
  Grid,
  Button,
  Typography,
  TextField
} from "@material-ui/core";

const themeDark = createMuiTheme({
  palette: {
    primary: { main: "#253257" },
    secondary: { main: "#FFFFFF" }
  }
});

const styles = theme => ({
  div: {
    flexGrow: 1
  },
  img: {
    width: "8%",
    marginLeft: "48%"
  },
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
  subtitleForm: {
    fontSize: "120%",
    textAlign: "center"
  },
  divider: {
    marginTop: "18px"
  },
  textField: {
    width: "100%"
  },
  buttonPrincipal: {
    background: "#253257",
    color: "white",
    borderRadius: 10,
    height: 48,
    width: "100%",
    marginBottom: "30px",
    "&:hover": {
      background: "#E9E9E9",
      color: "#253257"
    }
  }
});

class formEmpresa extends Component {
  constructor(props){
    super(props);
    //Cada elemento de input que você terá em seu component
    //formulário assumirá o valor de state como seu valor.
    this.state = {
      empresa: { 
          nome: '',
          razaoSocial: '',
          cpfCnpj: '',
          cep: '',
          endereco: '',
          numero: '',
          complemento: '',
          estado: { id: '' }, 
          municipio: { id: ''  }
      },
      estados: [], 
      municipios: [],
      estado: null,
      municipio: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.carregarEstados()
    
    this.listar()
  }

  listar() {
    console.log('Buscando dados do usuario logado');
    let service = new AuthService();
    service
      .fetch("/login/usuarioLogado")
      .then(retorno => {
        
        console.log(retorno);
        this.setState({ empresa: retorno.empresa });

        const estado = retorno.empresa.estado;
        const municipio = retorno.empresa.municipio;

        this.setState({ estado: { value: estado.id, label: estado.nome } })
        this.setState({ municipio: { value: municipio.id, label: municipio.nome } })
        if (municipio.id != undefined){
          this.carregarMunicipios(municipio.id)
        }
        
        console.log(this.state.empresa);

      })
      .catch(err => {
        //em caso de erro é impresso o erro no console.

        if (err.response == undefined){
          console.log(err);
          this.props.enqueueSnackbar('Erro ao buscar informações do usuário',  {variant: 'error'})
            
        }else{
          err.response.json().then(elem => {
            console.log(elem);
            this.props.enqueueSnackbar('Você não esta logado',  {variant: 'warning'})
          });
        }

      });
  }

  handleChange(event){
    const { empresa } = this.state;
    empresa[event.target.name] =  event.target.value;
    //this.setState(this.state);
    this.setState({ empresa: empresa })
    console.log(empresa)
  }

  handleSubmit(event) {
    const { empresa } = this.state;
    console.log(empresa)
    
    let service = new AuthService();
    service
      .post("/empresa", empresa)
      .then(retorno => {
        console.log("salvarEmpresa");
        this.listar()
      })
  }


  carregarEstados(){
    console.log('carregando estados...')

    this.setState({mensagem: "carregando..."})

    let service = new AuthService();
    service
        .fetch("/estado/list")
        .then(retorno => {
        
        let options = retorno.map( elem => ( { "value": elem.id, "label" : elem.nome } ) );
        options.push( { "value": null, "label" : 'selecione um estado' } )

        this.setState({estados: options})
        
        this.setState({mensagem: ""})
  })
  .catch(err => { 
    this.setState({mensagem: "Falha ao carregar estados"})
    console.log(err);
  });
}

carregarMunicipios(idEstado){
    
    console.log('carregando municipios...')

    this.setState({mensagem: "carregando municípios..."})

    let service = new AuthService();
    service
        .fetch("/municipio/listByEstadoId/"+idEstado)
        .then(retorno => {
        
        let options = retorno.map( elem => ( { "value": elem.id, "label" : elem.nome } ) );
        options.push( { "value": null, "label" : 'selecione um munícipio' } )

        this.setState({municipios: options})
        console.log(retorno);  
        this.setState({mensagem: ""})
  })
  .catch(err => { 
    this.setState({mensagem: "Falha ao buscar municípios"})
    console.log(err);
  });
}

handleChangeEstado(selectOption){
    this.setState( { estado: selectOption})
    const { empresa } = this.state;
    empresa.estado = {id : selectOption.value }
    this.setState({ empresa: empresa })
    this.carregarMunicipios(selectOption.value)
}

handleChangeMunicipio(selectOption){
  this.setState( { municipio: selectOption})
  const { empresa } = this.state;
  empresa.municipio = {id : selectOption.value };
  this.setState({ empresa: empresa })
}

  

  render() {
    const { classes } = this.props;
    const { empresa } = this.state;
    const { municipio, estado } = this.state;

    return (
      <ThemeProvider theme={themeDark}>
       <Grid container spacing={4}>
              
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={4}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography
                  className={classes.subtitleForm}
                  color="textSecondary">
                  Dados da empresa
                </Typography>
               
              </Grid>
              <Grid item xs={12} sm={4}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={4}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label={"Nome Fantasia"}
                  name="nome"
                  value={empresa.nome}
                  onChange={ this.handleChange }>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label={"Razão Social"}
                  name="razaoSocial"
                  value={empresa.razaoSocial}
                  onChange= { event => this.handleChange(event) }/>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label={"CPF/CNPJ"}
                  name="cpfCnpj"
                  value={empresa.cpfCnpj}
                  onChange= { event => this.handleChange(event) }/>
             
              </Grid>
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={1} />

              <Grid item xs={12} sm={2}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label={"CEP"}
                  name="cep"
                  value={empresa.cep}
                  onChange= { event => this.handleChange(event) }/>
               
              </Grid>
              <Grid item xs={12} sm={3}>
                
              <Select label="Estados" options={this.state.estados} value={this.state.estado}  onChange={ (e) => this.handleChangeEstado(e) } />
             <span>{this.state.mensagem}</span>
            
              </Grid>
              <Grid item xs={12} sm={5}>

                <Select  options={this.state.municipios}  value={this.state.municipio} onChange={ (e) => this.handleChangeMunicipio(e) } />
                 
              </Grid>
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label={"Endereço"}
                  name="endereco"
                  value={empresa.endereco}
                  onChange={ event => this.handleChange(event) }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label={"Número"}
                  name="numero"
                  value={empresa.numero}
                  onChange={event => this.handleChange(event) }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label={"Complemento"}
                  name="complemento"
                  value={empresa.complemento}
                  onChange={event => this.handleChange(event)}
                />
              </Grid>
              <Grid item xs={12} sm={1}/>
              
              <Grid item xs={12} sm={9}>
              </Grid> 
              <Grid item xs={12} sm={2}>
                  <Button className={classes.buttonPrincipal}  
                  value="teste"  onClick={e => this.handleSubmit(e)}>SALVAR</Button>
              </Grid>
            </Grid>
      </ThemeProvider>
    );
  }
}

export default withSnackbar( withStyles(styles)(formEmpresa) );
