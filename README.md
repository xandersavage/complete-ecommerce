# 🛍️ **E-commerce Store**

    Hey there!,this is a full-featured e-commerce platform specializing in children's clothing and accessories. This project demonstrates a modern approach to e-commerce, built with performance, scalability, and user experience in mind.

## 📱 Key Features

### Customer Experience

- Intuitive product browsing with advanced filtering and search
- Real-time inventory tracking
- Seamless checkout process with multiple payment options
- Mobile-responsive design
- Personalized user accounts and order history

### Admin & Operations

- Comprehensive admin dashboard for product and order management
- Rich media management with MinIO integration
- Multi-currency support (NGN & USD)
- Advanced shipping options with location-based rules
- Inventory tracking and management
- and more....

### Technical Foundation

- **Frontend**: Next.js 14 with server-side rendering for optimal performance
- **Backend**: Medusa.js for robust e-commerce functionality
- **Database**: PostgreSQL for reliable data persistence
- **Storage**: MinIO for scalable product image storage
- **Search**: Meilisearch
- **Deployment**: Not hosted yet, currently in development
- **Development**: Containerized with Docker and docker-compose, including PostgreSQL, Redis, MinIO, and MeiliSearch services

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18 or higher
- PostgreSQL 13 or higher (if not using Docker)
- MinIO server (if not using Docker)

### Installation

1. Clone the repository
2. Start the Docker services:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies for both frontend and backend:

   ```bash
   # Backend setup
   cd backend
   npm install
   npx medusa db:setup

   # Frontend setup
   cd ../storefront
   npm install
   ```

4. Configure environment variables following the example files in both directories

### Running the Project

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../storefront
npm run dev
```

## 📂 Project Status

This project is actively under development. Current focus areas:

- Enhancing the search functionality
- Optimizing the mobile experience
- Working on featured, sales and recently added pages

## 💡 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License

---
