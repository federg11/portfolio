import React, { useRef } from 'react';
import {useForm} from 'react-hook-form';
import emailjs from '@emailjs/browser';
//import Swal from 'sweetalert2/dist/sweetalert2.js'
const Contact = () => {
  
  const { 
    register, 
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const form = useRef();

  const onSubmit = () => {

    emailjs.sendForm('service_vvzt2re', 'template_r86qfff', form.current, 'aTgJhi2J0VH3rccjG')
      .then((result) => {
          console.log(result.text);
          console.log("MENSAJE ENVIADO")
      }, (error) => {
          console.log(error.text);
      });
      reset();
  };

  return (

    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center p-4'>
        <form ref={form} onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>Contacto</p>
                <p className='text-gray-300 py-4'>Contáctame completando el formulario</p>
            </div>
            <input {...register('name', {required: true, minLength: 4})} className='bg-[#ccd6f6] p-2' type="text" placeholder='Nombre' name='name' />
            {errors.name?.type === 'required' && <small className='text-white'>El campo nombre no puede estar vacio</small>}
            {errors.name?.type === 'minLength' && <small className='text-white'>Ingresar mas de 4 caracteres</small>}
            <input {...register('email', { 
              required: {
                value: true,
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                    },
            })} 
            className='my-4 p-2 bg-[#ccd6f6]' 
            type="email" 
            placeholder='name@example.com' name='email' />
            {errors.email?.type === 'required' && <small className='text-white'>El campo es requerido</small>}
            {errors.email?.type === 'pattern' && <small className='text-white'>El mail no es valido</small>}
            <textarea {...register('message', {required: true, minLength: 4})} className='bg-[#ccd6f6] p-2' name="message" rows="10" placeholder='Message'></textarea>
            {errors.message?.type === 'required' && <small className='text-white'>El campo texto debe llevar un mensaje</small>}
            <button 
            type='submit' 
            value='send' 
            className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center'
            >Enviar</button>
            
        </form>
        
    </div>
  )
}

export default Contact