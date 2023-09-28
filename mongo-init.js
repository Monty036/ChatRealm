db.createUser(
    {
        user: "root",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "dev"
            }
        ]
    }
);
db.createCollection("test");