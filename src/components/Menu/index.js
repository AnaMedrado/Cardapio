import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./styles.css";
import Logo from "../../imagens/logo.svg"; 
import Cardapio from "../../imagens/cardapio.svg";
import Pedidos from "../../imagens/pedidos.svg";
import avatar from "../../imagens/avatar.svg";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import AuthService from "../../AuthService";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Link } from "react-router-dom";
 
const drawerWidth = 240;

//cor primaria é considerada o fundo,
//cor secundaria é considerada a escrita.
const themeDark = createMuiTheme({
  palette: {
    primary: { main: "#253257" },
    secondary: { main: "#FFFFFF" }
  }
});

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    color: "#ffffff",
  },
  menuList:{
    marginRight: 36,
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  div: {
    flexGrow: 1
  },
  img: {
    width: "8%",
    marginLeft: "46%"
  },
  root: {
    background: "#F2C26A"
  },
  List: {
    background: "#F0CA84",
    marginBottom: "3%"
  },
  ListPrincipal: {
    marginTop: "2%"
  },
  ListButton: {
    marginTop: "20px",
    marginBottom: " 10px",
    "&:hover": {
      background: "transparent"
    }
  },
  Avatar: {
    marginTop: 20,
    width: "62%",
    height: "70%"
  },
  Avatar2: {
    marginTop: 20,
    width: "150px",
    height: "150px",
    marginBottom: "5px"
  },
  buttonPrincipal: {
    background: "white",
    padding: "15px",
    color: "#253257",
    borderRadius: 10,
    "&:hover": {
      background: "white",
      color: "#253257"
    }
  },
  a: {
    fontSize: "10px"
  },
  btnBranco:{
    color: "#ffffff !important",
  }
}));

function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const auth = new AuthService();
  
  function handleSair(){
    console.log('Realizando logout...')
    auth.logout()
    window.location = "/login"
  }

 

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }



  function BtnLoginLogout(){
    console.log('Logado ' + auth.loggedIn())
    if (auth.loggedIn()){
      return <Button className={classes.btnBranco} onClick={ handleSair  }>SAIR</Button>
    }
    
    return (
      <NavLink to="/Login" className={classes.btnBranco}>
       <span>Acessar</span>
      </NavLink>
    ) 
  }


  function MenuLateral(){
    return(
      <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <NavLink to="/cadastro">
          <Grid container justify="center">
          <Avatar
              alt="Remy Sharp"
              src={avatar}
              className={clsx(classes.Avatar, { [classes.Avatar2]: open })}
            />
          </Grid>

          <ListItem
            className={clsx(classes.menuList, { [classes.hide]: !open })}
          >
            <strong>&nbsp;&nbsp;&nbsp;&nbsp;NOME RESTAURANTE</strong>
          </ListItem>
          </NavLink>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={clsx(classes.ListButton, { [classes.hide]: !open })}
          >
            <Button justify="center" className={classes.buttonPrincipal}>
              <Grid>
                <a>RESTAURANTE FECHADO</a>
                <br />
                <a className={classes.a}>Fora do horário programado</a>
              </Grid>
            </Button>
          </Grid>

          <List className={classes.ListPrincipal}>
           
            <NavLink to="/Cardapio">
              <ListItem button className={classes.List}>
                <ListItemAvatar>
                  <Avatar src={Cardapio} />
                </ListItemAvatar>
                <strong>&nbsp;&nbsp;Cardápio</strong>
              </ListItem>
            </NavLink>
            <NavLink to="/Pedidos">
            <ListItem button className={classes.List}>
              <ListItemAvatar>
                <Avatar src={Pedidos} />
              </ListItemAvatar>
              <strong>&nbsp;&nbsp;Pedidos</strong>
            </ListItem>
            </NavLink>
          </List>
        </Drawer>

    )
  }


  return (
    <div>
      <ThemeProvider theme={themeDark}>
        <AppBar
          color="primary"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            {
              auth.loggedIn() ? (
                <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open
                })}
              >
                <MenuIcon />
              </IconButton>
              ) : ''
            }
           
            <div className={classes.div}>
              <img className={classes.img} src={Logo} alt="imagemAvatar" />
            </div>

            <BtnLoginLogout />
          </Toolbar>
        </AppBar>

        { auth.loggedIn() ?  <MenuLateral></MenuLateral> : '' }
       

      </ThemeProvider>
    </div>
  );
}
export default withStyles(useStyles)(MiniDrawer);
