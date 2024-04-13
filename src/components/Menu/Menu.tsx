import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content [&>*]:my-1">
      {/* Sidebar content here */}
      <li>
        <Link to="/">Basic Info</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/who-are-we">Who Are We</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/meet-the-team">Meet The Team</Link>
      </li>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <Link to="/profile">Company Profile</Link>
      </li>
      <li>
        <Link to="/services">Our Services</Link>
      </li>
      <li>
        <Link to="/gallery">Gallery</Link>
      </li>
      
      <li>
        <Link to="/legal-documents">Legal Documents</Link>
      </li>
      
      <li>
        <Link to="/certifications">Certifications</Link>
      </li>
      
    </ul>
  )
}

export default Menu