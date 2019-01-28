import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        marginTop: '20px'
    }
});

class Login extends React.Component {
    state = {
        id: '',
        password: ''
    };
    
    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <Grid container item xs={12} justify='center'>
                    <FormControl>
                        <Grid container spacing={8} justify='center'>
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-id" label="Login" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-password" label="Password" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} justify='center'>
                            <Grid item>
                                <Button variant="contained" size="small" color="primary" className={classes.margin}>
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

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Login);