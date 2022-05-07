import { Link } from 'react-router-dom';

const NavBar = () => {
 return (
     <nav>
         <ul>
             <li className='nav-link'>
                 <Link to="/">Home</Link>
             </li>
             <li className='nav-link'>
                 <Link to="/favorite">Favorite</Link>
             </li>
             <li className='nav-link'>
                 <Link to="/completed">Completed</Link>
             </li>
             <li className='nav-link'>
                 <Link to="/new">New</Link>
             </li>
         </ul>
     </nav>
 )
}
export default NavBar