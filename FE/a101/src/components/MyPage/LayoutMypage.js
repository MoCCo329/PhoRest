import NavMypage from './NavMypage'
import './LayoutMypage.css'
import Footer from '../Layout/Footer'

export default function Layout(props) {
    return (
        <div className="layout-mypage">
            <NavMypage nickname={props.nickname}/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>
    )
}