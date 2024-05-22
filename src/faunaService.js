//import faunadb from 'faunadb';

const faunaClient = new faunadb.Client({
    secret: "fnAFLgiyHqAARM3hOMlaMuvqhwwlaMIOVcKU66Os",
});

export async function fetchDataFromDB(collectionName) {
    try {
        console.log("App Vue: Querying collection :",collectionName)
        return await faunaClient.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection(collectionName))),
                q.Lambda(x => q.Get(x))
            )
        );
    } catch (error) {
        console.log("Error querying collection from database:", error);
        throw error;
    }
}