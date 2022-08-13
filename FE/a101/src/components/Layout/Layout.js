import Header from "./Header";
import Footer from "./Footer";
import './Layout.css'

export default function Layout(props) {
    return (
        <div className="layout">
            <Header mypage={props.mypage} />
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>
    )
}