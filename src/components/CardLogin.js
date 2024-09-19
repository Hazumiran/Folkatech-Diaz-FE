import React, { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
export default function CardLogin({ email, password, setEmail, setPassword, onLogin, namaDepan, setNamaDepan, namaBelakang, setNamaBelakang, noTelepon, setNoTelepon, passwordRegister, setPasswordRegister, konfirmasiPassword, setKonfirmasiPassword, error, handleRegister, registerError, setRegisterError, registerSuccess, setRegisterSuccess, resetForm, type, setType, setError }) {
    const [handleNext, setHandleNext] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleChangeForm = (e) => {
        e.preventDefault();
        setType(type === 'login' ? 'register' : 'login');
        resetForm();
        setHandleNext(false);
        setError(null);
        setRegisterError(null);
    }

    const handleNextForm = (e) => {
        e.preventDefault();
        setHandleNext(false);
        setError(null);
        setRegisterError(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'login') {
            onLogin();
        } else {
            if (handleNext) {
                // console.log('Form nyampe sini');
                if (passwordRegister !== konfirmasiPassword) {
                    setRegisterError('Password dan konfirmasi password tidak sesuai !');
                    return;
                } else {
                    handleRegister()
                }
            } else {
                setHandleNext(true);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            {
                type === 'login' ?
                    <>
                        <div className="card">
                            <h2>Masuk</h2>
                            <div className='form'>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="password-container">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </span>
                                    </div>
                                    <input type="submit" value="MASUK" />
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {registerSuccess && <p style={{ color: 'green' }}>{registerSuccess}</p>}
                            </div>
                            <hr className="solid"></hr>
                            <div className="footerCard">
                                <div className="footerCardBody">
                                    <p>Belum punya akun?</p>
                                    <a href="" onClick={handleChangeForm}> &nbsp; Daftar Sekarang</a>
                                </div>
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="card">
                            {!handleNext ?
                                <h2>Daftar Sekarang</h2> :
                                <h2><a href="" onClick={handleNextForm}><FaArrowLeft /> Kembali</a></h2>}
                            <div className='form'>
                                <form onSubmit={handleSubmit}>
                                    {!handleNext ?
                                        <>
                                            <input
                                                type="text"
                                                id="namadepan"
                                                name="namadepan"
                                                placeholder="Nama Depan"
                                                value={namaDepan}
                                                onChange={(e) => setNamaDepan(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                id="namabelakang"
                                                name="namabelakang"
                                                placeholder="Nama Belakang"
                                                value={namaBelakang}
                                                onChange={(e) => setNamaBelakang(e.target.value)}
                                            />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input type="button" value="SELANJUTNYA" onClick={handleSubmit} />
                                        </> :
                                        <>
                                            <input
                                                type="number"
                                                id="notelepon"
                                                name="notelepon"
                                                placeholder="Nomor Telepon"
                                                value={noTelepon}
                                                onChange={(e) => setNoTelepon(e.target.value)}
                                            />
                                            <div className="password-container">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={passwordRegister}
                                                    onChange={(e) => setPasswordRegister(e.target.value)}
                                                />
                                                <span onClick={togglePasswordVisibility}>
                                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </span>
                                            </div>
                                            <div className="password-container">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    id="konfirmasipassword"
                                                    name="konfirmasipassword"
                                                    placeholder="Konfirmasi Password"
                                                    value={konfirmasiPassword}
                                                    onChange={(e) => setKonfirmasiPassword(e.target.value)}
                                                />
                                                <span onClick={toggleConfirmPasswordVisibility}>
                                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                                </span>
                                            </div>
                                            <input type="submit" value="SUBMIT" />
                                        </>
                                    }
                                </form>
                                {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
                            </div>
                            <hr className="solid"></hr>
                            <div className="footerCard">
                                <div className="footerCardBody">
                                    <p>Sudah punya akun?</p>
                                    <a href="" onClick={handleChangeForm}> &nbsp; Masuk</a>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
