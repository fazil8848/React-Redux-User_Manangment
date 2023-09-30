import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutDetails } from "../../../Redux/UserSlice/UserSlice";
import { toast, ToastContainer } from "react-toastify";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(
      logoutDetails({
        id: "",
        name: "",
        email: "",
        mobile: "",
      })
    );
    navigate("/");
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="button"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to={localStorage.getItem("token") ? "/profile" : "/login"}
          className="flex items-center"
        >
          Profile
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <Link to={"/login"} className="flex items-center">
            Redux-Home
          </Link>
        </Typography>
        { localStorage.getItem('token') ?
          <div className="float: right;">{navList}</div> 
          : <></>
        }

        {localStorage.getItem("token") ? (
          <Button
            onClick={handleLogout}
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Logout</span>
          </Button>
        ) : (
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>
              <Link to={"/login"}>Login</Link>
            </span>
          </Button>
        )}

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}

          {localStorage.getItem("token") ? (
            <Button
              onClick={handleLogout}
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
            >
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
            >
              <span>Login</span>
            </Button>
          )}
        </div>
      </MobileNav>
      <ToastContainer />
    </Navbar>
  );
}
