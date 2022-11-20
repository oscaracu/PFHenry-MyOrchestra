import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import * as Yup from 'yup';
import MainNavBar from '../frontend/components/MainNavBar';
import Footer from "../frontend/components/Footer";
import styled from "styled-components";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0'


 const StyledForm = styled.div
 `background-image: url("/bg_01.jpg");
 background-size: cover;
 background-repeat: no-repeat;
 background-position: 0 -100px;
 .form {
    box-sizing: border-box;
    margin: 25px auto;
    width: 100%;
    max-width: 1440px;
    display: grid;
    grid-template-columns: repeat(16, minmax(0, 1fr));
    gap: 24px;
    padding: 0 80px;

    .fields-container {
        grid-column: 5/13;
        grid-row: 1;
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 24px;
        padding: 120px 0px;
        margin: 25px;

        .input {
            display: block;
            width: 100%;
            font-family: "Lato";
            font-size: 0.9em;
            padding: 10px 15px;
            border-radius: 12px;
            border: none;
          }

          label,
        .error {
        padding: 6px;
        display: block;
        color: white;
        font-size: 1em;
        text-align: center;
      }

      .error {
        margin: 0;
        text-align: unset;
        margin-bottom: -12px;
      }

      .email-field {
        grid-column: 1/7;
        grid-row: 1;
      }

      .password-field {
        grid-column: 1/7;
        grid-row: 2;
      }

      .boton {
        grid-column: 1/4;
        grid-row: 3;
      }

      .botonGoogle {
        grid-column: 4/7;
        grid-row: 3;
        text-align: right;
      }

      .botonRegistro {
        grid-column: 1/7;
        grid-row: 4;
        text-align: center;
        font-size: 1.5 em;


      }

      .submitted {
        font-family: "Lato";
        color: white;
        background-color: transparent;
        border: 1px solid white;
        font-size: 1.1em;
        padding: 12px 24px;
        border-radius: 12px;

        :hover {
          cursor: pointer;
          border-color: gray;
          color: gray;
        }
      }


  }
}
` 




export default function LoginUser () {
    const router = useRouter();
    const { user, error, isLoading } = useUser()


    const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return(
        <>
    <MainNavBar/>
    <StyledForm>
    
     <Formik 
        initialValues={{
        email: "",
        password: "",
        }}
        validationSchema={Yup.object({
                  email: Yup.string()
                  .email("Correo inválido")
                  .required("Ningún correo ingresado"),
                  password: Yup.string()
                  .min(8)
                  .matches(
                    passwordRegex,
                    `La contraseña debe tener al menos 8, un dígito, al menos una minúscula y al menos una mayúscula.
                    NO puede tener otros símbolos.`
                  )
                  .required("Ninguna contraseña ingresada"),
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
        
        <Form className="form">
            <div className="fields-container">
            <div className="email-field">
                <Field 
                name="email"
                type="text"
                placeholder="Email"
                className="input"

                />
                  <p className="error">
                  <ErrorMessage name="email" className="errorMessage" />
                </p>
            </div>
            <div className="password-field">
                <Field 
                 name="password"
                 type="password"
                 placeholder="Contraseña"
                 className="input"
                />
                <p className="error">
                  <ErrorMessage name="password" className="errorMessage" />
                </p>
            </div>
            
            <div className="botonGoogle">
                <button type="submit" className="submitted" onClick={() => router.push('/api/auth/login')}> Iniciar Sesion </button>
            </div>
            <div className="botonRegistro">
                <label>
                ¿Todavía no tienes una cuenta?
                  <Link href="/signup">Regístrate aquí</Link>
                </label>
                 
              
            </div>
            </div>
             
            
        </Form>
        
     </Formik>
     <Footer/>
    </StyledForm>
    </>

    )

}