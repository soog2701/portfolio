import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
// import Fab from '@material-ui/core/Fab';
// import Icon from '@material-ui/core/Icon';

// import { bindActionCreators } from "redux";
import { login } from '../../actions' //, logout, token
// import store from '../../store'

const styles = () => ({ // arg1: theme
    root: {
        flexGrow: 1,
    },
    margin: {
        marginTop: '20px'
    }
});

class LoginView extends React.Component {
    state = {
        id: 'admin',
        password: 'admin'
    };
    // componentWillMount() {
    //     let { dispatch } = this.props;
    //     console.log(this.props)
    // }
    fakeAuth = {
        isAuthenticated: false,
        authenticate(cb) {
            this.isAuthenticated = true;
            setTimeout(cb, 100); // fake async
        },
        signout(cb) {
            this.isAuthenticated = false;
            setTimeout(cb, 100);
        }
    };
    goLogin = () => {
        console.log('login')
        console.log(this.props)
        console.log(this.context)
        let user = {payload:{id: 'test2', password: '123'}}
        
        return this.props.onLogin(user)
    };
    render() {
        const { classes } = this.props; // theme
        return (
            <div className={`${classes.root} ${classes.margin}`}>
                <Grid container item xs={12} justify='center'>
                    <FormControl>
                        <Grid container spacing={8} justify='center'>
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-id" value={this.state.id} label="Login" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end" className={classes.margin} >
                            <Grid item>
                                <TextField id="input-password" value={this.state.password} label="Password" type="password" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} justify='center'>
                            <Grid item>
                                <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={this.goLogin}>
                                login
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Grid>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     user:{id: state.id, password: state.password}
// })
LoginView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
const mapDispatchToProps = { // => mapDispatchToProps는 함수가 아니고 object
    onLogin (user) {
        return login(user)
    }
};

// export default connect(undefined, mapDispatchToProps)(withStyles(styles, { withTheme: true })(LoginView));
// (mapStateToProps, actions, Component) 순서
export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(LoginView));
// export default withStyles(styles, { withTheme: true })(LoginView);