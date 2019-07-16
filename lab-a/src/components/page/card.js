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
import { Divider } from 'antd';

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
      list:[]
    };

    getNews() {
      let test = axios.get('http://localhost:3080/news',
      { headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'    
        },
      });
      test.then(res=>{
        const {data} = res
        this.setState({list: data.items})
        console.log(this.state.list)
      })
    }
    componentDidMount(){
      this.getNews();
    }
    render() {
        const { classes, theme } = this.props;
        const {list} = this.state;
        
        return (
            // <Grid container spacing={0} className={classes.root}>
            //     <Grid item xs={12} style={{display:'flex', flexWrap:'wrap', flexDirection:'row'}}>
            //         {list.map((item,i)=>(
            //           <Grid xs={4} style={{display:'flex', marginLeft:'10px'}}>
            //             <Card className={classes.cardlist} key={i}>
            //               <div className={classes.details}>
            //                 <CardContent className={classes.content}>
            //                   <a href={item.link}>
            //                     <Typography component="h5" variant="h5">{item.title.replace('<b>', '').replace('</b>', '').replace(/&quot;/g,'')}</Typography>
            //                   </a>
            //                 </CardContent>
            //               </div>
            //             </Card>
            //           </Grid>                      
            //         ))}
            //     </Grid>
            // </Grid>
            <div>
              {
                list.map((item,i)=>(
                  <div>
                    <a href={item.link}>{item.title.replace('<b>', '').replace('</b>', '').replace(/&quot;/g,'')}</a>
                  </div>
                ))
              }
            </div>
        );
    }
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);