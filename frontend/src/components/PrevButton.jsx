import { Link } from "react-router-dom";
import { HiOutlineBackspace } from "react-icons/hi2";


const PrevButton = () => {
  return (
    <Link to="/" className="fixed top-12 left-12">
      <HiOutlineBackspace size={30} />
    </Link>
  )
}

export default PrevButton
