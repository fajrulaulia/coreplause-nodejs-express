build:
	docker build -t faawidia/coreplause-backend -f deployments/Dockerfile .
	
redis-up:
	docker-compose -f deployments/docker-compose.yaml up -d

redis-down:
	docker-compose -f deployments/docker-compose.yaml down


build-super:
	docker build -t faawidia/coreplause  .
	