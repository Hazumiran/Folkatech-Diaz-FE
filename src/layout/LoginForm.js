import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../api/Api.js';
import { register as registerService } from '../api/Api.js';
import CardComp from '../components/CardLogin.js';
const LoginForm = () => {
    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');
    const [noTelepon, setNoTelepon] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const [registerError, setRegisterError] = useState(null);

    const navigate = useNavigate();

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setNamaDepan('');
        setNamaBelakang('');
        setNoTelepon('');
        setPasswordRegister('');
        setKonfirmasiPassword('');
    };
    const handleLogin = () => {
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }
        else {
            loginService(email, password)
                .then((response) => {
                    console.log(response.data.data.token);
                    localStorage.setItem('token', response.data.data.token);
                    setSuccess('Login successful !');
                    setError(null);
                    navigate('/home');
                })
                .catch(error => {
                    setError(error.response.data.data ? error.response.data.data.password[0] : error.response.data.message);
                    setSuccess(null);
                });
        }
    };

    const handleRegister = () => {
        // console.log('isian Register adlaah ', namaDepan, email, passwordRegister, konfirmasiPassword, noTelepon);
        registerService(`${namaDepan} ${namaBelakang}`, email, passwordRegister, noTelepon)
            .then(response => {
                setRegisterSuccess('Registrasi berhasil! Silakan login !');
                setRegisterError(null);
                resetForm();
                setType('login');
            })
            .catch(error => {
                const errorMsg = error.response && error.response.data.data.name ? error.response.data.data.name : error.response.data.data.email ? error.response.data.data.email : error.response.data.data.phone ? error.response.data.data.phone : error.response.data.data.password ? error.response.data.data.password : 'Terjadi kesalahan';
                setRegisterError(errorMsg);
                setRegisterSuccess(null);
            });
    }

    return (
        <div className="login-form">
            <CardComp
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                onLogin={handleLogin}
                namaDepan={namaDepan}
                setNamaDepan={setNamaDepan}
                namaBelakang={namaBelakang}
                setNamaBelakang={setNamaBelakang}
                noTelepon={noTelepon}
                setNoTelepon={setNoTelepon}
                passwordRegister={passwordRegister}
                setPasswordRegister={setPasswordRegister}
                konfirmasiPassword={konfirmasiPassword}
                setKonfirmasiPassword={setKonfirmasiPassword}
                registerError={registerError}
                handleRegister={handleRegister}
                registerSuccess={registerSuccess}
                setRegisterSuccess={setRegisterSuccess}
                setRegisterError={setRegisterError}
                setType={setType}
                type={type}
                resetForm={resetForm}
                error={error}
                setError={setError}
            />

            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default LoginForm;