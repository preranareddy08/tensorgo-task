const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const fetch = global.fetch;
const { mockUsageData } = require("../constants");
const { mockBillingData } = require("../constants");

const generatePDF = async (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const invoicesDir = path.join(__dirname, "../invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir);
    }

    const pdfPath = path.join(invoicesDir, `invoice-${data.invoiceNumber}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);

    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.moveDown();

    // user and billing details
    doc.fontSize(14).text(`Name: ${data.name}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Invoice Number: ${data.invoiceNumber}`);
    doc.text(`Billing Cycle: ${data.billingCycle}`);
    doc.text(`Payment Status: ${data.paymentStatus}`);
    doc.text(`Due Date: ${data.dueDate}`);
    doc.text(`Last Payment Date: ${data.lastPaymentDate}`);
    doc.moveDown();

    //usage details
    doc.fontSize(16).text("Usage Details:", { underline: true });
    doc.fontSize(12).text(`Usage: ${JSON.stringify(data.usage, null, 2)}`);
    doc.text(`Total Cost: ${data.totalCost}`);
    doc.moveDown();

    //footer
    doc.fontSize(14).text("Thank you for your business!", { align: "center" });

    doc.end();

    writeStream.on("finish", () => resolve(pdfPath));
    writeStream.on("error", (err) => reject(err));
  });
};

exports.invoiceGenerator = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { usage } = mockUsageData;
    const {
      totalCost,
      billingCycle,
      paymentStatus,
      dueDate,
      invoiceNumber,
      lastPaymentDate,
    } = mockBillingData;

    if (!name || !email || !usage || !totalCost || !billingCycle) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Invoice message
    const invoiceMessage = `
    Invoice for ${name}
    ------------------------------
    Customer Name: ${name}
    Email: ${email}
    
    Billing Details:
    ------------------------------
    Total Cost: ${totalCost}
    Billing Cycle: ${billingCycle}
    Payment Status: ${paymentStatus}
    Due Date: ${dueDate}
    Invoice Number: ${invoiceNumber}
    Last Payment Date: ${lastPaymentDate}
    
    Usage Details:
    ------------------------------
    API Calls: ${usage.apiCalls}
    Storage Used: ${usage.storage}
    Bandwidth Used: ${usage.bandwidth}
    Uptime: ${usage.uptime}
    Active Sessions: ${usage.activeSessions}
    
    ------------------------------
    Thank you for your business! We appreciate your trust in 
    our services. If you have any questions or need 
    assistance, feel free to contact our support team.
  `;

    // Generate PDF
    const pdfPath = await generatePDF({
      name,
      email,
      usage,
      totalCost,
      billingCycle,
      paymentStatus,
      dueDate,
      invoiceNumber,
      lastPaymentDate,
    });

    // Reading the generated PDF into a buffer
    const fileBuffer = fs.readFileSync(pdfPath);

    // Sending data to Zapier webhook
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Your Invoice Details",
        message: invoiceMessage,
        file: {
          value: invoiceMessage,
          filename: `invoice-${invoiceNumber}.pdf`,
          contentType: "application/json",
        },
      }),
    });

    fs.unlinkSync(pdfPath);

    // Handle Zapier response
    if (!response.ok) {
      throw new Error(`Failed to send data to Zapier: ${response.statusText}`);
    }

    // Respond to the client
    res.status(200).json({
      message: "Invoice generated and sent successfully.",
    });
  } catch (error) {
    console.error("Error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "An error occurred while processing the request.",
      });
    }
  }
};
