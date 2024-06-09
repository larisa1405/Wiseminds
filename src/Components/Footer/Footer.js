import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container-footer">
                    <div>
                        <h6>SERVICES</h6>
                        <ul>
                            <li><a href="#">Email</a></li>
                            <li><a href="#">Telephone</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6>LEGAL</h6>
                        <ul>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6>FOLLOW US</h6>
                        <div className="social">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                        </div>

                    </div>
                </div>
                <p className="copyright"> &copy; Copyright All Rights reserved.</p>
            </div>
        </>
    )
}

export default Footer;