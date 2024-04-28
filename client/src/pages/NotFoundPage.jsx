import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <Link to="/" className="logout-icon">
        <RiLogoutBoxLine size={30} color="#1DB13E" />
      </Link>
      <h1>Not Found Page</h1>
    </section>
  );
}

export default NotFoundPage;
