.PHONY: install install-dev dev build test format docker-build docker-test docker-curl-test clean help

install:
	./scripts/ubuntu/install.sh

install-dev:
	./scripts/ubuntu/install-dev.sh

dev:
	./scripts/ubuntu/dev.sh

build:
	./scripts/ubuntu/build.sh

test:
	./scripts/ubuntu/test.sh

format:
	./scripts/ubuntu/format.sh

docker-build:
	docker build -f docker/build.Dockerfile -t expressjs-template:latest .

docker-test:
	docker build -f docker/test.Dockerfile -t expressjs-template-test:latest .
	docker run --rm expressjs-template-test:latest

docker-curl-test:
	./scripts/ubuntu/docker-curl-test.sh

clean:
	rm -rf dist node_modules coverage

help:
	@echo "Available targets:"
	@echo "  make install        - Install dependencies via Ubuntu script"
	@echo "  make install-dev    - Install dev dependencies via Ubuntu script"
	@echo "  make dev            - Run development server via Ubuntu script"
	@echo "  make build          - Build for production via Ubuntu script"
	@echo "  make test           - Run tests via Ubuntu script"
	@echo "  make docker-build   - Build Docker image"
	@echo "  make docker-test    - Run tests in Docker"
	@echo "  make docker-curl-test - Run curl integration tests in Docker"
	@echo "  make format         - Format source code
	@echo "  make clean          - Clean build artifacts""
