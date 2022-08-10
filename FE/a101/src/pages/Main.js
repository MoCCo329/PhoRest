import './Main.css'

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CommunityListPhoto from '../components/Community/CommunityListPhoto'
import CommunityListFrame from '../components/Community/CommunityListFrame'
import Layout from '../components/Layout/Layout'

import { setLikeRecent } from '../store/modules/community'


export default function Main(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [type, setType] = useState(true)  // true면 photo, false면 frame
    
    useMemo(() => {
        if (props.category) {
            if (props.category==='frame') {
                setType(false)
            } else if (props.category==='photogroup') {
                setType(true)
            }
        } else {
            setType(true)
            dispatch(setLikeRecent(true))
        }
    }, [props.category])

    
    return (
        <Layout>
            <main>
                <div className="main-community">
                    <div className='gallery-tab'>
                        <div className='gallery-tab-btn' onClick={() => navigate("/photogroup")} style={{backgroundColor: type ? '#f5737f' : ''}}>포즈</div>
                        <div className='gallery-tab-btn' onClick={() => navigate("/frame")} style={{backgroundColor: !type ? '#f5737f' : ''}}>프레임</div>
                    </div>
                        {
                            type ?
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