import React, { useCallback } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { useSelector, useDispatch, useStore } from "react-redux";
import { startClock, tickClock } from '../actions'

import { i18n, withTranslation } from '../i18n'
//  Link, 

const Index = (props) => {
    const { t } = props;
    console.log('props===',props);
    const dispatch = useDispatch();
    const store = useStore();
    
    // const { store, isServer } = props.ctx;
    // const t = store.dispatch(tickClock(props.ctx.isServer));
    const ts = useCallback(
        () => {
            dispatch(tickClock()); 
            console.log(store.getState());
        },
        [dispatch]
    );
    ts();
    return (
        <div>
          <p>Hello Next.js</p>
          <span>{t('h1')}</span>
        </div>
    );
}

Index.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Index.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Index);