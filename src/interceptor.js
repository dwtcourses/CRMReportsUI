import axios from 'axios'
import toasted from '@/toasted.js'
import Urls from '@/config.js'
     
    axios.interceptors.request.use(function (config) {
     const token = localStorage.getItem('token');
        if(token) 
        {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
        else
        {
            location.replace(Urls.loginUrl);   
            return null;
        }

    }, function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        return response;

        }, function (error) {
            if(error.response){
            switch(error.response.status)
                {
                    case 408: toasted.showAlert('Request timeout')
                    return Promise.reject("Request timeout")
                    
                    case 401: location.replace(Urls.loginUrl)
                    return Promise.reject("No session Redirecting to Login")
                    
                    case 403: toasted.showAlert('You dont have permissions')
                    return Promise.reject("You dont have permissions")
                    
                    case 500: toasted.showAlert('Some error occured')
                    return Promise.reject("Some error occured")
                    
                    default: toasted.showAlert('Some error has occurred')
                    break;
                }
            }
            else
            {
                toasted.showAlert('No connection with API Gateway')
                return Promise.reject('No connection with API Gateway');
            }
           
            
        });