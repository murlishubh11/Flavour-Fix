import { Fragment, useState } from 'react';
import { Dialog, DialogTitle, TextField, Button, CircularProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const textFieldSx = { mx: 2, my: 0.5 };
const radioSx = { color: 'purple' };
const buttonSx = { backgroundColor: 'blueviolet', color: 'white', '&:hover': { backgroundColor: 'purple' } };

export default function AuthModal({ open, close, isRegisterMode, toggleRegister }) {
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('user'); // Default role is 'user'
  const [selectedCookStyle, setSelectedCookStyle] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  }

  const handleCookStyleChange = (e) => {
    setSelectedCookStyle(e.target.value);
  }

  const clickSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if(isRegisterMode) {
        // Add the selected role and cookstyle to the formData before calling register()
        formData.role = selectedRole;
        if(selectedRole === 'user') {
          formData.cookstyle = selectedCookStyle;
        }
        await register(formData);
      } else {
        await login(formData);
      }
      close();
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const disabledLoginButton = !formData['username'] || !formData['password'];
  const disabledRegisterButton = !formData['username'] || !formData['password'] || (selectedRole === 'user' && !selectedCookStyle);

  return (
    <Dialog open={open} onClose={close}>
      {isRegisterMode ? (
          <Fragment>
          <RegisterForm formData={formData} handleChange={handleChange} />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ color: 'blueviolet' }}>Role</FormLabel>
            <RadioGroup row aria-label="role" name="role" value={selectedRole} onChange={handleRoleChange}>
              <FormControlLabel value="user" control={<Radio sx={radioSx} />} label="User" />
              <FormControlLabel value="admin" control={<Radio sx={radioSx} />} label="admin" />
            </RadioGroup>
          </FormControl>
          {selectedRole === 'user' && (
            <div className="text-2xl bg-amber-200 px-2 py-2 font-bold mb-4">
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend" sx={{ color: 'blueviolet' }}>Cook Style</FormLabel>
              <RadioGroup row aria-label="cookstyle" name="cookstyle" value={selectedCookStyle} onChange={handleCookStyleChange}>
                <FormControlLabel value="Indian" control={<Radio sx={radioSx} />} label="Indian" />
                <FormControlLabel value="Chinese" control={<Radio sx={radioSx} />} label="Chinese" />
                <FormControlLabel value="Italian" control={<Radio sx={radioSx} />} label="Italian" />
              </RadioGroup>
            </FormControl>
            </div>
          )}
        </Fragment>
      ) : (
        <LoginForm formData={formData} handleChange={handleChange} />
      )}

      {error && <span className="error">{error}</span>}

      {loading ? (
        <center>
          <CircularProgress color="inherit" />
        </center>
      ) : (
        <Button class="hover:bg-blue-200  px-2 py-2 cursor-pointer  "
          onClick={clickSubmit}
          disabled={isRegisterMode ? disabledRegisterButton : disabledLoginButton}
        >
          {isRegisterMode ? 'Register' : 'Login'}
        </Button>
      )}

      <Button onClick={toggleRegister}>
        {isRegisterMode ? 'I already have an account' : "I don't have an account"}
      </Button>
    </Dialog>
  );
}


/////////////////////////////////////////////////////////////////////////

function LoginForm({ formData, handleChange }) {
  return (
    <Fragment>
      <DialogTitle className="text-2xl  font-bold bg-slate-400 text-gray-800 mb-4">Login to your account</DialogTitle>

      <TextField
        label='Username'
        name='username'
        type='text'
        value={formData['username'] || ''}
        onChange={handleChange}
        variant='filled'
        className=" text-gray-800 rounded-lg mb-4 px-4 py-2 w-full"
        required
      />
      <TextField
        label='Password'
        name='password'
        type='password'
        value={formData['password'] || ''}
        onChange={handleChange}
        variant='filled'
        className="  rounded-lg mb-4 px-4 py-2 w-full"
        required
      />
    </Fragment>
  )
}
/////////////////////////////////////////////////////////////////
function RegisterForm({ formData, handleChange }) {
  return (
    <div className="text-2xl bg-amber-200 px-2 py-2 font-bold mb-4"> 
    <Fragment>
      <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">Create a new account</DialogTitle>

      <TextField
        label='Username'
        name='username'
        type='text'
        value={formData['username'] || ''}
        onChange={handleChange}
        variant='filled'
        className="bg-blue-200 text-gray-800 rounded-lg mb-4 px-4 py-2 w-full"
        required
      />
      <TextField
        label='Password'
        name='password'
        type='password'
        value={formData['password'] || ''}
        onChange={handleChange}
        variant='filled'
        className="bg-blue-200 text-gray-800 rounded-lg mb-4 px-4 py-2 w-full"
        required
      />
    </Fragment>
    </div>
  )
}