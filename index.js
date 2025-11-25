const express = require("express");
const app = express();

app.use(express.json());

// Lead validation endpoint
app.post("/", (req, res) => {
  const contact = req.body.contact || {};

  // Force strict boolean validation using .every()
  const requiredFields = ["first_name", "last_name", "phone", "email"];
  const hasAllFields = requiredFields.every((field) => {
    return contact[field] && contact[field].toString().trim() !== "";
  });

  return res.json({
    allowBooking: hasAllFields, // Always true or false
    message: hasAllFields
      ? "All lead info captured. Proceed to booking."
      : "Missing contact info. Block booking.",
  });
});

// Server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP Validator running at http://localhost:${port}`);
});
