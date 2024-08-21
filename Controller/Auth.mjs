import pool from "../Postgres/db.mjs"

const CreateUser = async (reqs, resp) => {
    const { id, name, email, password } = reqs.body;

    try {
        const result = await pool.query(
            `INSERT INTO "User" (id, Name, email, password) VALUES ($1, $2, $3, $4)`,
            [id, name, email, password]
        );

        console.log(result);

        resp.status(201).json({
            message: 'User created successfully',
            data: {
                id,
                name,
                email
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);

        resp.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }

    return;
};


const AuthanticateUser = (reqs,resp) => {
    
}

export {AuthanticateUser, CreateUser}