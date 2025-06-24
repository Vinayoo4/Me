import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

// Data file paths
const DATA_DIR = path.join(__dirname, 'data')
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json')
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json')

// Middleware
app.use(helmet())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
})

app.use('/api/', limiter)

// Initialize data directory and files
async function initializeData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    
    // Initialize contacts file
    try {
      await fs.access(CONTACTS_FILE)
    } catch {
      await fs.writeFile(CONTACTS_FILE, JSON.stringify([]))
    }
    
    // Initialize visitors file
    try {
      await fs.access(VISITORS_FILE)
    } catch {
      await fs.writeFile(VISITORS_FILE, JSON.stringify({ count: 0, visits: [] }))
    }
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

// Utility functions
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return null
  }
}

async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    return false
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Contact form submission
app.post('/api/contact', 
  contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 100 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().isLength({ min: 10, max: 1000 }).escape()
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        })
      }

      const { name, email, message } = req.body
      
      // Create contact entry
      const contact = {
        id: Date.now().toString(),
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress
      }

      // Read existing contacts
      const contacts = await readJsonFile(CONTACTS_FILE) || []
      
      // Add new contact
      contacts.push(contact)
      
      // Save contacts
      const saved = await writeJsonFile(CONTACTS_FILE, contacts)

      // Send email to admin using EmailJS REST API
      try {
        await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_ADMIN_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            from_email: email,
            message: message
          }
        });
      } catch (emailError) {
        console.error('Failed to send email via EmailJS:', emailError.response?.data || emailError.message);
      }

      // Schedule a follow-up review request to the user after 1 minute
      setTimeout(async () => {
        try {
          await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_REVIEW_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
              to_email: email,
              to_name: name
              // Add more params as needed by your template
            }
          });
        } catch (reviewEmailError) {
          console.error('Failed to send review request via EmailJS:', reviewEmailError.response?.data || reviewEmailError.message);
        }
      }, 60000); // 1 minute delay (60000 ms)
      
      if (saved) {
        res.json({
          success: true,
          message: 'Message received successfully! Thank you for reaching out.'
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to save message. Please try again.'
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error. Please try again later.'
      })
    }
  }
)

// Get contacts (admin endpoint - in production, add authentication)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await readJsonFile(CONTACTS_FILE) || []
    res.json({
      success: true,
      contacts: contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        timestamp: contact.timestamp
      }))
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts'
    })
  }
})

// Track visitor
app.post('/api/visitors', async (req, res) => {
  try {
    const visitorData = await readJsonFile(VISITORS_FILE) || { count: 0, visits: [] }
    
    const visit = {
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown'
    }
    
    visitorData.count += 1
    visitorData.visits.push(visit)
    
    // Keep only last 1000 visits to prevent file from growing too large
    if (visitorData.visits.length > 1000) {
      visitorData.visits = visitorData.visits.slice(-1000)
    }
    
    await writeJsonFile(VISITORS_FILE, visitorData)
    
    res.json({
      success: true,
      count: visitorData.count
    })
  } catch (error) {
    console.error('Visitor tracking error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to track visitor'
    })
  }
})

// Get visitor count
app.get('/api/visitors', async (req, res) => {
  try {
    const visitorData = await readJsonFile(VISITORS_FILE) || { count: 0, visits: [] }
    res.json({
      success: true,
      count: visitorData.count
    })
  } catch (error) {
    console.error('Get visitor count error:', error)
    res.status(500).json({
      success: false,
      count: 0
    })
  }
})

// Analytics endpoint (admin - in production, add authentication)
app.get('/api/analytics', async (req, res) => {
  try {
    const visitorData = await readJsonFile(VISITORS_FILE) || { count: 0, visits: [] }
    const contacts = await readJsonFile(CONTACTS_FILE) || []
    
    // Calculate basic analytics
    const today = new Date().toDateString()
    const todayVisits = visitorData.visits.filter(visit => 
      new Date(visit.timestamp).toDateString() === today
    ).length
    
    const thisWeek = new Date()
    thisWeek.setDate(thisWeek.getDate() - 7)
    const weeklyVisits = visitorData.visits.filter(visit => 
      new Date(visit.timestamp) >= thisWeek
    ).length
    
    res.json({
      success: true,
      analytics: {
        totalVisitors: visitorData.count,
        todayVisits,
        weeklyVisits,
        totalContacts: contacts.length,
        recentContacts: contacts.slice(-5).reverse()
      }
    })
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve analytics'
    })
  }
})

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const FRONTEND_DIST = path.join(__dirname, '../../Frontend/dist')
  app.use(express.static(FRONTEND_DIST))

  // SPA Fallback: serve index.html for any non-API route
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(FRONTEND_DIST, 'index.html'))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  })
})

// Start server
async function startServer() {
  await initializeData()
  
  app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════╗
║        90s Personal Website          ║
║                                      ║
║  Server running on port ${PORT}         ║
║  Frontend: http://localhost:5173     ║
║  Backend:  http://localhost:${PORT}     ║
║                                      ║
║  Endpoints:                          ║
║  POST /api/contact   - Submit form   ║
║  GET  /api/visitors  - Visitor count ║
║  POST /api/visitors  - Track visit   ║
║  GET  /api/contacts  - View messages ║
║  GET  /api/analytics - Site stats    ║
║                                      ║
╚══════════════════════════════════════╝
    `)
  })
}

startServer().catch(console.error)