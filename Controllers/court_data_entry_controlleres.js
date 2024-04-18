const court = require("../Models/court_schema");

const add_new_court_user = async (req,res)=>{
    try{
      const data = await court.create({
        UID:req.body.UID,
        name:req.body.name,
        password:req.body.password,
        housename:req.body.housename,
        street:req.body.street,
        street:req.body.street,
        city:req.body.city,
        pin:req.body.pin,
        state:req.body.state,
        country:req.body.country,
        phno:req.body.phno,
        email:req.body.email,
        court_name:req.body.court_name
      })

      return(res.status(200).json({"msg":"new Court user created"}));
    }
    catch (e) {
        return res.status(500).json({
          msg: "Error",
          "error msg": e.message,
        });
      }
}

const get_all_court_user = async (req,res)=>{
    try{
        data = await court.find();
        return(res.status(200).json(data));
    }
    catch (e) {
        return res.status(500).json({
          msg: "Error",
          "error msg": e.message,
        });
      }
}

const delete_court_user = async (req,res)=>{
    const id = request.params.id;
    try{
        const result = await court.findByIdAndDelete(id);
    
        if (!result) {
            return(
                res.status(200).json({"msg":"User not found"})
            )
        } else {
            return(res.status(200).json({"msg":"User deleted successfully"}))
        }
    }
    catch (e) {
        return res.status(500).json({
          msg: "Error",
          "error msg": e.message,
        });
      }
}

const update_court_user = async (req,res)=>
{
  try{
    const { id } = req.params;
    const updateData = req.body;

    
        const result = await court.findOneAndUpdate({ _id: id }, updateData, { new: true, runValidators: true });
        
        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({
          "msg":"New data updated",
          "data":result
        });
    }
  
  catch
  {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }

}

const get_indudaual_court_user = async (req,res) =>{
try{
  const id = request.id;
  const data = court.findOne({_id:id});
  return(
    res.status(200).json(data)
  );
}
catch
  {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
}

module.exports = { add_new_court_user, delete_court_user,get_all_court_user,get_indudaual_court_user,update_court_user}