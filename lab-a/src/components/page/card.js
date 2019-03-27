import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    cardlist: {
        marginBottom: '10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});
class MediaControlCard extends React.Component {
    state = {
        spacing: '16',
    };
    
    createList = (classes, theme) => {
        let list = []
        for(let i = 0; i < 3; i++) {
            list.push(
            <Card className={classes.cardlist} key={i}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="Previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="Play/pause">
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton>
                        <IconButton aria-label="Next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </div>
                </div>
            </Card>
            )
        }
        return list
    }
    render() {
        const { classes, theme } = this.props;
        // const { spacing } = this.state;
        return (
            <Grid container spacing={24}>
                <Grid item xs={3}>
                    {this.createList(classes, theme)}
                </Grid>
                <Grid item xs={3}>
                    {this.createList(classes, theme)}
                </Grid>
                <Grid item xs={3}>
                    {this.createList(classes, theme)}
                </Grid>
                <Grid item xs={3}>
                    {this.createList(classes, theme)}
                </Grid>
            </Grid>
        );
    }
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);