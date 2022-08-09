import './Main.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Calendar from './../components/Calendar/Calender'
import CommunityListPhoto from '../components/Community/CommunityListPhoto'
import CommunityListFrame from '../components/Community/CommunityListFrame'
import Layout from '../components/Layout/Layout'


export default function Main(props) {
    const navigate = useNavigate()

    const [type, setType] = useState(true)  // true면 photo, false면 frame
    
    useEffect(() => {
        if (props.category) {
            if (props.category==='frame') {
                setType(false)
            } else if (props.category==='photogroup') {
                setType(true)
            }
        }
    }, [])

    
    return (
        <Layout>
            <main>
                <div className="main-community">
                    <div className='gallery-tab'>
                        <div className='gallery-tab-btn' onClick={() => setType(true)} style={{backgroundColor: type ? '#f5737f' : ''}}>포즈</div>
                        <div className='gallery-tab-btn' onClick={() => setType(false)} style={{backgroundColor: !type ? '#f5737f' : ''}}>프레임</div>
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