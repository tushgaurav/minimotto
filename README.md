# minimotto: Quality Torrent Index

A torrent indexing service featuring individually verified torrents with active links. Minimotto also hosts a private, members-only section for exclusive content.

## Architecture

- **Backend**: FastAPI (Python) - REST API with torrent processing
- **Frontend**: Next.js (TypeScript) - Modern React-based web interface
- **Database**: PostgreSQL - User data, torrent metadata, and indexing
- **Integration**: Jackett API for torrent aggregation
- **Deployment**: Docker & Docker Compose

## Project Structure

```
minimotto/
├── apps/
│   ├── backend/          # FastAPI application
│   │   ├── app/
│   │   │   ├── api/      # API routes
│   │   │   ├── models/   # Database models
│   │   │   ├── services/ # Business logic
│   │   │   └── utils/    # Utilities
│   │   └── main.py
│   └── frontend/         # Next.js application
│       ├── src/
│       │   ├── app/      # App router pages
│       │   ├── components/ # UI components
│       │   └── lib/      # Utilities & API client
│       └── package.json
├── docker-compose.yml
└── README.md
```

## Features

### Core Features
- **Jackett Integration** - Aggregate torrents from multiple sources
- **Torrent Management** - Upload .torrent files and magnet links
- **File Processing** - Parse and convert between torrent files and magnet links
- **Verification System** - Individually verified torrents with active link checking
- **Advanced Search** - Full-text search with filtering and categorization
- **User Engagement** - Comments, upvotes, downvotes, and ratings

### Community Features
- **User Profiles** - Personal dashboards and activity tracking
- **Private Section** - Members-only exclusive content area
- **Educational Content** - Blogs and how-to guides
- **Categories** - Organized content classification

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 15+
- Docker and Docker Compose (recommended)

### Using Docker (Recommended)

```bash
git clone https://github.com/yourusername/minimotto.git
cd minimotto
docker-compose up --build
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Local Development

```bash
git clone https://github.com/yourusername/minimotto.git
cd minimotto
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

## Development

### Available Scripts

```bash
npm run dev           # Start both frontend and backend
npm run dev:frontend  # Start only frontend
npm run dev:backend   # Start only backend
npm run build         # Build for production
npm run test          # Run tests
npm run lint          # Lint code
```

### Backend Development

```bash
cd apps/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
pytest tests/ -v
```

### Frontend Development

```bash
cd apps/frontend
npm install
npm run dev
npm test
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/minimotto

# API Configuration
SECRET_KEY=your-super-secret-jwt-key
API_PORT=8000

# Jackett Integration
JACKETT_URL=http://localhost:9117
JACKETT_API_KEY=your-jackett-api-key

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=minimotto

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=50MB
```

## API Documentation

When the backend is running:
- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

### Key Endpoints

```
GET  /api/v1/torrents/        # List torrents with filtering
POST /api/v1/torrents/        # Upload torrent
GET  /api/v1/torrents/{id}    # Get torrent details
POST /api/v1/torrents/{id}/vote # Vote on torrent
GET  /api/v1/search/          # Search torrents
GET  /api/v1/categories/      # List categories
POST /api/v1/auth/login       # User authentication
GET  /api/v1/users/profile    # User profile
```

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **Pydantic** - Data validation
- **Alembic** - Database migrations
- **Redis** - Caching and task queue
- **PostgreSQL** - Primary database

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Modern component library
- **React Query** - Server state management
- **React Hook Form** - Form handling

## Testing

### Backend Tests
```bash
cd apps/backend
pytest tests/ -v
pytest --cov=app tests/  # With coverage
```

### Frontend Tests
```bash
cd apps/frontend
npm test
npm run test:coverage
```

## Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Legal Considerations

**Important**: This software is for educational purposes. Users are responsible for:
- Complying with local copyright laws
- Ensuring torrents shared are legal in their jurisdiction
- Following terms of service of integrated services
- Respecting intellectual property rights

The developers do not endorse or encourage piracy.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow code style guidelines
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [Report Issues](https://github.com/yourusername/minimotto/issues)
- [Discussions](https://github.com/yourusername/minimotto/discussions)

---

**Built for the torrent community**