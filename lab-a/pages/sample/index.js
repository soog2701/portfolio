import React, { useCallback, useEffect } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { i18n, withTranslation } from '../i18n'

const Sample = (props) => {
    const { t } = props;
    
}

Sample.getInitialProps = async (res) => ({
    namespacesRequired: ['common'],
})

Sample.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Sample);