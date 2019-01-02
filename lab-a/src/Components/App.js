import React from "react";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};
class App extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton  color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <p>React here!</p>
            </div>
        );
    }
}
// const App = () => {
//     const { classes } = this.props;
//     return (
//         <div>
//             <p>React here!</p>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//                         <MenuIcon />
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     );
// };
App.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
