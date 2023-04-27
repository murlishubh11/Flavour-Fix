import {useAuth} from './contexts/AuthContext'
import Header from './components/Header'
import Chef from './components/Chef'
import Cashier from './components/Cashier'
import './index.css'

export default function App() {
  const {isLoggedIn} = useAuth()

  return (

    <div className='App'>
      <Header />

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}
    </div>
  )
}

const LoggedInText = () => {
  const { account } = useAuth();

  return (
    <>
      {account.role === 'admin' && <Cashier />}
      {account.role === 'user' ? <Chef /> : null}
    </>
  );
};
const LoggedOutText = () => {
  return (
    <>
      <head>
        <title>Mr. Food</title>
      </head>
      <body className="bg-gray-100">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-lg p-12 max-w-md w-full mx-4">
            <h1 className="text-4xl font-bold mb-6">Welcome to Mr. Food</h1>
            <p className="text-gray-600 mb-10">Indulge in delicious meals and experience the best of fine dining at Mr. Food. We serve exquisite cuisines made from fresh, locally-sourced ingredients.</p>
            <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">Explore Our Menu</a>
          </div>
        </div>
      </body>
    </>
  );
}

