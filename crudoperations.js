
//delete selected document from database
// let deleteDocument = faunaClient.query(
//     q.Delete(q.Ref(q.Collection('pilot0'), '293137999999999999'))
//   )
//   .then((ret) => {
//     console.log("deleted document from database", ret);
//     return ret;
//    })
//    .catch((err) => {
//     console.log("error in deleting document from database", err);
//     });

//create new document in database
// let createDocument = faunaClient.query(
//     q.Create(q.Collection('pilot0'), { data: { siteInfo: "test site info", siteURL: "test site url", siteTitle: "test site title", siteDescription: "test site description", siteTags: "test site tags", siteNotes: "test site notes" } }))
//        .then((ret) => {
//           console.log("created document in database", ret);
//           return ret;
//          })
//          .catch((err) => {
//           console.log("error in creating document in database", err);
//           });

//update document in database
// let updateDocument = faunaClient.query(
//     q.Update(q.Ref(q.Collection('pilot0'), '293137999999999999'), { data: { siteInfo: "updated site info", siteURL: "updated site url", siteTitle: "updated site title", siteDescription: "updated site description", siteTags: "updated site tags", siteNotes: "updated site notes" } }))
//        .then((ret) => {
//           console.log("updated document in database", ret);
//           return ret;
//          })
//          .catch((err) => {
//           console.log("error in updating document in database", err);
//           });
