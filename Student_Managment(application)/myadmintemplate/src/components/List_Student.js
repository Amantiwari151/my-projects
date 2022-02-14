import React, { useEffect, useState } from 'react'
// import { withRouter } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';

function List_Student() {
    // console.log(props);
    // const history = useHistory();
    const navigate = useNavigate();
    // navigate('/home');
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios.get(baseUrl + '/list-students').then((res)=>{
            console.log(res.data.data);
            setStudents(res.data.data);
        });
    }, []);
    // function doUpdate(id , action){
    //     if(action==="update"){
    //         axios.get()
    //     }
    // }
    var doAction= (id,action)=>{
        if(action==="delete"){
            axios.get(baseUrl + '/delete-student?id='+id).then((res)=>{
                
                axios.get(baseUrl + '/list-students').then((res) => {
                    console.log(res.data.data);
                    setStudents(res.data.data);
                });
                console.log(res.data.data);
            })
        }
        else if(action==="update"){
            navigate("/create-student/" + id);
        }
    }
    var studentList = students.map((st)=>{
        return   <tr key={st._id}>
            <td>{st.name}</td>
            <td>{st.age}</td>
            <td>{st.marks}</td>
            <td>{st.email}</td>
            <td><button onClick={()=>{doAction(st._id,"delete")}}>delete</button></td>
            <td><button onClick={()=>{doAction(st._id,"update")}}>update</button></td>
        </tr>
    })
    return (
        <div class="container-fluid px-4">
            <h1 class="mt-4">Tables</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li class="breadcrumb-item active">Tables</li>
            </ol>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    DataTable Example
                </div>
                <div class="card-body">
                    <table id="datatablesSimple">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Marks</th>
                                <th>Email</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Marks</th>
                                <th>Email</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default List_Student 