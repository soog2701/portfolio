import React, { Component } from 'react';
// import logo from './temps/logo.svg';
import { connect } from 'react-redux'
import './css/App.scss';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// gird
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
// tab
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// icons
// import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import HomeIcon from '@material-ui/icons/Home';

import { unstable_Box as Box } from '@material-ui/core/Box';
import RouterView from '../router/index.js';
import { withRouter, Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        // display: 'flex',
        // flexGrow: 1,
        width: '100%',
    },    
    toolbar: theme.mixins.toolbar, 
    contents: {
        flexGrow: 1,
    },
    apptab: { // app tab
        backgroundColor: theme.palette.background.paper,
    },
    apptabItem: {
        // flexDirection: 'row',
    },
    tabConts: {
        marginTop: '72px',
    },
    links: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText
    }
});

class Root extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  state = {
      value: 0,
  };
  componentDidMount () {
      // console.log(s)
  }
  handleChange = (event, value) => {
      this.setState({ value });
  };
  
  render() {
      const { classes, history } = this.props;
      const { value } = this.state;
      
      return (
      <div className={classes.root}>
          <CssBaseline />
          <AppBar color="primary" >
              <Box display="flex" flexDirection="row" p={0}>
                  <Box p={0} flexGrow={1}>
                      <Tabs
                          value={value}
                          onChange={this.handleChange}
                          variant="scrollable" scrollButtons="off"
                      >
                          <Tab label="home" icon={<HomeIcon />} onClick={() => {history.push('/')}} />
                          <Tab label="List" icon={<FavoriteIcon />} onClick={() => {history.push('/list')}} />
                          <Tab label="Item Three" icon={<PersonPinIcon />} />
                          <Tab label="Item Four" icon={<HelpIcon />} />
                          <Tab label="Item Five" icon={<ShoppingBasket />} />
                          <Tab label="Item Six" icon={<ThumbDown />} />
                          <Tab label="Item Seven" icon={<ThumbUp />} />
                      </Tabs>
                  </Box>
                  <Box p={0} mr={2} display="flex" alignItems="center">
                      <Button color="inherit">
                          <Link className={classes.links} to="/login" >Login</Link>
                      </Button>
                  </Box>
              </Box>
          </AppBar>
          <Grid container className={classes.tabConts} spacing={0}>
              <Grid item xs={12}>
                  {/* <main 
                      className={classNames(classes.content, {
                          [classes.contentShift]: open,
                      })}
                  >
                      <div className={classes.drawerHeader} />
                      <div className={classes.contents} >
                          <RouterView />
                      </div>
                  </main> */}
                  <RouterView />
              </Grid>
          </Grid>
      </div>
      );
  }
}
Root.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

function select (state) {
  return {
    data: state
  }
}

export default withRouter(connect(select)(withStyles(styles, { withTheme: true })(Root)));