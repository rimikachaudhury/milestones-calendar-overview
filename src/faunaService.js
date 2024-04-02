//import faunadb from 'faunadb';

const faunaClient = new faunadb.Client({
    secret: "fnAFLgiyHqAARM3hOMlaMuvqhwwlaMIOVcKU66Os",
});

export async function fetchDataFromDB() {
    try {
        console.log("Querying collection pilot1...")
        return await faunaClient.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection('pilot1'))),
                q.Lambda(x => q.Get(x))
            )
        );
    } catch (error) {
        console.log("Error querying collection from database:", error);
        throw error;
    }
}