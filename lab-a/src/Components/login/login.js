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

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
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
                        <InputLabel htmlFor="input-with-icon-adornment">Login ID</InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        }
                        />
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