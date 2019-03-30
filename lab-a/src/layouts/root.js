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


import RouterView from '../router/index.js';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        // display: 'flex',
        flexGrow: 1,
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
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class Root extends Component {
    state = {
        open: false,
        value: 0,
    };
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    handleDrawerClose = () => {
        this.setState({ open: false });
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
        const { classes, theme } = this.props;
        const { open } = this.state;
        const { value } = this.state;
        const drawer = (
        <div>
            <Divider />
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </div>
        );
        return (
        <div className={classes.root}>
            <CssBaseline />
            {/* <AppBar position="fixed" 
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton  color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Movie Chart
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Item One" icon={<PhoneIcon />} />
                    <Tab label="Item Two" icon={<FavoriteIcon />} />
                    <Tab label="Item Three" icon={<PersonPinIcon />} />
                    <Tab label="Item Four" icon={<HelpIcon />} />
                    <Tab label="Item Five" icon={<ShoppingBasket />} />
                    <Tab label="Item Six" icon={<ThumbDown />} />
                    <Tab label="Item Seven" icon={<ThumbUp />} />
                </Tabs>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                {drawer}
            </Drawer>
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={12}>
                    {value === 0 && <TabContainer>Item One</TabContainer>}
                    {value === 1 && <TabContainer>Item Two</TabContainer>}
                    {value === 2 && <TabContainer>Item Three</TabContainer>}
                    {value === 3 && <TabContainer>Item Four</TabContainer>}
                    {value === 4 && <TabContainer>Item Five</TabContainer>}
                    {value === 5 && <TabContainer>Item Six</TabContainer>}
                    {value === 6 && <TabContainer>Item Seven</TabContainer>}
                    
                </Grid>
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
};
export default withStyles(styles, { withTheme: true })(Root);