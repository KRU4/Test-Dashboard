# Bilingual Admin Dashboard

A modern, bilingual (Arabic/English) admin dashboard with dark/light theme support. The dashboard manages webhooks, company information, service configuration, and data uploads, with an AI assistant floating button for real-time communication.

## Features

- 🌐 **Bilingual Support**: Arabic (RTL) and English (LTR) switching
- 🌓 **Theme Toggle**: Dark and Light mode support
- 🔗 **Webhook Management**: Configure and manage webhook endpoints
- 🏢 **Company Information**: Submit company details via webhook
- ⚙️ **Service Configuration**: Configure services with tools and user limits
- 📄 **PDF Upload**: Upload PDF files with Base64 encoding
- 💬 **AI Assistant**: Floating chat interface for real-time communication
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Context API** for state management
- **LocalStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Assistant/          # AI Assistant chat components
│   ├── layout/            # Sidebar, TopBar, MobileMenu
│   └── ui/                # Reusable UI components
├── contexts/              # Theme and Language contexts
├── hooks/                 # Custom hooks
├── pages/                 # Page components
├── translations/          # Translation files
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## Usage

### Webhooks Configuration

1. Navigate to the Webhooks page
2. Enter webhook URLs for each service:
   - About Company Webhook
   - Services Webhook
   - Data Upload Webhook
   - Assistant Webhook
3. Click "Save" for each webhook

### About Company

1. Navigate to the About Company page
2. Enter company name and description
3. Click "Save" to submit to the configured webhook

### Services

1. Navigate to the Services page
2. Select a service type (Personal Assistant, Company Assistant, etc.)
3. Set the number of users
4. Enable desired tools
5. Click "Save" to submit configuration

### Data Upload

1. Navigate to the Data page
2. Drag and drop a PDF file or click to browse
3. Click "Upload" to send the file to the webhook

### AI Assistant

1. Click the floating chat button (bottom-right)
2. Type your message and press Enter or click Send
3. The assistant will respond via the configured webhook

## Webhook Payload Formats

### About Company
```json
{
  "type": "about_company",
  "data": {
    "company_name": "Example Corp",
    "description": "We are a leading technology company..."
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Services
```json
{
  "type": "service_configuration",
  "data": {
    "service_type": "customer_support",
    "number_of_users": 25,
    "enabled_tools": ["telegram_sender", "whatsapp_sender"]
  },
  "timestamp": "2024-01-15T10:35:00Z"
}
```

### PDF Upload
```json
{
  "type": "pdf_upload",
  "data": {
    "filename": "company_policy.pdf",
    "file_base64": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC...",
    "file_size": 2547891
  },
  "timestamp": "2024-01-15T10:40:00Z"
}
```

### Assistant Chat
```json
{
  "type": "user_message",
  "message": "What services do you offer?",
  "timestamp": "2024-01-15T10:45:00Z",
  "session_id": "usr_abc123xyz"
}
```

## Local Storage Keys

- `webhooks`: Webhook URLs configuration
- `theme`: Current theme ("dark" or "light")
- `language`: Current language ("en" or "ar")
- `chatHistory`: Chat messages history

## Responsive Design

- **Desktop**: Full sidebar, 3-column layout
- **Tablet**: Collapsible sidebar, 2-column layout
- **Mobile**: Hidden sidebar with hamburger menu, single column

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
