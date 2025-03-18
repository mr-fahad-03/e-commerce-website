import * as Brevo from "@getbrevo/brevo"

// Configure Brevo API client
const configureBrevoClient = () => {
  const apiInstance = new Brevo.TransactionalEmailsApi()
  const apiKey = apiInstance.authentications["apiKey"]
  apiKey.apiKey = process.env.BREVO_API_KEY
  return apiInstance
}

// Email templates
const getEmailTemplate = (order, type) => {
  const orderNumber = order._id.toString().slice(-6)
  const customerName = order.shippingAddress.name

  const templates = {
    orderPlaced: {
      subject: "Order Confirmation - WatchCraft",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Thank You for Your Order #${orderNumber}</h2>
          <p>Dear ${customerName},</p>
          <p>We're excited to confirm that we've received your order!</p>
          
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c5282; margin-top: 0;">Order Summary:</h3>
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> Rs ${order.totalPrice.toLocaleString()}</p>
            
            <h4 style="color: #2c5282; margin-top: 15px;">Items Ordered:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #edf2f7;">
                <th style="text-align: left; padding: 8px; border: 1px solid #e2e8f0;">Item</th>
                <th style="text-align: right; padding: 8px; border: 1px solid #e2e8f0;">Qty</th>
                <th style="text-align: right; padding: 8px; border: 1px solid #e2e8f0;">Price</th>
              </tr>
              ${order.orderItems
                .map(
                  (item) => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #e2e8f0;">${item.name}</td>
                  <td style="text-align: right; padding: 8px; border: 1px solid #e2e8f0;">${item.quantity}</td>
                  <td style="text-align: right; padding: 8px; border: 1px solid #e2e8f0;">Rs ${item.price.toLocaleString()}</td>
                </tr>
              `,
                )
                .join("")}
            </table>
            
            <div style="margin-top: 15px;">
              <p><strong>Shipping Address:</strong><br>
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
              </p>
            </div>
          </div>
          
          <p>We're preparing your order and will notify you once it ships. You can check your order status anytime by logging into your account.</p>
          <p>If you have any questions, please contact our customer service team.</p>
          <p>Best regards,<br>The WatchCraft Team</p>
        </div>
      `,
    },
    processing: {
      subject: "Your Order is Being Processed - WatchCraft",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Order Confirmation #${orderNumber}</h2>
          <p>Dear ${customerName},</p>
          <p>Thank you for shopping with WatchCraft! We're currently processing your order.</p>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c5282; margin-top: 0;">Order Details:</h3>
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> Rs ${order.totalPrice.toLocaleString()}</p>
          </div>
          <p>We'll send you another email when your order ships.</p>
          <p>Best regards,<br>The WatchCraft Team</p>
        </div>
      `,
    },
    shipped: {
      subject: "Your Order Has Been Shipped - WatchCraft",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Order Shipped #${orderNumber}</h2>
          <p>Dear ${customerName},</p>
          <p>Great news! Your order has been shipped and is on its way to you.</p>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c5282; margin-top: 0;">Shipping Details:</h3>
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Tracking Number:</strong> ${order.trackingId || "Will be updated soon"}</p>
            <p><strong>Shipping Address:</strong><br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
            </p>
          </div>
          <p>You can track your package using the tracking number above.</p>
          <p>Best regards,<br>The WatchCraft Team</p>
        </div>
      `,
    },
    delivered: {
      subject: "Your Order Has Been Delivered - WatchCraft",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Order Delivered #${orderNumber}</h2>
          <p>Dear ${customerName},</p>
          <p>Your order has been delivered! We hope you enjoy your new watch.</p>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c5282; margin-top: 0;">Order Summary:</h3>
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Delivery Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <p>If you have any questions about your order, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The WatchCraft Team</p>
        </div>
      `,
    },
    outForDelivery: {
      subject: "Your Order is Out for Delivery - WatchCraft",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Order Out for Delivery #${orderNumber}</h2>
          <p>Dear ${customerName},</p>
          <p>Your order is out for delivery and should arrive today!</p>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c5282; margin-top: 0;">Delivery Details:</h3>
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Tracking Number:</strong> ${order.trackingId || "N/A"}</p>
            <p><strong>Delivery Address:</strong><br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
            </p>
          </div>
          <p>Someone should be available to receive the package.</p>
          <p>Best regards,<br>The WatchCraft Team</p>
        </div>
      `,
    },
    trackingUpdated: {
      subject: `Tracking Information Updated - WatchCraft Order #${orderNumber}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Tracking Information Updated</h2>
          <p>Dear ${customerName},</p>
          <p>The tracking information for your order has been updated.</p>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c5282; margin-top: 0;">Updated Tracking Details:</h3>
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Tracking Number:</strong> ${order.trackingId}</p>
            <p><strong>Order Status:</strong> ${order.status}</p>
          </div>
          <p>You can track your package using the tracking number above.</p>
          <p>Best regards,<br>The WatchCraft Team</p>
        </div>
      `,
    },
  }

  return templates[type] || templates.processing
}

// Send email function using Brevo
const sendEmail = async (to, template) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.error("Missing Brevo API key. Check BREVO_API_KEY env variable.")
      return {
        success: false,
        error: "Email configuration missing",
      }
    }

    const apiInstance = configureBrevoClient()

    // Create send email request
    const sendSmtpEmail = new Brevo.SendSmtpEmail()

    sendSmtpEmail.subject = template.subject
    sendSmtpEmail.htmlContent = template.htmlContent
    sendSmtpEmail.sender = {
      name: "WatchCraft",
      email: process.env.SENDER_EMAIL || "noreply@watchcraft.com",
    }
    sendSmtpEmail.to = [{ email: to }]
    sendSmtpEmail.replyTo = {
      name: "WatchCraft Support",
      email: process.env.REPLY_TO_EMAIL || process.env.SENDER_EMAIL || "support@watchcraft.com",
    }

    console.log(`Attempting to send email to: ${to}`)

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log("Email sent successfully. Message ID:", data.messageId)

    return {
      success: true,
      messageId: data.messageId,
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      error: error.message || "Unknown email error",
    }
  }
}

// Send order notification
const sendOrderNotification = async (order, type = null) => {
  // If type is not specified, use the order status
  const emailType = type || order.status.toLowerCase()
  const template = getEmailTemplate(order, emailType)
  return await sendEmail(order.shippingAddress.email, template)
}

// Send order placed confirmation
const sendOrderPlacedEmail = async (order) => {
  return await sendOrderNotification(order, "orderPlaced")
}

// Send tracking update notification
const sendTrackingUpdateEmail = async (order) => {
  return await sendOrderNotification(order, "trackingUpdated")
}

export { sendOrderNotification, sendOrderPlacedEmail, sendTrackingUpdateEmail }

