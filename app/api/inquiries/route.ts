import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Inquiry } from "@/lib/models/inquiry";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Create new inquiry
    const newInquiry = new Inquiry({
      name,
      email,
      message,
      status: "unread",
    });

    // Save to database
    await newInquiry.save();
    console.log("Inquiry saved successfully:", newInquiry);

    // Send email to admin
    const emailHtml = `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><strong>Received at:</strong> ${new Date().toLocaleString()}</p>
    `;

    await sendEmail({
      to: process.env.EMAIL_USER || 'info@ninidigital.in',
      subject: `New Inquiry from ${name}`,
      html: emailHtml,
    });

    return NextResponse.json({ 
      message: "Inquiry saved successfully", 
      id: newInquiry._id 
    });
  } catch (error) {
    console.error("Error handling inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) }, 
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Connect to database
    await connectToDatabase();

    // Fetch all inquiries
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) }, 
      { status: 500 }
    );
  }
}