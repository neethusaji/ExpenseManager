const PDFDocument = require("pdfkit");

exports.generate = (expenses) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 30 });
            let buffers = [];

            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            doc.fontSize(16).text("Expense Report", { align: "center" }).moveDown(2);

            const startX = 50, startY = 100;
            const colWidths = [100, 150, 200];

            doc.fontSize(12).font("Helvetica-Bold");
            doc.text("Amount", startX, startY);
            doc.text("Category", startX + colWidths[0], startY);
            doc.text("Description", startX + colWidths[0] + colWidths[1], startY);
            
            doc.moveTo(startX, startY + 20).lineTo(startX + 450, startY + 20).stroke(); 

            doc.font("Helvetica").fontSize(10);
            let y = startY + 30;

            expenses.forEach((expense) => {
                const { amount, category, description } = expense;
                
                doc.text(`${amount}`, startX, y);
                doc.text(`${category}`, startX + colWidths[0], y);
                doc.text(`${description}`, startX + colWidths[0] + colWidths[1], y);

                y += 20; 
            });

            doc.end();
        } catch (error) {
            console.error("Error generating PDF:", error);
            reject(error);
        }
    });
};
