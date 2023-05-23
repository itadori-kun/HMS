const express = require("express");
const app = express.Router();
const consultationModel = require("../Models/Consultation");

app.route("/").post(async (req, res) => {
  if (!req.body)
    return res.json({
      code: 400,
      msg: "field is required",
    });

  const consultation = new consultationModel({
    patient_id: req.body.patient_id,
    employees_id: req.body.employees_id,
    payment_status: req.body.payment_status,
    diagnosis: req.body.diagnosis,
    prescription: req.body.prescription,
    medication_id: req.body.medication_id,
  });
  if (!consultation)
    return res.json({
      code: 400,
      msg: "field required",
      data: consultation,
    });

 const new_consultation = await consultation.save();
  res.json({
    code: 200,
    msg: "consultation created successfully",
    data: new_consultation,
  });
});

app.route("/").get(async (req, res) => {
  try {
    const consultation = await consultationModel
      .find()
      .populate("patient_id")
      .populate("employees_id")
      .populate("medication_id");
    if (!consultation) return res.json({ code: 404, msg: "no record found" });
    res.json({
      code: 200,
      msg: "consultation found successfully",
      data: consultation,
    });
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
});

app
  .route("/:id")
  .delete(async (req, res) => {
    if (!req?.params?.id) return res.json({ code: 400, msg: "bad request" });
    const consultation = await consultationModel
      .findOneAndDelete({ _id: req.params.id })
      .exec();
    if (!consultation) return res.json({ code: 404, msg: "not found" });
    res.json({
      code: 200,
      msg: "consultation deleted successfully",
      data: consultation,
    });
  })
  .put(async (req, res) => {
    if (!req?.params?.id) return res.json({ code: 400, msg: "bad request" });
    const consultation = await consultationModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!consultation) return res.json({ code: 400, msg: "not found" });
    res.json({
      code: 200,
      msg: "consultation updated successfully",
      data: consultation,
    });
  })
  .get(async (req, res) => {
    if (!req?.params?.id) return res.json({ code: 400, msg: "bad request" });
    const consultation = await consultationModel
      .findOneAndUpdate({ _id: req.params.id })
      .populate("patient_id")
      .populate("employees_id")
      .populate("medication_id");
    if (!consultation) return res.json({ code: 404, msg: "not found" });
    res.json({
      code: 200,
      msg: "single consultation found",
      data: consultation,
    });
  });
module.exports = app;
