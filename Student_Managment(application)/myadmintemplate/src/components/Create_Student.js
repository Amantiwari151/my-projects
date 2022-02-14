import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
export function Create_Student(props) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [marks, setMarks] = useState('');
    const [city,setCity] = useState('');
    const { id } = useParams();
        useEffect(() => {
            // console.log("hey");
            if(id){
                // console.log("inside if");
                axios.get('http://localhost:3000/student-by-Id?id=' + id).then((res) => {
                    console.log(res.data.data);
                    setName(res.data.data[0].name);
                    setEmail(res.data.data[0].email);
                    setAge(res.data.data[0].age);
                    setMarks(res.data.data[0].marks);
                    setCity(res.data.data[0].city);
                })
            }
        }, [])

    function setValue(e){
        e.target.name=="Name" && setName(e.target.value);
        e.target.name=="Email" && setEmail(e.target.value);
        e.target.name == "Age" && setAge(e.target.value);
        e.target.name == "Marks" && setMarks(e.target.value);
        e.target.name == "City" && setCity(e.target.value);
    }
    // var stId = props.match.params.id;
    
    function sendData(){
        // alert(name);
        // alert(age);
        // alert(email);
        // alert(marks);
        // alert(city);
        var s ={
            name,email,age,marks,city
        }
        console.log(s);
        if(id){
            s._id = id;
            axios.post(baseUrl + '/update-student', s).then((res) => {
                console.log(res.data);

            })
        }
        else{
            axios.post(baseUrl + '/create-student', s).then((res) => {
                console.log(res.data);

            })
        }
    }
    return (
        <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <form>
                                            {/* {id} */}
                                            <div class="form-floating mb-3">
                                                <input class="form-control" name="Name" value={name} onChange={(e) => { setValue(e); }} id="inputName" type="text" placeholder="Enter Name" />
                                                <label for="inputName">Name</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" name="Email" value={email} onChange={(e)=>{setValue(e);}} id="inputEmail" type="email" placeholder="Enter Email" />
                                                <label for="inputEmail">Email</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                    <input class="form-control" name="Age" value={age} onChange={(e) => { setValue(e); }}
                                    id="inputAge" type="Number" placeholder="Enter Age" />
                                                <label for="inputAge">Age</label>
                                            </div>
                                            
                                            <div class="form-floating mb-3">
                                    <input class="form-control" name="Marks" value={marks} onChange={(e) => { setValue(e); }} id="inputMarks" type="Number" />
                                                <label for="inputMarks">Marks</label>
                                            </div>
                            {/* <div class="form-floating mb-3">                                           */}
                                <label class="small mb-1" for="inputCity">City</label>
                                <select class="form-control" name="City" value={city} onChange={(e) => { setValue(e); }} id="inputCity"> 
                                                    <option value="jaipur">jaipur</option>
                                                    <option value="bhilwara">bhilwara</option>
                                                    <option value="jodhpur">jodhpur</option>
                                                    <option value="ajmer">ajmer</option>
                                                    <option value="chittor">chittor</option>
                                                    <option value="udaipur">udaipur</option>
                                                </select>
                               {/* </div>              */}
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a class="btn btn-primary" onClick={sendData}>{id?"update student":"create student"}</a>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <div class="card-footer text-center py-3">
                                        <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
    )
}