import React from 'react';

const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="Fcontainer">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <h6 className="text-uppercase font-weight-bold">Additional Information</h6>
                        <div>For bookings, collaborations, and inquiries: <br />
                            <p>www.conferencemanagementsm.com</p>
                            Follow us on social media:
                            <ul className="list-unstyled mb-0">
                                <li>Facebook: @conferencemanagementsm</li>
                                <li>Twitter: @conferencemanagementsm</li>
                                <li>Instagram: @conferencemanagementsm</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <h6 className="text-uppercase font-weight-bold designed-by">Designed by</h6>
                        <p>
                            Arununachalesh Swaminathan
                            <br />Bharath Dondeti
                            <br />Maniesh Mathivanan
                            <br />Savitha Senthilvel
                            <br />Joshna Mary Jose
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
