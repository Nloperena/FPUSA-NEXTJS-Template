import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Honeypot check
    if (body.company) {
      return NextResponse.json({ ok: true });
    }

    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      property_type, 
      bedrooms, 
      timeline, 
      budget, 
      message 
    } = body;

    // Basic validation
    if (!first_name || !last_name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Send email to your SMTP service
    // Example with nodemailer or your preferred email service
    console.log('New vacation rental lead:', {
      first_name,
      last_name,
      email,
      phone,
      property_type,
      bedrooms,
      timeline,
      budget,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Add to CRM (HubSpot, Salesforce, etc.)
    // TODO: Send notification email to sales team
    
    return NextResponse.json({ 
      ok: true,
      message: 'Thank you for your interest! We will contact you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

