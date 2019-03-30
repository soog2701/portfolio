import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {

    }
})

class Main extends React.Component {
    state = {
        spacing: 0,
    };
    render() {
        const { classes } = this.props;
        const { spacing } = this.state;
        return (
            <Grid container className={classes.root} spacing={spacing} justify="center">
                <Grid item xs={12}>
                    <span>main</span>
                </Grid>
                
                <Grid item xs={12}>
                {[0, 1, 2].map(value => (
                    <Grid key={value} item>
                        <Paper className={classes.paper} />
                    </Grid>
                    ))}
                </Grid>
                
            </Grid>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);