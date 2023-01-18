import {AddToCart,ClearCart,GetCart,
    getorders,
    loadproductsdescription,
        RemoveFromCart, setDeliveryType,
        setLogin, setLogout, SetProducts, 
        UpdateCart,updateUser} from './../type/index'
import urls from "./../../properties"

const initialState = {
    cart:[],
    products:[],
    isLoggedIn:false,
    username:"User",
    token:"",
    address:"",
    mobile:"",
    fname:"",
    lname:"",
    server:urls.node_server_url+"/",
    email:"",
    deliveryAction:"Delivery",
    counter:0,
    orders:[]
};

function rootReducer(state = initialState, action) {
    
    if(action.type===AddToCart){
        
        let cart = state.cart;
        let p = action.payload;

        let data = cart.filter(product=>{
            if(product.id == p.id){
                return false;
            }
            else{
                return true;
            }
        });

        data.push(p);

        return Object.assign({},state, {
            cart: data
          });
    }

    if(action.type === setDeliveryType){
        return Object.assign({},state,{deliveryAction:action.payload});
    }

    if(action.type === ClearCart ){
        return Object.assign({},state,{cart:[]});
    }

    if(action.type === UpdateCart){
        return Object.assign({},state,{cart:action.payload});
    }

    if(action.type === updateUser){
        return Object.assign({},state,{
            fname:action.payload.fname,
            lname:action.payload.lname,
            email:action.payload.email,
            address:action.payload.address,
            mobile:action.payload.phone,
            username:action.payload.fname+" "+action.payload.lname
        });
    }

    if(action.type === getorders){
        return Object.assign({},state, {
            orders: action.payload.orders
        });
    }

    if(action.type === RemoveFromCart){
        let id = action.payload;
        
        let data = state.cart.filter(cartite=>{
            if(cartite.id === id) return false;
            else return true;
        });

        return Object.assign({},state,{cart:data});
    }

    if(action.type === SetProducts){
        return Object.assign({},state,{
            products:action.payload
        });
    }

    if(action.type === GetCart){
       return state.cart;
    }

    if(action.type===setLogin){
        return Object.assign({},state,{
            isLoggedIn:true,
            username:action.payload.username,
            token:action.payload.token,
            fname:action.payload.fname,
            lname:action.payload.lname,
            address:action.payload.address,
            mobile:action.payload.mobile,
            email:action.payload.email
        });
    }
    
    if(action.type === loadproductsdescription){
        let counter = state.counter+1;
        return Object.assign({},state,{
            counter:counter
        })
    }

    if(action.type===setLogout){
        return Object.assign({},state,{isLoggedIn:false,username:"Not Login",token:""});
    }

    return state;
};

export default rootReducer; 