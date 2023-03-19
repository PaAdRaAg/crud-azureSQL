import React from "react";

const Form = ({user, setUser}) => {

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    let {name, lastName, email} = user;

    const handleSubmit = (e) => {
        if(name === '' || lastName === '' || email === ''){
            alert('Todos los campos son obligatorios')
            return
        }
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }
        
        fetch('http://localhost:3001/api/users/register', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setUser({
            name: '',
            lastName: '',
            email: ''
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input value={name} onChange={handleChange} type="text" className="form-control" id="name" placeholder="Ingrese su nombre"/>
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Apellido</label>
                <input value={lastName} onChange={handleChange} type="text" className="form-control" id="lastName" placeholder="Ingrese su apellido"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electronico</label>
                <input value={email} onChange={handleChange} type="email" className="form-control" id="email" placeholder="Ingrese su correo electronico"/>
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    )
}

export default Form;