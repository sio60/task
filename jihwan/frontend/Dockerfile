FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
# 개발 서버를 모든 인터페이스에서 접근 가능하도록 실행
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
