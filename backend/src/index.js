import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors());

// Health Check Route
app.get('/api/health', (c) => {
  return c.json({ status: 'Backend is running correctly!' });
});

// GET Contacts Route (retrieves all from D1 database)
app.get('/api/contact', async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM contacts ORDER BY id DESC").all();
    return c.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error fetching from D1:', error.message);
    return c.json({ success: false, message: 'Error retrieving contacts' }, 500);
  }
});

// POST Contact Route (saves form submission to D1 database)
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return c.json({ success: false, message: 'Please provide all required fields' }, 400);
    }

    const createdAt = new Date().toISOString();

    // Insert into D1 SQLite database
    const info = await c.env.DB.prepare(
      "INSERT INTO contacts (name, email, subject, message, createdAt) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, email, subject, message, createdAt).run();

    if (!info.success) {
      throw new Error("Failed to insert record into D1");
    }

    return c.json({
      success: true,
      message: 'Message sent successfully!',
      data: {
        id: info.meta.last_row_id,
        name,
        email,
        subject,
        message,
        createdAt
      }
    }, 201);

  } catch (error) {
    console.error('Error saving to D1:', error.message);
    return c.json({ success: false, message: 'Server error, please try again later.' }, 500);
  }
});

export default app;
