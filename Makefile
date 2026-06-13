.PHONY: help up down migrate frontend backend test lint

help:
	@echo "Portfolio Builder - Available commands:"
	@echo "  make up        - Start Docker services (MySQL + Redis)"
	@echo "  make down      - Stop Docker services"
	@echo "  make migrate   - Run Laravel migrations"
	@echo "  make backend   - Start Laravel dev server"
	@echo "  make frontend  - Start Vite dev server"
	@echo "  make test      - Run backend tests"
	@echo "  make lint      - Lint frontend code"

up:
	docker-compose up -d

down:
	docker-compose down -v

migrate:
	cd backend && php artisan migrate

backend:
	cd backend && php artisan serve --port=8000

frontend:
	cd frontend && npm run dev

test:
	cd backend && php artisan test

lint:
	cd frontend && npm run lint
