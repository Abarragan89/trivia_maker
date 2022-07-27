import  { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import '../Navigation/navigation.css';
import Auth from '../../utils/auth'

function NavLinks({ closeMobileMenu,isMobile }) {

    function closeHamburger () {
        if(isMobile) {
            closeMobileMenu();
        }
    }
    // animation for nav NavLinks
    const animateFrom = { opacity: 0, y:-40 }
    const animateTo = { opacity: 1, y: 0 }
    return (
        <ul>
            <motion.li 
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.05}}
            onClick={closeHamburger}
            className={'link-el'}
            ><NavLink to='/' className={'link-el'}>Home</NavLink></motion.li >

            <motion.li  
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.1}}
            className={`link-el`}
            onClick={closeHamburger}
            ><NavLink to='/create-game' className={'link-el'}>Create</NavLink></motion.li >

            <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.20}}
            className={`link-el`} 
            onClick={closeHamburger}
            ><NavLink to='/my-games' className={'link-el'}>Library</NavLink></motion.li >

            <motion.li  
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.30}}
            className={`link-el`} 
            onClick={closeHamburger}
            ><NavLink onClick={() => Auth.logout()} to='/' className={'link-el'}>Logout</NavLink></motion.li >
        </ul>
    );
}
export default NavLinks;