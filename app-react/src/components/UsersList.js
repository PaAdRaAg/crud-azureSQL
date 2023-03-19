import React from "react";

const UsersList = ({user, setUser, users, setListUpdated }) => {
    
    const handleDelete = (id) => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch(`http://localhost:3001/api/users/${id}`, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true)
    }

    let {name, lastName, email} = user;

    const handleUpdate = (id) => {

        if(name === '' || lastName === '' || email === ''){
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }
        fetch(`http://localhost:3001/api/users/${id}`, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
    
        setUser({
            name: '',
            lastName: '',
            email: ''
        })

        setListUpdated(true)
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Eliminar</button>    
                            </div>      
                            <div className="mb-3">
                                <button onClick={() => handleUpdate(user.id)} className="btn btn-dark">Actualizar</button>    
                            </div>                       
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UsersList;