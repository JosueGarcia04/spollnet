import React, { useState } from 'react';
import Navbar from '../../components/general/navBar';
import Footer from '../../components/general/footer';
import { Input } from '../../components/forms/input';
import { Label } from '../../components/forms/label';
import { Forgot } from '../../components/forms/Sign up/forgotPassword';
import { LinkRegister } from '../../components/forms/login/linkForRegister';
import RegisterButton from '../../components/forms/Sign up/registerButton';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [mail, setEmail] = useState('');
    const [contra, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validations = () => {
        const errors = {};
        if (!mail) errors.mail = 'Completa el campo de correo electrónico';
        if (!contra) errors.contra = 'Completa el campo de contraseña';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validations();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: mail,
                password: contra
            });
            console.log(response.data);
            if (response.data.msg) {
                Swal.fire({
                    title: "¡Bien!",
                    text: "Haz iniciado sesión",
                    icon: "success"
                });
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Algo salio mal",
                text: 'Error al iniciar sesion',
                error,
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="h-screen bg-black flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
                <div className="w-full sm:max-w-md p-5 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-center font-bold">
                            <Label htmlFor="emailAdress">Correo electronico </Label>
                            <Input
                                id='emailAdress'
                                name='email'
                                type='email'
                                value={mail} onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors({ ...errors, mail: '' });
                                }}
                            />
                            {errors.mail && <p className="text-red-500">{errors.mail}</p>}
                        </div>
                        <div className="mb-4 text-center font-bold">
                            <Label htmlFor="password">Contraseña </Label>
                            <Input
                                id='password'
                                name='password'
                                type='password'
                                value={contra} onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors({ ...errors, contra: '' });
                                }}
                            />
                            {errors.contra && <p className="text-red-500">{errors.contra}</p>}
                        </div>
                        <div className="mt-8">
                            <RegisterButton text="Iniciar Sesión" />
                        </div>
                        <div className='mt-4'>
                            <Forgot text="¿Olvidaste tu contraseña?" />
                        </div>
                        <div className='mt-4'>
                            <LinkRegister text="¿Aun no tienes una cuenta?" />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
