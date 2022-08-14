import Header from "./Header";
import Footer from "./Footer";
import './Layout.css'

export default function Layout(props) {
    return (
        <div className="layout">
            <div id="wrapper">
                <Header mypage={props.mypage} />
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}