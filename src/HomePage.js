import React, { useEffect, useState } from "react";
import "./HomePage.css" ; 
import { NavLink , useNavigate } from "react-router-dom";
import {BiSearch } from "react-icons/bi" ; 
import {BiPencil} from "react-icons/bi" ; 
import {RiDeleteBin6Line} from "react-icons/ri" ; 
import {collection , addDoc , getDocs , doc , setDoc , deleteDoc} from "firebase/firestore" ; 
import { storage  , db } from "./firebase";
import Loader from "./Loader";

const  HomePge = ()=>{

    const [data , setData] = useState([])
    
   
    
    useEffect(()=>{

        let isRender = true ; 

        const uploadData = async ()=>{
            const dataUpload =   await getDocs(collection(db , "Product") )
           // console.log(dataUpload)
            dataUpload.docs.forEach((doc)=>{
                if(isRender)
               setData((prev)=>[...prev , {...doc.data() , id : doc.id}])

            
              
            })

       }

       uploadData()

      

             return ()=> isRender = false
    },[])


    const HandleDelete = async (id)=>{

         console.log(id)

       deleteDoc(doc(db , "Product" , id))

        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        }) 
    }


      console.log(data)




      return(
        <div className="HomePage">
                 <nav className="navbar navbar-expand-lg fixed-top ">
                   <div className="container">
                   <ul className="navbar-nav ">
                           <li className="nav-item"><NavLink className={"nav-link"}>Home</NavLink></li>
                           <li className="nav-item"><NavLink className={"nav-link"}>Add Product</NavLink></li>
                           <li className="nav-item"><NavLink className={"nav-link mylogout text-danger"}>Log Out</NavLink></li>
                           
                    </ul>
                   </div>

                 </nav>
                      
                       <div className="bloc1 row justify-content-around ">
                              
                                <div className="col-auto">

                                       <p>Vos Produits   <br/> 
                                       <span className="bg-dark-opact "> {data.length} produits disponibles </span></p>

                                </div>

                                <div className="col-auto">
                                   <input className="searchProduct " type={"search"} placeholder="Rechercher un produit" /> <span className="btnsearch fs-3"><BiSearch/></span>
                                </div>

                            

                         </div>

                         <div className="product">
                            
                    
                            <div className="row ">

                                {
                                    data.length > 0 ? 
                                    (
                                       data.map((elt)=>{
                                        return(

                                            <div className="col-auto productitem">
                                             <img className="myimg" src={elt.avatar} />
                                             <p className="text-center"> 
                                             <span>{elt.Name}</span> <br/>
                                             <span className="price fw-bold">{elt.prix} Cfa</span>  <br/>
                                             <span className="details">Livraison dans les 24h</span> <br/>
                                             <span className="modify text-primary"><BiPencil/></span>
                                              <span className="delete text-danger" onClick={()=>HandleDelete(elt.id)}><RiDeleteBin6Line/></span>
                                              <span className="rest">{elt.Quantite} restants</span>
                                            </p>
                                         </div>
                                        )
                                       })
     
                                    )

                                    :

                                    (
                                                  <div>
                                                     <Loader/>
                                                    </div>
                                    )
                                }

                                
                               

                                

                            </div>


                         </div>

                       
                 
        </div>
      )
}

export default HomePge ; 