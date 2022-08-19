import Cookies from 'universal-cookie';


const cookies = new Cookies();

export const setMyToken = (token) => {
    cookies.set('token', token, 
        { path: '/',secure: true,sameSite :true}
    );
    console.log(cookies.get('token'));
};

export const getAuthToken = () => {
    if (cookies.get('token')===undefined){
        return '';
    }
    return cookies.get('token');
};