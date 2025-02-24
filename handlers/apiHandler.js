

export async function createUser(req, res) {
    try {
        // Your logic for creating a user
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}

export async function getUser(req, res) {
    try {
        return { message: "Some random things" }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}

export async function test(req, res) {
    const clientID = process.env.GOOGLE_CLIENT_ID
    return res.status(500).json({
        message: clientID
    })

}