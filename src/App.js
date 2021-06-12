import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import NotListedLocationRoundedIcon from "@material-ui/icons/NotListedLocationRounded";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import axios from "axios";
import Moment from "moment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import CloudQueueRoundedIcon from '@material-ui/icons/CloudQueueRounded';
import Brightness5RoundedIcon from '@material-ui/icons/Brightness5Rounded';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Temperatura(tempt){
  return Math.round(tempt - 273.15)+"°C";
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
}));

function App() {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const [nombciudad, setNombciudad] = useState("");

  const [noticias, setNoticias] = React.useState([]);
  const [weathers, setWeathers] = React.useState([]);
  const [historial, setHistorial] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  

  const classes = useStyles();
    const ObtenerNoticias = async () => {
    const data_hist = await axios.get("ConsultaHistorial");
    setHistorial(data_hist);
  };

  //consultar a la api las noticias y estado del tiempo de dicha ciudad
  const ConsultarNotEst = (event) => {
    event.preventDefault();
    //console.log(nombciudad);
    getCiudadNombre(nombciudad);
  };

  async function getCiudadNombre(nombciud) {
    await axios
      .get(`ConsultaCiudad/` + nombciud, {
        headers: {
          "Content-Type": "application/xml;charset=UTF-8",
        },
      })
      .then((response) => {
        // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
        setNoticias(response.data.news);
        setWeathers(response.data.current_weather);
        //console.log(noticias.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getHistorial() {
    await axios
      .get(`ConsultaHistorial/`, {
        headers: {
          "Content-Type": "application/xml;charset=UTF-8",
        },
      })
      .then((response) => {
        // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
        setHistorial(response.data);        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <NotListedLocationRoundedIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Estado del tiempo
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container fixed>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              NOTICIAS Y ESTADO DEL TIEMPO
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Puedes consultar noticias y estado del tiempo ingresando la ciudad
              la cual deseas estar informado.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <div>
                  <label>
                    <TextField
                      id="standard-basic"
                      label="Ingrese la ciudad"
                      style={{ width: "60ch" }}
                      onChange={(e) => {
                        setNombciudad(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <Grid item>
                  <Button
                    onClick={(e) => {
                      ConsultarNotEst(e);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Consultar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="NOTICIAS" {...a11yProps(0)} />
              <Tab label="ESTADO DEL TIEMPO" {...a11yProps(1)} />
              <Tab label="HISTORIAL" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          {/* contenido de noticias */}
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              {noticias.articles &&
                noticias.articles.map((valn, i) => {
                  {
                    /* inicio card */
                  }
                  Moment.locale("es");
                  return (
                    <Grid item key={i} xs={6} sm={6} md={6}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={valn.urlToImage}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {valn.title}
                          </Typography>
                          <Typography display="flex">
                            {valn.description}
                          </Typography>
                          <Box textAlign="right" m={1}>
                            Autor: {valn.author}
                            <br />
                            {Moment(valn.publishedAt).format("LL")}
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Link href={valn.url} color="inherit">
                            <Button size="small" color="primary">
                              Ver
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              {/* cierre card */}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            
            <h4 align="center">ESTADO DEL TIEMPO: {weathers.name?.toUpperCase()}</h4>
            <Grid item xs={12} sm={12} md={12}>              
              <List className={classes.root}>
                <ListItem>
                  <ListItemText primary={weathers.name} secondary={" Humedad: " + weathers.main?.humidity} />
                  <InvertColorsIcon />
                </ListItem>
                <Divider component="li" />
                <li>
                  <Typography
                    className={classes.dividerFullWidth}
                    color="textSecondary"
                    display="block"
                    variant="caption"
                  >                    
                  {}                
                  </Typography>
                </li>
                <ListItem>
                  <ListItemText primary="Viento" secondary={"Presion: "+weathers.main?.pressure+"hPa"} />                  
                  <CloudQueueRoundedIcon />
                </ListItem>
                <Divider component="li" variant="inset" />
                <li>
                  <Typography
                    className={classes.dividerInset}
                    color="textSecondary"
                    display="block"
                    variant="caption"
                  >                    
                  </Typography>
                </li>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Brightness5RoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Temperatura" secondary={Temperatura(weathers.main?.temp)} />
                </ListItem>
              </List>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <h4 align="center">HISTORIAL DE BUSQUEDAS</h4>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Eat</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Code</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>Sleep</TimelineContent>
              </TimelineItem>
            </Timeline>
          </TabPanel>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Estado del tiempo / Noticias
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Mantente informado de lo que pasa en el mundo...
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default App;
