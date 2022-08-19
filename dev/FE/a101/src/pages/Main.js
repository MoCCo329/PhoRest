import './Main.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CommunityListPhoto from '../components/Community/CommunityListPhoto'
import CommunityListFrame from '../components/Community/CommunityListFrame'
import Layout from '../components/Layout/Layout'

import { setLikeRecent } from '../store/modules/community'


export default function Main(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [typeMain, setTypeMain] = useState(true)  // true면 photo, false면 frame

    useEffect(() => {
        if (props.category) {
            if (props.category==='frame') {
                setTypeMain(false)
            } else if (props.category==='photogroup') {
                setTypeMain(true)
            }
        } else {
            setTypeMain(true)
            dispatch(setLikeRecent(true))
        }
    }, [props.category])


    return (
        <Layout>
            <main>
                <div className="main-community">
                    <h3>{typeMain ? '포즈' : '프레임'} 게시판</h3>
                    <div className='gallery-tab'>
                        <div className='gallery-tab-btn' onClick={() => navigate('/photogroup')} style={{backgroundColor: typeMain ? '#f5737f' : ''}}>포즈</div>
                        <div className='gallery-tab-btn' onClick={() => navigate('/frame')} style={{backgroundColor: !typeMain ? '#f5737f' : ''}}>프레임</div>
                    </div>
                        {
                            typeMain ?
                            <div>
                                <CommunityListPhoto />
                            </div> :
                            <div>
                                <CommunityListFrame />
                            </div>
                        }
                </div>
            </main>
        </Layout>
    )
}