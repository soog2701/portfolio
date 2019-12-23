import React, { Component, useEffect } from 'react'
// css
import styles from "../static/css/layout.scss"


export default function LayoutHead (props) {    
    const { goLogin } = props;
    return (       
        <div className={styles['layout-head']}>
            <div className={styles['layout-head--top']}>
                {/* 상단 */}
                <div className={styles['layout-head-wrap']}>
                    <div className={styles['layout-head--top-left']} >
                        logo
                    </div>
                    <div className={styles['layout-head--top-right']} >
                        <ul>
                            <li><a href="#">일정만들기</a></li>
                            <li><a href="#">사용법</a></li>
                            <li><a href="#" onClick={goLogin}>로그인</a></li>
                            <li><a href="#">페이스북</a></li>
                            <li><a href="#">구글</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles['layout-head--bottom']}>
                {/* 하단 */}
                <div className={styles['layout-head-wrap'] +' '+ styles['column'] }>
                    <div className={styles['layout-head--bottom--list']}>
                        <ul>
                            <li><a href="#">추천콘텐츠</a></li>
                            <li><a href="#">여행핫딜</a></li>
                            <li><a href="#">여행꿀팁</a></li>
                            <li><a href="#">커뮤니티</a></li>
                            <li><a href="#">여행일정</a></li>
                            <li><a href="#">가볼만한 곳</a></li>
                            <li><a href="#">맛집</a></li>
                            <li><a href="#">숙소</a></li>
                            <li><a href="#">항공권 조회</a></li>
                            <li><a href="#">캠페인</a></li>
                            <li><a href="#" className={styles['layout-head--bottom--list-point']}>캐쉬백</a></li>
                        </ul>
                    </div>
                    <div className={styles['layout-head--bottom--search-wrap']}>
                        <input className={styles['layout-head--bottom--search-left']} name="" />
                        <input className={styles['layout-head--bottom--search-right']} name="" />
                        <button className={styles['layout-head--bottom--search']}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
