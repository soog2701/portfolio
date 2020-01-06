import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, useStore } from "react-redux"

import { Input, Radio  } from 'antd';

// css
import styles from "../static/css/app.scss";
import DesignInput from '../comps/DesignInput';

const Main = ({ t , click }) => (
    <div className={styles['main']}>
        {/* <a href="#" onClick={click} >logout</a> <a href="#"> {t('change-locale')}</a> */}
        <div className={styles['main-top']}>
            <div className={styles['main-top--left']}>
                <ul>
                    <li>전세계</li>
                    <li>
                        추천콘텐츠
                    </li>
                </ul>
            </div>
            <div className={styles['main-top--right']}>
                현재 <span>{'432,440'}</span>개의 여행일정과 <span>{'480,650'}</span>개의 여행명소 정보가 있습니다.
            </div>
        </div>
        <div className={styles['main-middle']}>
            <div className={styles['main-middle--left']}>
                <div className={styles['main-middle--slide']}>banner</div>
            </div>
            <div className={styles['main-middle--right']}>
                <div className={styles['main-middle--air']}>
                    <ul>
                        <li>
                            항공권조회
                        </li>
                    </ul>
                    <div className={styles['main-middle--air-box']}>
                        <label>
                            <Radio type="radio" name="air" >왕복</Radio>
                            
                        </label>
                        <label>
                            <Radio type="radio" name="air" >편도</Radio>
                            
                        </label>
                        <label>
                            <Radio type="radio" name="air" >다구간</Radio>
                            
                        </label>
                    </div>
                    <div className={styles['main-middle--air-box']}>
                        <div>
                            <span>출발지</span>
                            <Input />
                        </div>
                        <div style={{'marginLeft':'10px'}}>
                            <span>도착지</span>
                            <Input />
                        </div>
                        
                    </div>
                    <div className={styles['main-middle--air-box']}>
                        <div>
                            <span>가는날</span>
                            <Input name="startday" />
                        </div>
                        
                        <div style={{'marginLeft':'10px'}}>
                            <span>귀국</span>
                            <Input name="endday" />
                        </div>
                        
                    </div>
                    <div className={styles['main-middle--air-box']}>
                        <div>
                            <span>성인</span>
                            <select></select>
                        </div>
                        <div style={{'marginLeft':'10px'}}>
                            <span>유소아</span>
                            <select></select>
                        </div>                        
                    </div>
                    <div className={styles['main-middle--air-box']}>
                        <div>
                            <span>좌석등급</span>
                            <select></select>
                        </div>
                    </div>
                    <div className={styles['main-middle--air-box']}>
                        <button>항공권검색</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles['main-bottom']}>
            <ul>
                <li>
                    항공권조회
                </li>
            </ul>
            <div>
                content
            </div>
        </div>
    </div>
)

export default Main;