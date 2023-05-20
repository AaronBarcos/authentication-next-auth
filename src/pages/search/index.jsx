// Buscador de usuarios: 

// - Que muestra los resultados de la busqueda. 
// - Que va mostrando debajo de la barra de busqueda los resultados de la busqueda.
// - Que al hacer click en un resultado de la busqueda, te lleva al perfil del usuario.
// - Que cuando des a buscar aparezcan los resultados de la busqueda y similares a la busqueda.
// - Que utilice try catch para mostrar errores.
// - Que utilice loading para mostrar que esta cargando.
// - Que no utilice librerias externas.
// - Sin estilos.

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function search() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [search, setSearch] = useState("");
    const { data: session } = useSession();

    const getUsers = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get(`/api/users/${search}`);
            setUsers(res.data.users);
            setLoading(false);
            console.log(res.data)
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    } else if (errorMessage) {
        return <p>{errorMessage}</p>;
    } else {
        return (
            <div>
                <h1>Search</h1>
                <form onSubmit={getUsers}>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
                {users.map((user) => (
                    <div key={user._id}>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>

                        <button>View profile</button>
                    
                    </div>
                ))}

            </div>
        );
    }
}

export default search;
