import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWhatsapp,
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css"
import { Link } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
    return (
        <footer className=" text-light py-4 mt-5 shadow">
            <div className="container">
                <div className="row align-items-center text-center text-lg-start">

                    {/* Brand & Copyright */}
                    <div className="col-lg-6 mb-3 mb-lg-0">
                        <Link to="/" className="logo  flex-grow-1">
                            <div className='icon'>
                                <FontAwesomeIcon icon={faCartShopping}  />
                            </div>
                            <h2>JIVARA</h2>
                        </Link>                        <p className="mb-0 copyright">
                            © 2025 <span className="dev-name">Mahmood Aqaad</span>. All rights reserved.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="col-lg-6">
                        <div className="d-flex gap-4 justify-content-center justify-content-lg-end social-icons">

                            <a
                                href="https://wa.me/+970599923041"
                                target="_blank"
                                rel="noreferrer"
                                className="icon whatsapp"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </a>

                            <a
                                href="https://github.com/mahmoodaqaad"
                                target="_blank"
                                rel="noreferrer"
                                className="icon github"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/%D9%85%D8%AD%D9%85%D9%88%D8%AF-%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%AF-528463291/"
                                target="_blank"
                                rel="noreferrer"
                                className="icon linkedin"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
