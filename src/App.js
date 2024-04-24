import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';
import Papers from './components/Papers';
import Assigned from './components/Assigned';
import PapersList from './components/PapersList';
import Remaining from './components/Remaining';
import Footer from './components/Footer';
import NavbarInit from './components/Navbar';
import './App.css'

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <div className='row mt-3'>
                    <NavbarInit />
                </div>
                <div className='row mt-3 main-header'>
                    <div className='col-sm'>
                        <Papers />
                    </div>
                    <div className='col-sm'>
                        <Remaining />
                    </div>
                    <div className='col-sm'>
                        <Assigned />
                    </div>
                </div>

                
                <h3 className='mt-3'>Paper Submissions</h3>
                <div className='row '>
                    <div className='col-sm'>
                        <PapersList />
                    </div>
                </div>
                
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Footer />
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

export default App;