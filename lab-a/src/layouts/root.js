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

// antd
import { Row, Col } from 'antd'; // Button

// import { unstable_Box as Box } from '@material-ui/core/Box';
import RouterView from '../router/index.js';
import { withRouter, Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        // width: '100%',
        height:'100%',
        paddingTop: '20px',
        backgroundColor: '#263238'
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
    },
    button:{
      marginRight: '1px',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      backgroundColor: '#546e7a'
    }
});

class Root extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  state = {
    value: 0
  };
  componentDidMount () {
      // console.log(s)
  }
  componentWillUpdate() {
    console.log('is root---------->', this.props.data); // store // 2019-04-28 next state 로 업데이트 되서 false가 된다...
  }
  handleChange = (event, value) => {
      this.setState({ value });
  };
  
  render() {
      const { classes, history, data } = this.props;
      const { value } = this.state;
      let { reducers: {islogin} } = data
      return (
      <div className={classes.root}>
        <div style={{display: 'flex', flexDirection: 'row',}}>
          <Button className={classes.button} onClick={() => {history.push('/')}}>root</Button>
          <Button className={classes.button} onClick={() => {history.push('/list')}}>list</Button>
          <Button className={classes.button}>tab1</Button>
          <div style={{marginLeft:'auto'}}>
            <Button color="inherit">
                <Link className={classes.links} to="/login" >{islogin ? 'logout':'Login'}</Link>
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', borderTop: '1px solid #37474f'}}>
          <div style={{ width: '30%' }}>

          </div>
          <RouterView style={{ width: '70%' }} />
        </div>        
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