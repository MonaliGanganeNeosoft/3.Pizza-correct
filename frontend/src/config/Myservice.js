import axios from 'axios';
import {MAIN_URL} from './Url'
let token = localStorage.getItem('_token')
export function getUsers(){
    return axios.get(`${MAIN_URL}users`)
}
export function getUser(email){
    return axios.get(`${MAIN_URL}user/${email}`)
}
export function getPizzaData(){
    return axios.get(`${MAIN_URL}pizzadata`,{
        headers:{"authorization": `Bearer ${token}`}
    })
}
export function getOrders(){
    return axios.get(`${MAIN_URL}getorders`)
}
export function addSignup(data){
    return axios.post(`${MAIN_URL}signup`, data)
}
export function login(data){
    return axios.post(`${MAIN_URL}login`, data)
}
export function checkoutOrder(data){
    return axios.post(`${MAIN_URL}checkout`, data)
}
export function deleteUser(index){
    return axios.delete(`${MAIN_URL}deleteuser/${index}`)
}
export function updateUser(id,data){
    return axios.put(`${MAIN_URL}updateuser/${id}`,data)
}