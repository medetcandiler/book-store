import { Link } from "react-router-dom";
import { HiOutlineBackspace } from "react-icons/hi2";


const PrevButton = () => {
  return (
    <Link to="/" className="fixed top-6 left-6">
      <HiOutlineBackspace size={30} />
    </Link>
  )
}

export default PrevButton
