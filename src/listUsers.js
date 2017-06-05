export const listUsers = (req, res, db) => {

  db.collection('Users').find({}).toArray()
  .then(([result]) => {
    result.length == 0 ? res.send('There are no users registered.') : res.status(200).json(result);
  })
  .catch(([err]) => {
    console.log(err);
    res.status(500).json({msg: 'Something went wrong'});
  });

}
