/** 
    *!  Burada giriş yapma ve kayıt olma ekranını ayarlıyoruz. G
    */
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

/*import signinImage from '../assets/signup.jpeg';*/

const cookies = new Cookies();
/** 
    *!  Girilen bilgier için değişken belirleniyor
    */
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}
/** 
    *!  Girilen bilgiler belirlenen değişkenlere atanıyor. Axios kullanarak HTTP Request ile veri tabanına post ediliyor.
    */

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://mbu-ellamchat.herokuapp.com/auth';
        

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Kayıt Ol' : 'Giriş Yap'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Ad Soyad</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Ad Soyad"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Kullanıcı Adı</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Kullanıcı Adı"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Telefon Numarası</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Telefon Numarası"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Şifre</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Şifre"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Şifre Onay</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Şifre Onay"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Kayıt Ol" : "Giriş Yap"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Zaten bir hesabın mı var?" 
                             : "Hesabın ok mu?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Giriş Yap' : ' Kayıt Ol'}
                             </span>
                        </p>
                    </div>
                </div> 
                <div style={{textAlign:"center", color:"white", marginTop:30}}>
                    <span>Hakan Emre Yeşil - 1821012010</span>
                    <br />
                    <span>Muaz Erdem Yiğit - 1821012046</span>
                    <br />
                    <span>Ahsen Ümit Çelik - 1821012017</span>
                </div>
            </div>
            {/* <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div> */}
        </div>
    )
}

export default Auth
