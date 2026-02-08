import '../../CSS/Portfolio/Index.css';
import Logo from '../../assets/logo.png'

export default function Loader() {
    return (
        <div className="loader">
            <div className="box">
                <div className="logo">
                    <div className="svg">
                        <img src={Logo} alt="logo" width="50cm" height="50cm" />
                    </div>
                </div>
            </div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
        </div>
    )
}