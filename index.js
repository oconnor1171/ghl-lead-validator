const express = require("express");
const app = express();
app.use(express.json());

// Main validation POST endpoint
app.post("/", (req, res) => {
  const contact = req.body.contact || {};

  const hasAllFields =
    contact.first_name &&
    contact.last_name &&
    contact.phone &&
    contact.email;

  res.json({
    allowBooking: !!hasAllFields,
    message: hasAllFields
      ? "All lead info captured. Proceed to booking."
      : "Missing contact info. Block booking.",
  });
});

// Schema endpoint for GHL
app.get("/schema", (req, res) => {
  res.json({
    tools: [
      {
        name: "validateContact",
        description: "Checks if contact info is complete before booking.",
        input: {
          contact: {
            first_name: "string",
            last_name: "string",
            phone: "string",
            email: "string",
          },
        },
        output: {
          allowBooking: "boolean",
          message: "string",
        },
      },
    ],
  });
});

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ MCP Validator running at http://localhost:${port}`);
});
