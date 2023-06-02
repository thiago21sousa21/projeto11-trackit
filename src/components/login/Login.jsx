import styled from "styled-components";
import logo from './../../assets/8tracklt.svg';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import Contexto from "../../Contexto/Contexto";

export default function Login (){
    const navigate = useNavigate();

    const {setToken, token, setPhoto} = useContext(Contexto);
    const [credencial, setCredencial] = useState({
        email: "",
        password: ""
    });

    function fazerLogin(e){
        e.preventDefault();
        console.log(credencial);
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', credencial)
            .then((ans)=>{
                console.log(ans.data);
                setToken(ans.data.token);
                setPhoto(ans.data.image)
                navigate('/hoje');
            })
            .catch((err)=>{
                console.log(err);
                alert(err.response.data.message);
            });
    }

    return(
        <CsLogin>
            <Link to='/hoje'>
                <img src={logo}/>
            </Link>
            <form onSubmit={fazerLogin}>
                <input onChange={(e)=>setCredencial({...credencial, email: e.target.value})} value={credencial.email} placeholder="email" type="email" name="" id="" />
                <input onChange={(e)=>setCredencial({...credencial, password: e.target.value})} value={credencial.password} placeholder="senha" type="password" name="" id="" />
                <button>Entrar</button>
            </form>
            <Link to='/cadastro'className="none" >
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>

        </CsLogin>);
}

const CsLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;

    width: 100%;
    height: 100vh;
    background-color: #FFFFFF;
    z-index: 20;

    img{
        margin-top: 70px;
        margin-bottom: 32px;
        width:180px;
        height: 180px;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 6px; 
        width: 80%;
        input{
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            height: 45px;
            width: 100%
        }
        button{
            background: #52B6FF;
            border: none;
            border-radius: 5px;
            height: 45px;
            font-family: 'Lexend Deca';
            font-weight: 400;
            font-size: 21px;
            line-height: 26px;
            color: #FFFFFF;            
        }
    }
    .none{
        margin-top: 25px;
        color: #52B6FF;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 14px;
    }
   
`;