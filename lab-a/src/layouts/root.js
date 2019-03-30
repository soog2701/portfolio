import React, { Component } from 'react';
// import logo from './temps/logo.svg';
import './css/App.scss';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// gird
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// tab
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// icons
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';

import { unstable_Box as Box } from '@material-ui/core/Box';
import RouterView from '../router/index.js';
import { withRouter, Link } from 'react-router-dom';
import { NONAME } from 'dns';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        // display: 'flex',
        // flexGrow: 1,
        width: '100%',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    contents: {
        flexGrow: 1,
    },
    apptab: { // app tab
        // display: 'flex',
        // flexDirection: 'row',
        backgroundColor: theme.palette.background.paper,
    },
    apptabItem: {
        // flexDirection: 'row',
    },
    tabConts: {
        marginTop: '72px',
        // flexGrow: 1,
        // flexDirection: 'column',
    },
    links: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText
    }
});

class Root extends Component {
    state = {
        open: false,
        value: 0,
    };
    
    componentDidMount () {
        // let s = movie()
        // // 비동기 
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
                            <Tab label="home" icon={<PhoneIcon />} onClick={() => {history.push('/')}} />
                            <Tab label="List" icon={<FavoriteIcon />} />
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
export default withRouter(withStyles(styles, { withTheme: true })(Root));