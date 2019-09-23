import 'axios'
import Axios from 'axios'

export default function getUser(email, password){
    return Axios( 
        {
            method: 'post',
            url: 'api/users/login',
            baseURL: 'http://localhost:8000/',
            data: {
                email,
                password
            }
        }
    )
}