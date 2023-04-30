import {Fragment, useState} from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
  Typography,
  Button
} from '@mui/material'
import OnlineIndicator from './OnlineIndicator'
import AuthModal from './AuthModal'
import {useAuth} from '../contexts/AuthContext'
import Html5QrcodePlugin from "html5-qrcode";
import Image from '../img/image.png'
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';

export default function Header() {
  const {isLoggedIn, account, logout} = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)
  const [popover, setPopover] = useState(false)
  const [authModal, setAuthModal] = useState(false)
  const [register, setRegister] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false);

  const openPopover = (e) => {
    setPopover(true)
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setPopover(false)
    setAnchorEl(null)
  }

  const clickLogin = () => {
    setRegister(false)
    setAuthModal(true)
    closePopover()
  }

  const clickRegister = () => {
    setRegister(true)
    setAuthModal(true)
    closePopover()
  }

  const toggleReviewForm = () => {
    setShowReviewForm(prevState => !prevState);
  }

  return (
    <>

      <Popover
        anchorEl={anchorEl}
        open={popover}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <List style={{ minWidth: "100px" }}>
          <ListSubheader style={{ textAlign: "center" }}>
            Hello, {isLoggedIn ? account.username : "Guest"}
          </ListSubheader>

          {isLoggedIn ? (
            <ListItemButton onClick={logout}>Logout</ListItemButton>
          ) : (
            <Fragment>
              <ListItemButton onClick={clickLogin}>Login</ListItemButton>
              <ListItemButton onClick={clickRegister}>Register</ListItemButton>
            </Fragment>
          )}
        </List>

        
      </Popover>

      <AuthModal
        open={authModal}
        close={() => setAuthModal(false)}
        isRegisterMode={register}
        toggleRegister={() => setRegister((prev) => !prev)}
      />


<header class="text-white bg-gray-900 body-font px-0 py-0  ">
        <div class="container mx-auto flex flex-wrap p-0 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img src={Image} class="flex h-16 items-center mx-3 rounded-3xl" alt=""/>
            <span class="ml-3 text-2xl">FlavourFix</span>
          </a>
          <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <Button color="inherit" className=' py-0 text-white px-20 rounded-2xl' onClick={toggleReviewForm}>Reviews</Button>
            {showReviewForm && <ReviewForm />}
          
          </nav>
          <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          <IconButton onClick={openPopover}>
      <div className=' py-0 text-white px-0 text-sm rounded-2xl' src={account?.username || ""} alt={account?.username || ""}>Login/Signup</div>
  </IconButton>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>

</>
  )
}
