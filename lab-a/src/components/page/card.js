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

import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
// import jsonp from 'jsonp';

const styles = theme => ({
    root:{
        marginTop: '20px'
    },
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

    getNews() {
      // axios.defaults.proxy = {
      //   host: 'http://localhost',
      //   port: 3000,
      // };
      let news = axios.get('https://openapi.naver.com/v1/search/news.xml?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim',       
        { headers: {
          'Content-Type': 'plain/text',
          'X-Naver-Client-Id': 'AzWO1JE9eGL8a4Gj7ma_', 
          'X-Naver-Client-Secret': '0aw5RZfSFX',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'    
          },
          adapter: jsonpAdapter,
        }
      )
      news.then(res => {
        console.log(res)
      }).catch((error) => {
        console.log('error ' + error);
      });
      // jsonp('https://openapi.naver.com/v1/search/news.xml?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim', 
      //   { headers: {
      //     'Content-Type': 'plain/text',
      //     'X-Naver-Client-Id': 'AzWO1JE9eGL8a4Gj7ma_', 
      //     'X-Naver-Client-Secret': '0aw5RZfSFX',
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      //     'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'    
      //     },
      //   }
      // , (err, data) => {
      //   if (err) {
      //     console.error(err.message);
      //   } else {
      //     console.log(data);
      //   }
      // });
    }

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
        this.getNews()
        return (
            <Grid container spacing={0} className={classes.root}>
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