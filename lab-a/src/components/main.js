import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
})

class Main extends React.Component {
    state = {
    };
    render() {
        return (
            <Grid container spacing={24}>
                
            </Grid>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);