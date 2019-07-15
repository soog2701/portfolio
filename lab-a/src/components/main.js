import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import { unstable_Box as Box } from '@material-ui/core/Box';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    visual: {
        width: '100%',
        height: '800px',
        backgroundImage: `url(https://cdn.pixabay.com/photo/2018/09/02/13/41/hot-air-balloon-3648832_960_720.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    visualCont: {
        height: '100%',
    },
    visualTitle: {
        // position: 'absolute'
        color: theme.palette.primary.contrastText
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
                <Grid item xs={12} className={classes.visual}>
                    <div display="flex" flexDirection="colum">
                        <div className={classes.visual}>
                            <Grid container className={classes.visualCont} justify="center" alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="h3" className={classes.visualTitle} gutterBottom>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                        Aenean commodo ligula eget dolor.
                                    </Typography>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" className={classes.visualTitle} gutterBottom>
                                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" className={classes.visualTitle} gutterBottom>
                                            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. 
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
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